import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { channelsListQuery } from './ChannelsListWithData';

const addChannelMutation = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`;

const AddChannel = () => {

  return (
    <Mutation mutation={addChannelMutation}
      update={(cache, { data: { addChannel } }) => {
        // Read the data from the cache for this query.
        const data = cache.readQuery({ query: channelsListQuery });
        // Add our channel from the mutation to the end.
        data.channels.push(addChannel);
        // Write the data back to the cache.
        cache.writeQuery({ query: channelsListQuery, data });
      }}
    >
      {( addChannel, { data }) => (
        <div className="messageInput">
          <input type="text" placeholder="New channel" onKeyUp={evt => {
            if (evt.keyCode === 13) {
              addChannel({variables: {name: evt.target.value},
                optimisticResponse: {
                  __typename: 'Mutation',
                  addChannel: {
                    name: evt.target.value,
                    id: Math.round(Math.random() * -1000000),
                    __typename: 'Channel'
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

export default AddChannel;
