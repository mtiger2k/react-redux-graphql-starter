import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import AddChannel from './AddChannel';

export const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

const ChannelsList = () => (
  <Query query={channelsListQuery} pollInterval={20000}>
    {({ loading, error, data: { channels }}) => {
      if (loading) return <p>Loading ...</p>;
      if (error) return <p>{error.message}</p>;

      return (
        <div className="channelsList">
          <AddChannel />
          {channels.map(ch => (
            <div
              key={ch.id}
              className={'channel ' + (ch.id < 0 ? 'optimistic' : '')}
            >
              <Link to={ch.id < 0 ? `/` : `channels/${ch.id}`}>{ch.name}</Link>
            </div>
          ))}
        </div>
      )
    }}
  </Query>
)

export default ChannelsList;
