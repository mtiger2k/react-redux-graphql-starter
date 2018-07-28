import { PubSub, withFilter } from 'graphql-subscriptions';

export const schema = `

type Message {
  id: ID!
  text: String
}

input MessageInput{
  channelId: ID!
  text: String
}

type Channel {
   id: ID!                # "!" denotes a required field
   name: String
   messages: [Message]!
}

extend type Query {
  channels: [Channel]    # "[]" means this is a list of channels
  channel(id: ID!): Channel
}

extend type Mutation {
  addMessage(message: MessageInput!): Message
  # A mutation to add a new channel to the list of channels
  addChannel(name: String!): Channel
}

type Subscription {
  messageAdded(channelId: ID!): Message
}

`

const pubsub = new PubSub();
const channels = [
  {
    id: '1',
    name: 'baseball',
    messages: [
      {
        id: '1',
        text: 'baseball is life'
      }
    ]
  }
];
let nextId = 2;
let nextMessageId = 2;

export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
    channel: (root, { id }) => {
      return channels.find(channel => channel.id === id);
    }
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = {
        id: String(nextId++),
        name: args.name,
        messages: []
      };
      channels.push(newChannel);
      return newChannel;
    },
    addMessage: (root, { message }) => {
      const channel = channels.find(
        channel => channel.id === message.channelId
      );
      if (!channel) throw new Error('Channel does not exist');

      const newMessage = { id: String(nextMessageId++), text: message.text };
      channel.messages.push(newMessage);

      pubsub.publish('messageAdded', {
        messageAdded: newMessage,
        channelId: message.channelId
      });

      return newMessage;
    }
  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('messageAdded'),
        (payload, variables) => {
          return payload.channelId === variables.channelId;
        }
      )
    }
  }
};