import React, { Component, Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import { getMenu } from '../../_nav';
// routes config
import routes from '../../routes';

import PrivateRoute from '../../components/PrivateRoute';
import { connect } from 'react-redux'
import Loading from '../../components/Loading'

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="app">
        <ToastContainer position={toast.POSITION.TOP_RIGHT} className="toastify-container" toastClassName="toastify-toast" />
        <AppHeader fixed>
          <Suspense fallback={Loading()}>
          <DefaultHeader />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense fallback={Loading()}>
            <AppSidebarNav navConfig={getMenu(user)} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={Loading()}>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (
                      <PrivateRoute route={route} key={idx} path={route.path} exact={route.exact} name={route.name} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={Loading()}>
            <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={Loading()}>
          <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      user: state.user.user,
  }
}

export default connect(mapStateToProps)(DefaultLayout);

