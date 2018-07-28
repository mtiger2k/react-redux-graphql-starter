import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const channelQuery = gql`
  query ChannelQuery($channelId: ID!) {
    channel(id: $channelId) {
      id
      name
    }
  }
`;

const ChannelPreview = (channelId) => (
  <Query query={channelQuery} variables={channelId}>
    {({ loading, error, data: { channel }}) => {
      if (loading) return <p>Loading ...</p>;
      if (error) return <p>{error.message}</p>;

      return (
        <div>
          <div className="channelName">{channel.name}</div>
          <div>Loading Messages</div>
        </div>
      )
    }}
  </Query>
)


export default ChannelPreview;
