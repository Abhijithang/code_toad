import React, { Component } from 'react';
import Modal from './StudentModal.js';
import * as ReactBootStrap from "react-bootstrap"

class StudentDirectory extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      requiredItem: 0,
      students: this.props.studentList
    }
  }

  replaceModalItem(index) {
    console.log('render modal')
    this.setState({
      requiredItem: index
    });
  }

  saveModalDetails(item) {
    const requiredItem = this.state.requiredItem;
    let tempstudents = this.state.students;
    tempstudents[requiredItem] = item;
    this.setState({ students: tempstudents });
  }

  deleteItem(index) {
    let tempstudents = this.state.students;
    tempstudents.splice(index, 1);
    this.setState({ students: tempstudents });
  }

  render() {   
    const {
      studentList
    } = this.props;
    
    const students = this.state.students.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
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
    let modalData = this.state.students[requiredItem];
    return (
      <div>
        <ReactBootStrap.Table striped bordered hover variant="dark">
          <tbody>
            {students}
          </tbody>
          </ReactBootStrap.Table>
        <Modal
          name={modalData.name}
          email={modalData.email}
          phone={modalData.phone}
          saveModalDetails={this.saveModalDetails}
        />
      </div>
    );
  }
}

export default StudentDirectory;