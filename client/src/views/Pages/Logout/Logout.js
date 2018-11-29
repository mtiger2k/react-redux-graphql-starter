import { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../../modules/auth'
import { bindActionCreators, compose } from 'redux'
import { withApollo } from 'react-apollo';
import injectSaga from '../../../utils/injectSaga';
import saga from './saga'

class Signout extends Component {

  componentWillMount() {
    this.props.logout();
    this.props.client.resetStore().then(() => console.log('apollo reset'))
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout
    },
    dispatch
  )

const withConnect = connect(null, mapDispatchToProps);

const withSaga = injectSaga({ key: 'logout', saga });

export default compose(
  withSaga,
  withConnect,
  withApollo
)(Signout);
