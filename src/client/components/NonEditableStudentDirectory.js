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
                    <td>{studentList.name}</td>
                    <td>{studentList.email}</td>
                    <td>{studentList.phone}</td>
                </tr>
            )
        }
        return(
            <div>
                <ReactBootStrap.Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
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
