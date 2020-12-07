import React from 'react';
import * as ReactBootStrap from "react-bootstrap"

class NonEditableUserDirectory extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {
            userList
        } = this.props;

        const renderUser = (userList, index) => {
            return (
                <tr key={index}>
                    <td>{userList.id}</td>
                    <td>{userList.username}</td>
                    <td>{userList.firstName}</td>
                    <td>{userList.lastName}</td>
                    <td>{userList.email}</td>
                    <td>{userList.userType}</td>
                </tr>
            )
        }
        return(
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
                   {userList.map(renderUser)}
                </tbody>
                </ReactBootStrap.Table>
            </div>
        )
    }
}

export default NonEditableUserDirectory;