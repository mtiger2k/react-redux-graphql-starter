import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import ErrorBoundary from './Error';
import { hasPermission } from '../permission'

const PrivateRouteComponent = ({route, authenticated, authorized, user, loading, ...rest}) => {
  const renderRedirect = props => {
    if (route.private) {
      if (loading) {
        return (<div>Loading account info</div>)
      }
      if ( !authenticated) {
        return (
          <Redirect to={{
            pathname: '/login',
            state: {
              from: props.location,
              message: 'You need to sign in'
            }
          }}/>
        )
      }
      if (!authorized) {
        return (<div>You are authorized。</div>)
      } 
    }

    return (
      <ErrorBoundary>
        <route.component {...props} />
      </ErrorBoundary>
    )
  }

  return <Route {...rest} render={renderRedirect} />;
}

export const hasAnyAuthority = (user, module, action) => {
  if (user.role) {
    return hasPermission(user.role, module, action);
  }
  return false;
};

function mapStateToProps(state, {route}) {
  return {
    authenticated: state.auth.authenticated,
    authorized: state.user.user && hasAnyAuthority(state.user.user, route.module, route.action),
    user: state.user.user,
    loading: state.user.loading
  }
}

const PrivateRoute = connect(mapStateToProps, null)(PrivateRouteComponent)

export default PrivateRoute;
