import React from 'react';
import LoadingPage from './components/Loading'
import loadable from '@loadable/component'
import DefaultLayout from './layout/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = loadable(() => import('./views/Dashboard'), {
  fallback: Loading,
});

const Users = loadable(() => import('./views/Users/Users'), {
  fallback: Loading,
});

const User = loadable(() => import('./views/Users/User'), {
  fallback: Loading,
});

const Counter = loadable(() => import('./views/Counter/Counter'), {
  fallback: Loading,
});

const Channels = loadable(() => import('./views/Channels/ChannelsListWithData'), {
  fallback: Loading,
});

const ChannelDetails = loadable(() => import('./views/Channels/ChannelDetails'), {
  fallback: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/counter', exact: true, name: 'Counter', component: Counter },
  { path: '/channels', exact: true, name: 'Channels', component: Channels },
  { path: '/channels/:channelId', exact: true, name: 'Channel Details', component: ChannelDetails },
  { path: '/users', exact: true, name: 'Users', component: Users, private: true, module: 'user', action: 'list' },
  { path: '/users/:id', exact: true, name: 'User Details', component: User, private: true, module: 'user', action: 'view' },
];

export default routes;
