import React, { Component } from 'react';
import MessageList from './MessageList';
import ChannelPreview from './ChannelPreview';
import NotFound from './NotFound';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

function isDuplicateDocument(newDocument, existingDocuments) {
  return (
    newDocument.id !== null &&
    existingDocuments.some(doc => newDocument.id === doc.id)
  );
}

class ChannelDetails extends Component {
  componentWillMount() {
    this.props.subscribeToNewMessage();
  }

  render() {
    const { loading, error, data: { channel }, match } = this.props;

    if (loading) {
      return <ChannelPreview channelId={match.params.channelId} />;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    if (channel === null) {
      return <NotFound />;
    }

    return (
      <div>
        <div className="channelName">{channel.name}</div>
        <MessageList messages={channel.messages} />
      </div>
    );
  }
}

export const channelDetailsQuery = gql`
  query ChannelDetailsQuery($channelId: ID!) {
    channel(id: $channelId) {
      id
      name
      messages {
        id
        text
      }
    }
  }
`;

const messagesSubscription = gql`
  subscription messageAdded($channelId: ID!) {
    messageAdded(channelId: $channelId) {
      id
      text
    }
  }
`;

const ChannelDetailsWithData = ({ match }) => (
  <Query
    query={channelDetailsQuery}
    variables={{ channelId: match.params.channelId }}
  >
    {({ subscribeToMore, ...result }) => (
      <ChannelDetails match={match}
        {...result}
        subscribeToNewMessage={() =>
          subscribeToMore({
            document: messagesSubscription,
            variables: { channelId: match.params.channelId },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newMessage = subscriptionData.data.messageAdded;
              // don't double add the message
              if (isDuplicateDocument(newMessage, prev.channel.messages)) {
                return prev;
              }
              const messages = prev.channel.messages.filter(msg => msg.id > 0);
              return {
                ...prev,
                channel: {
                  ...prev.channel,
                  messages: [...messages, newMessage]
                }
              };
            }
          })
        }
      />
    )}
  </Query>
);

export default ChannelDetailsWithData;
