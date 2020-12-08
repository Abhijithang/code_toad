import React, { Component } from 'react';
import * as ReactBootStrap from "react-bootstrap"
import UserModal from '../UserModal.js';


class EditableStudentDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiredItem: 0,
      students: this.props.studentList,
      showModal: false
    }

    this.toggleDisplay = this.toggleDisplay.bind(this)
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

  componentWillReceiveProps(nextProps) {
    this.setState({
        students: nextProps.studentList,
    });
  }

  deleteItem(index) {
    let tempstudents = this.state.students;
    tempstudents.splice(index, 1);
    this.setState({ students: tempstudents });
    // TODO: Needs to update the Course info by updating its student list with the removed students out of the picture
  }

  handleModal() {
    this.setState({show: !this.state.show});
  }

  render() {
    const {
      studentList
    } = this.props;

    console.log('students', studentList)

    const modalStyle = {
      backgroundColor:"#3f3e4f",
      borderColor:"#3f3e4f"
    }

    const students = this.state.students.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>
            <ReactBootStrap.Button className="btn btn-warning" onClick={() => this.toggleDisplay('showModal')}>Edit</ReactBootStrap.Button>
            <ReactBootStrap.Button className="btn btn-danger" onClick={() => this.deleteItem(index)}>Delete</ReactBootStrap.Button>
          </td>
        </tr>
      )
    });

    return (
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
            {students}
          </tbody>
          </ReactBootStrap.Table>
          <UserModal showModal={this.state.showModal} toggleDisplay={this.toggleDisplay}/>
          {/* I decided that giving privilege to Instructor to add a student to a course is not necessary because the student can just enroll to the class themselves */}
          {/* <ReactBootStrap.Button onClick={() => {this.handleModal()}}>
            + Add Student
          </ReactBootStrap.Button>
          <ReactBootStrap.Modal show={this.state.show}>
            <ReactBootStrap.Modal.Header style={modalStyle}>Add Student</ReactBootStrap.Modal.Header>
            <ReactBootStrap.Modal.Body style={modalStyle}>
              <p><span className="modal-lable">studentId: </span><input value={this.state.addedStudentId} onChange={(e) => this.nameHandler(e)} /></p>
              <p><span className="modal-lable">courseId: </span><input value={this.state.addedCourseId} onChange={(e) => this.emailHandler(e)} /></p>
              <p><span className="modal-lable">name: </span><input value={this.state.addedStudentName} onChange={(e) => this.phoneHandler(e)} /></p>
            </ReactBootStrap.Modal.Body>
            <ReactBootStrap.Modal.Footer style={modalStyle}>
              <ReactBootStrap.Button onClick={() => {this.handleModal()}}>Add Student</ReactBootStrap.Button>
            </ReactBootStrap.Modal.Footer>
          </ReactBootStrap.Modal> */}
      </div>
    );
  }
}

export default EditableStudentDirectory;
