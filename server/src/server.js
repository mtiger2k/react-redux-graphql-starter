import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import cors from 'cors';
import { apolloUploadExpress } from 'apollo-upload-server';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import passport from 'passport';
import mongoose from 'mongoose';

//const schema = makeExecutableSchema({ typeDefs, resolvers });
import schema from './schema';

const requireAuth = passport.authenticate('jwt', {session: false});

// init config
require('dotenv').config();

// config passport
const configPassport = require('./services/passport');
configPassport(passport);

// init mongo
const mongoUri = process.env.MONGODB_URL || 'mongodb://localhost:27017/graphql-tutorial'
mongoose.Promise = require('bluebird');
mongoose.connect(mongoUri, { useNewUrlParser: true });

const PORT = process.env.SERVER_PORT || 4000;

const server = express();
server.use('*', cors({ origin: 'http://localhost:3000' }));
server.use(bodyParser.json())

// router
require('./router')(server);

server.use('/graphql', requireAuth, 
  apolloUploadExpress({

  }),
  graphqlExpress((req) => {
    return {
      schema,
      context: {
          user: req.user
      }
    }
  })
);
server.get(
  '/graphiql', requireAuth,
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
  })
); // if you want GraphiQL enabled

const ws = createServer(server);

ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);

  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },
    {
      server: ws,
      path: '/subscriptions'
    }
  );
});
