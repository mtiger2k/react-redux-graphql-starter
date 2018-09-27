import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'
import { loginRequest } from '../../../modules/auth'

class Login extends Component {

  handleSubmit({username, password}) {
    //return this.props.login({username, password})
    return this.props.loginRequest({username, password})
  }

  render() {
    const { location, authenticated } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    return (authenticated) ?
      <Redirect to={from}/>
      :
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <LoginForm onSubmit={this.handleSubmit.bind(this)} />
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    ;
  }
}

const mapDispatchToProps = { loginRequest }

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
