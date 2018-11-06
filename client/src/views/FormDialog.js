import React, { Component } from 'react'
import {
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

class FormDialog extends Component {
  constructor(props) {
  	super(props);
  	this.state = { modal: false }
  }

  toggle = () => {
  	this.setState({modal: !this.state.modal});
  }

  show = () => {
  	this.setState({modal: true});
  }

  hide = () => {
  	this.setState({modal: false});
  }

  render() {
  	const { children, className, title, size } = this.props;
  	return (
  	  <Modal isOpen={this.state.modal} toggle={this.toggle} className={className} size='lg' >
  	    <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
  	    <ModalBody>
  	      {children}
  	    </ModalBody>
  	  </Modal>
  	)
  }
}

export default FormDialog
