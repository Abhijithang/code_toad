import React, { Component } from 'react';
import {Card, CardDeck, Image, Row, Col, Dropdown, DropdownButton, Form, Button, Modal, Carousel} from 'react-bootstrap'

class UserModal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            userType: '',
            showModal: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.id,
            username: nextProps.username,
            firstName: nextProps.firstName,
            lastName: nextProps.lastName,
            email: nextProps.email,
            userType: nextProps.userType,
        });
    }

    idHandler(e) {
        this.setState({ id: e.target.value });
    }

    firstNameHandler(e) {
        this.setState({ firstName: e.target.value });
    }

    lastNameHandler(e) {
        this.setState({ lastName: e.target.value });
    }

    usernameHandler(e) {
        this.setState({ username: e.target.value });
    }

    emailHandler(e) {
        this.setState({ email: e.target.value });
    }

    userTypeHandler(e) {
        this.setState({ email: e.target.value });
    }

    handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item)
        this.setState({showModal: false});
        // TODO: Handle Save should also update the users via POST Request. Need to confirm endpoint with Abhi...
    }

    handleClose() {
        console.log('closed')
        this.setState({showModal: false});
    }

    // TODO: Need the Modal to actually disappear/reappear when user selects the "Edit" button
    render() {
      console.log(this.props);
        const modalStyle = {
            backgroundColor:"#3f3e4f",
            borderColor:"#3f3e4f"
        }
        console.log('Reaching the modal')
        return (
            <div>
                <Modal centered show={this.props.showModal} onHide={()=> {this.props.toggleDisplay("showModal")}} >
                    <Modal.Header closeButton style={modalStyle}>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={modalStyle}>
                        <p><span className="modal-lable">Id: </span><input placeholder="Enter Id" value={this.state.id} onChange={(e) => this.idHandler(e)} /></p>
                        <p><span className="modal-lable">Username: </span><input placeholder="Enter Username" value={this.state.username} onChange={(e) => this.usernameHandler(e)} /></p>
                        <p><span className="modal-lable">First Name: </span><input placeholder="Enter First Name" value={this.state.firstName} onChange={(e) => this.firstNameHandler(e)} /></p>
                        <p><span className="modal-lable">Last Name: </span><input placeholder="Enter Last Name" value={this.state.lastName} onChange={(e) => this.lastNameHandler(e)} /></p>
                        <p><span className="modal-lable">Email: </span><input placeholder="Enter Email" value={this.state.email} onChange={(e) => this.emailHandler(e)} /></p>
                        <p><span className="modal-lable">User Type: </span><input placeholder="Enter User Type" value={this.state.userType} onChange={(e) => this.userTypeHandler(e)} /></p>
                    </Modal.Body>

                    <Modal.Footer style={modalStyle}>
                        <Button variant="primary" onClick={() => {this.handleSave()}}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default UserModal;
