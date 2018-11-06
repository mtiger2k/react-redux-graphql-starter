import React from 'react';
import LoadingIndicator from '../LoadingIndicator'

const Loading = ({children}) => (
  <div>
    {children}
    <LoadingIndicator />
  </div>
);

export default Loading;
