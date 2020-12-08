import React from 'react';
import * as ReactBootStrap from "react-bootstrap"
import LoadingPage from './LoadingPage'
import * as api from '../apiLookup'
import EditableUserDirectory from './EditableUserDirectory.js';
import NonEditableUserDirectory from './NonEditableUserDirectory.js';
import {Card, CardDeck, Image, Row, Col, Dropdown, DropdownButton, Form, Button, Modal, Carousel} from 'react-bootstrap'

const stubUser = [
    {id: "", username: "", firstName: "", lastName: "", email: "", userType: ""},
];
class UserList extends React.Component {
    constructor() {
        super();
        this.state = {
          isLoading: true,
          userType: "admin",
          // userType: "student",
          userList: stubUser,
        }
    }

    componentDidMount() {
        // Simple GET request using fetch
        const proxyUrl = api.PROXY_URL;
        // Get List of users Enrolled in a Specific Course API Endpoint
        const userListUrl = api.API_ALL_USERS
        fetch(proxyUrl + userListUrl)
            .then(response => response.json())
            .then(data => this.setState({ userList: data }))
            .then(this.setState({isLoading: false}))
    }

    render() {
      console.log(this.state);
        const {
            match,
            location,
        } = this.props;
        const {
            userType,
            userList,
        } = this.state;
        console.log('userList', userList)
        return(
            <div>
              {this.state.isLoading?
                <div><LoadingPage /></div> :
                <div style={{ textAlign: "center" }}>
                    <h1>User List</h1>
                    {userType != "admin" ? <NonEditableUserDirectory userList={userList} /> : <EditableUserDirectory userList={userList}/>}
                </div>

              }


            </div>
        )
    }
}

export default UserList;
