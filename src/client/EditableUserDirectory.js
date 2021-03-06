import React, { Component } from 'react';
import UserModal from './UserModal.js';
import CreateObj from './components/CreateObj'
import * as api from '../apiLookup'
import {Row, Col, Button, ButtonGroup, Table} from 'react-bootstrap'
import Cart from './Cart'
import FontAwesome from 'react-fontawesome'

class EditableUserDirectory extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      requiredItem: 0,
      users: this.props.userList,
      showModal: false
    }

    this.toggleDisplay = this.toggleDisplay.bind(this)
    this.updateOperation = this.updateOperation.bind(this)
    this.deleteOperation = this.deleteOperation.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        users: nextProps.userList,
    });
  }

  toggleDisplay(target){
    console.log(target);
    this.setState(
      prevState=> {
        console.log(prevState);
        return {[target]:!prevState[target]}
      }, ()=>{
        console.log(this.state[target]);
      }
    )
  }

  showCreateUserModal(){
    this.toggleDisplay('showModal')

  }

  replaceModalItem(index) {
    console.log('render modal')
    this.toggleDisplay('showModal')
    this.setState({
      requiredItem: index
    });
  }

  saveModalDetails(item) {
    const requiredItem = this.state.requiredItem;
    let tempUsers = this.state.users;
    tempUsers[requiredItem] = item;
    // this.setState(
    //   ()=> {
    //     return {users: tempUsers}
    //   }, ()=>{
    //     this.crudOperation(item, 'POST')
    //   }
    // )
    this.updateOperation(item, 'PUT')

    // this.setState({ users: tempUsers })

  }

  updateOperation(obj, operation) {
    console.log(obj,operation);
    fetch(api.PROXY_URL+api.API_UPDATE_USER+obj.id, {
      method: operation,
      // Adding body or contents to send
      body: JSON.stringify(obj),
      // Adding headers to the request
      headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Accept": "application/json",

      }
    })
    .then(response => response.json())
    .then(this.forceUpdate())
  }

  deleteOperation(obj, operation) {
    console.log(obj,operation);
    fetch(api.PROXY_URL+api.API_DELETE_USER+obj.id, {
      method: operation
    })
    .then(response => response.json())
    .then(this.forceUpdate())
  }



  deleteItem(index) {
    console.log(this.state.users[index]);
    this.deleteOperation(this.state.users[index], 'DELETE')
    // let tempUsers = this.state.users;
    // tempUsers.splice(index, 1);
    // this.setState({ users: tempUsers });
  }

  render() {
    const {
      userList
    } = this.props;

    const createClassIcon = <FontAwesome
      className="super-crazy-colors"
      name="plus"
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />

    console.log('users', userList)

    const users = this.state.users.map((item, index) => {
      return (
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.userName}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.userType}</td>
            <td>
                <Button
                    onClick={() => this.replaceModalItem(index)}>Edit
                </Button>
                <Button variant='danger' onClick={() => this.deleteItem(index)}>Delete</Button>
            </td>
        </tr>
      )
    });

    const requiredItem = this.state.requiredItem;
    let modalData = this.state.users[requiredItem];
    return (
      <div>

        <span className="sticky-cart">
          <Button onClick={()=>this.toggleDisplay("showModal")}>{createClassIcon}</Button>
        </span>


        <Table striped bordered hover variant="dark">
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
          </Table>
        <UserModal
            id={modalData.id}
            userName={modalData.userName}
            firstName={modalData.firstName}
            lastName={modalData.lastName}
            email={modalData.email}
            userType={modalData.userType}
            saveModalDetails={this.saveModalDetails}
            showModal={this.state.showModal}
            toggleDisplay={this.toggleDisplay}
        />
      </div>
    );
  }
}

export default EditableUserDirectory;
