import React, { Component } from 'react';
import {Card, CardDeck, Image, Row, Col, Dropdown, DropdownButton, Form, Button, Modal, Carousel} from 'react-bootstrap'

class StudentModal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            name: '',
            email: '',
            phone: '',
            showModal: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.name,
            email: nextProps.email,
            phone: nextProps.phone,
        });
    }

    nameHandler(e) {
        this.setState({ name: e.target.value });
    }

    emailHandler(e) {
        this.setState({ email: e.target.value });
    }

    phoneHandler(e) {
        this.setState({ phone: e.target.value });
    }

    handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item)
        this.setState({showModal: false});
    }

    handleClose() {
        console.log('closed')
        this.setState({showModal: false});
    }

    render() {
        const modalStyle = {
            backgroundColor:"#3f3e4f",
            borderColor:"#3f3e4f"
        }
        console.log('Reaching the modal')
        return (
            <div>
                <Modal.Dialog centered show={this.state.showModal} onHide={this.handleClose} >
                    <Modal.Header closeButton style={modalStyle}>
                        <Modal.Title>Edit Student</Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={modalStyle}>
                        <p><span className="modal-lable">name: </span><input value={this.state.name} onChange={(e) => this.nameHandler(e)} /></p>
                        <p><span className="modal-lable">email: </span><input value={this.state.email} onChange={(e) => this.emailHandler(e)} /></p>
                        <p><span className="modal-lable">phone: </span><input value={this.state.phone} onChange={(e) => this.phoneHandler(e)} /></p>
                    </Modal.Body>

                    <Modal.Footer style={modalStyle}>
                        <Button variant="primary" onClick={() => {this.handleSave()}}>Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default StudentModal;