import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signoutUser } from '../../../modules/auth'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { withApollo } from 'react-apollo';

class Signout extends Component {

  componentWillMount() {
    this.props.signoutUser();
    this.props.client.resetStore().then(() => console.log('apollo reset'))
  }

  render() {
    return <Redirect to='/login'/>
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signoutUser
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(withApollo(Signout))