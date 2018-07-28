import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button, Col, Form, Input, FormFeedback, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = '必填项'
  }
  if (!values.password) {
    errors.password = '必填项'
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

    render() {
        const { handleSubmit, submitting, errorMessage } = this.props;
        return (
			<div>
	            <h1>Login</h1>
	            <p className="text-muted">Sign In to your account</p>
	            <Form onSubmit={handleSubmit}>
	            <Field name="username" placeholder="Username" mb="mb-3" icon="icon-user" type="text" component={renderLoginField} />
	            <Field name="password" placeholder="Password" mb="mb-4" icon="icon-lock" type="password" component={renderLoginField} />
	            {errorMessage && <div style={{color:'red'}}>{'用户名或密码错误！'}</div>}
              <Row>
	              <Col xs="6">
	                <Button color="primary" className="px-4" type="submit" disabled={submitting}>{submitting?'正在登录': '登录'}</Button>
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
