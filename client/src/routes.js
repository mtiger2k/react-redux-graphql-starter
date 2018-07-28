import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './layout/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const Users = Loadable({
  loader: () => import('./views/Users/Users'),
  loading: Loading,
});

const User = Loadable({
  loader: () => import('./views/Users/User'),
  loading: Loading,
});

const Counter = Loadable({
  loader: () => import('./views/Counter/Counter'),
  loading: Loading,
});

const Channels = Loadable({
  loader: () => import('./views/Channels/ChannelsListWithData'),
  loading: Loading,
});

const ChannelDetails = Loadable({
  loader: () => import('./views/Channels/ChannelDetails'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout, private: true },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, private: true },
  { path: '/counter', exact: true, name: 'Counter', component: Counter, private: true },
  { path: '/channels', exact: true, name: 'Channels', component: Channels, private: true },
  { path: '/channels/:channelId', exact: true, name: 'Channel Details', component: ChannelDetails, private: true },
  { path: '/users', exact: true, name: 'Users', component: Users, private: true },
  { path: '/users/:id', exact: true, name: 'User Details', component: User, private: true },
];

export default routes;
