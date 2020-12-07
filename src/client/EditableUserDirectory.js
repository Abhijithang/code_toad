import React, { Component } from 'react';
import UserModal from './UserModal.js';
import * as ReactBootStrap from "react-bootstrap"

class EditableUserDirectory extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      requiredItem: 0,
      users: this.props.userList
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        users: nextProps.userList,
    });
  }

  replaceModalItem(index) {
    console.log('render modal')
    this.setState({
      requiredItem: index
    });
  }

  saveModalDetails(item) {
    const requiredItem = this.state.requiredItem;
    let tempUsers = this.state.users;
    tempUsers[requiredItem] = item;
    this.setState({ users: tempUsers });
  }

  deleteItem(index) {
    let tempUsers = this.state.users;
    tempUsers.splice(index, 1);
    this.setState({ users: tempUsers });
  }

  render() {   
    const {
      userList
    } = this.props;

    console.log('users', userList)
    
    const users = this.state.users.map((item, index) => {
      return (
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.username}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.userType}</td>
            <td>
                <ReactBootStrap.Button data-toggle="modal" data-target="#exampleModal"
                    onClick={() => this.replaceModalItem(index)}>Edit
                </ReactBootStrap.Button> {" "}
                <ReactBootStrap.Button className="btn btn-danger" onClick={() => this.deleteItem(index)}>Delete</ReactBootStrap.Button>
            </td>
        </tr>
      )
    });
    
    const requiredItem = this.state.requiredItem;
    let modalData = this.state.users[requiredItem];
    return (
      <div>
        <ReactBootStrap.Table striped bordered hover variant="dark">
          <thead>
            <tr>
                <th>Id</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>User Type</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
          </ReactBootStrap.Table>
        <UserModal
            id={modalData.id}
            username={modalData.username}
            firstName={modalData.firstName}
            lastName={modalData.lastName}
            email={modalData.email}
            userType={modalData.userType}
            saveModalDetails={this.saveModalDetails}
        />
      </div>
    );
  }
}

export default EditableUserDirectory;