import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { Button, Col, Form, Input, FormFeedback, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { REQUEST_LOGIN } from '../../../modules/auth'

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'required'
  }
  if (!values.password) {
    errors.password = 'required'
  }
  return errors
}

const renderLoginField = ({ input, label, type, placeholder, icon, mb, meta: { touched, error, warning }, ...rest }) => (
    <InputGroup className={mb}>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className={icon}></i>
        </InputGroupText>
      </InputGroupAddon>
      <Input {...input} type={type} placeholder={placeholder} invalid={touched && error} {...rest} />
      <FormFeedback>{error}</FormFeedback>
    </InputGroup>
)

class LoginForm extends Component {

  submit({ username, password }, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch({ 
        type: 'REQUEST_LOGIN',
        username, password,
        resolve,
        reject 
      });
    }).catch((error) => {
      throw new SubmissionError(error);
    });
  }

    render() {
        const { handleSubmit, submitting, error } = this.props;
        return (
			<div>
	            <h1>Login</h1>
	            <p className="text-muted">Sign In to your account</p>
	            <Form onSubmit={handleSubmit(this.submit.bind(this))}>
	            <Field name="username" placeholder="Username" mb="mb-3" icon="icon-user" type="text" component={renderLoginField} />
	            <Field name="password" placeholder="Password" mb="mb-4" icon="icon-lock" type="password" component={renderLoginField} />
	            {error && <div style={{color:'red'}}>{error}</div>}
              <Row>
	              <Col xs="6">
	                <Button color="primary" className="px-4" type="submit" disabled={submitting}>{submitting?'Submitting': 'Login'}</Button>
	              </Col>
	              <Col xs="6" className="text-right">
	                <Button color="link" className="px-0">Forgot password?</Button>
	              </Col>
	            </Row>
	            </Form>
			</div>
		);
    }
}

export default reduxForm({
  form: 'login',
  validate
})(LoginForm)
