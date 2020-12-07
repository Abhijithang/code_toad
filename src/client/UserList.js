import React from 'react';
import * as ReactBootStrap from "react-bootstrap"
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
            userType: "admin",
            // userType: "student",
            userList: stubUser,
        }
    }

    componentDidMount() {
        // Simple GET request using fetch
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        // Get List of users Enrolled in a Specific Course API Endpoint
        const userListUrl = "https://codetoad613.herokuapp.com/v1/codetoad/user/all";
        fetch(proxyUrl + userListUrl)
            .then(response => response.json())
            .then(data => this.setState({ userList: data }));
    }

    render() {
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
                <div style={{ textAlign: "center" }}>
                    <h1>User List</h1>
                </div>
                {userType != "admin" ? <NonEditableUserDirectory userList={userList} /> : <EditableUserDirectory userList={userList}/>}
            </div>
        )
    }
}

export default UserList;
