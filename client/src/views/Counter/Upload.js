import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const addChannelMutation = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      username
    }
  }
  `;

const AddChannel = () => {

  return (
    <Mutation mutation={addChannelMutation}>
      {( singleUpload, { data }) => (
        <div className="messageInput">
          <input type="file" required onChange={ evt => {
            singleUpload({variables: {file: evt.target.files[0]}})
          }} />
        </div>
      )}
    </Mutation>
  );
};

export default AddChannel;
