import React from 'react';
import * as ReactBootStrap from "react-bootstrap"
import './StudentList.css'


class NonEditableStudentDirectory extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {
            studentList
        } = this.props;

        const renderStudent = (studentList, index) => {
            return (
                <tr key={index}>
                    <td>{studentList.firstName}</td>
                    <td>{studentList.lastName}</td>
                    <td>{studentList.username}</td>
                    <td>{studentList.email}</td>
                </tr>
            )
        }
        return(
            <div>
                <ReactBootStrap.Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                   {studentList.map(renderStudent)}
                </tbody>
                </ReactBootStrap.Table>
            </div>
        )
    }
}

export default NonEditableStudentDirectory;
