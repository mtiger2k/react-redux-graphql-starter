import React from 'react';
import DefaultLayout from './layout/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));

const Users = React.lazy(() => import('./views/Users/Users'));

const User = React.lazy(() => import('./views/Users/User'));

const Counter = React.lazy(() => import('./views/Counter/Counter'));

const Channels = React.lazy(() => import('./views/Channels/ChannelsListWithData'));

const ChannelDetails = React.lazy(() => import('./views/Channels/ChannelDetails'));

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
