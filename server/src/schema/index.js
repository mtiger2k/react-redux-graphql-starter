import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import fs from 'fs'
import { 
  schema as Channel, 
  resolvers as channelResolvers,
} from './channel.js';

import {
  schema as User
} from './user'

const Query = `
 
  scalar Upload  

  type Query {
  	_empty: String
  }

  type Mutation {
  	singleUpload(file: Upload!): User
  }
`;

const uploadDir = process.env.UPLOAD_TMP_DIR
const storeFS = ({ stream, filename }) => {
  const path = `${uploadDir}/${filename}`
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file
          fs.unlinkSync(path)
        reject(error)
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ path }))
  )
}

const processUpload = async upload => {
  const { stream, filename, mimetype, encoding } = await upload
  const { path } = await storeFS({ stream, filename })
  return 'success'
}

const resolvers = {
	Mutation: {
		singleUpload: (obj, { file }, {user}) => {
			processUpload(file)
			return user;
		}
	}
};

const schema = makeExecutableSchema({
  typeDefs: [ Query, Channel, User ],
  resolvers: merge(resolvers, channelResolvers),
});

export default schema;