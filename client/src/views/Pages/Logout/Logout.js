import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signoutUser } from '../../../modules/auth'
import { bindActionCreators, compose } from 'redux'
import { withApollo } from 'react-apollo';
import injectSaga from '../../../utils/injectSaga';
import saga from './saga'

class Signout extends Component {

  componentWillMount() {
    this.props.signoutUser();
    this.props.client.resetStore().then(() => console.log('apollo reset'))
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signoutUser
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
