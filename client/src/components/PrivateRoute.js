import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import ErrorBoundary from './Error';

const PrivateRouteComponent = ({route, authenticated, user, loading, ...rest}) => {
  const renderRedirect = props => {
    if (route.private && !loading && !authenticated) {
      return (
        <Redirect to={{
          pathname: '/login',
          state: {
            from: props.location,
            message: 'You need to sign in'
          }
        }}/>
      )
    } else if (route.private && loading) {
      return (<div>Loading account info</div>)
    } else {
      return (
        <ErrorBoundary>
          <route.component {...props} />
        </ErrorBoundary>
      )
    }
  }

  return <Route {...rest} render={renderRedirect} />;
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user.user,
    loading: state.user.loading
  }
}

const PrivateRoute = connect(mapStateToProps, null)(PrivateRouteComponent)

export default PrivateRoute;
