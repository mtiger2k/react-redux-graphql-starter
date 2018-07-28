import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { channelDetailsQuery } from './ChannelDetails';
import { withRouter } from 'react-router';

function isDuplicateDocument(newDocument, existingDocuments) {
  return (
    newDocument.id !== null &&
    existingDocuments.some(doc => newDocument.id === doc.id)
  );
}

const addMessageMutation = gql`
  mutation addMessage($message: MessageInput!) {
    addMessage(message: $message) {
      id
      text
    }
  }
`;

const AddMessage = ({ match }) => {

  return (
    <Mutation mutation={addMessageMutation}
      update={(cache, { data: { addMessage } }) => {
        // Read the data from the cache for this query.
        const data = cache.readQuery({
          query: channelDetailsQuery,
          variables: {
            channelId: match.params.channelId
          }
        });

        if (isDuplicateDocument(addMessage, data.channel.messages)) {
          return;
        }
        // don't double add the message
        data.channel.messages.push(addMessage);
        // Write the data back to the cache.
        cache.writeQuery({
          query: channelDetailsQuery,
          variables: {
            channelId: match.params.channelId
          },
          data
        });        
      }}
    >
      {( addMessage, { data }) => (
        <div className="messageInput">
          <input type="text" placeholder="New message" onKeyUp={evt => {
            if (evt.keyCode === 13) {
              addMessage({variables: {message: {channelId: match.params.channelId, text: evt.target.value}},
                optimisticResponse: {
                  __typename: 'Mutation',
                  addMessage: {
                    text: evt.target.value,
                    id: Math.round(Math.random() * -1000000),
                    __typename: 'Message'
                  }
                }
              });
              evt.target.value = '';
            }
          }} />
        </div>
      )}
    </Mutation>
  );
};

export default withRouter(AddMessage)
