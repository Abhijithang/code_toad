import React from 'react';
import * as ReactBootStrap from "react-bootstrap"

class StudentList extends React.Component {
    constructor() {
        super();
    }

    render() {
        console.log(this.props);
        const stubStudents = [
            {name: "William Ma", email: "wma5283@gmail.com", phone: "123-456-789"},          
            {name: "William Ma", email: "wma5283@gmail.com", phone: "123-456-789"},          
            {name: "William Ma", email: "wma5283@gmail.com", phone: "123-456-789"},          
            {name: "William Ma", email: "wma5283@gmail.com", phone: "123-456-789"},          
        ]

        const renderStudent = (stubStudents, index) => {
            return (
                <tr key={index}>
                    <td>{stubStudents.name}</td>
                    <td>{stubStudents.email}</td>
                    <td>{stubStudents.phone}</td>
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
                   {stubStudents.map(renderStudent)}
                </tbody>
                </ReactBootStrap.Table>
            </div>
        )
    }
}

export default StudentList;
