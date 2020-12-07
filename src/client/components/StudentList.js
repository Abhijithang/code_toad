import React from 'react';
import * as ReactBootStrap from "react-bootstrap"
import './StudentList.css'
import EditableStudentDirectory from './EditableStudentDirectory.js';
import NonEditableStudentDirectory from './NonEditableStudentDirectory.js';
import {Card, CardDeck, Image, Row, Col, Dropdown, DropdownButton, Form, Button, Modal, Carousel} from 'react-bootstrap'

const stubStudent = [
    {firstName: "", lastName: "", username: "", email: ""},     
];
class StudentList extends React.Component {
    constructor() {
        super();
        this.state = {
            userType: "instructor",
            // userType: "student",
            studentList: stubStudent,
        }
    }

    componentDidMount() {
        // Simple GET request using fetch
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        // Get List of Students Enrolled in a Specific Course API Endpoint
        const studentListUrl = `http://codetoad613.herokuapp.com//v1/codetoad/course/student/details/all/${this.props.match.params.courseId}`;
        fetch(proxyUrl + studentListUrl)
            .then(response => response.json())
            .then(data => this.setState({ studentList: data }));
    }

    render() {
        const {
            match,
            location,
        } = this.props;
        const {
            userType,
            studentList,
        } = this.state;
        console.log('studentList', studentList)
        return(
            <div>
                <div style={{ textAlign: "center" }}>
                    <h1>Student List</h1>
                </div>
                {userType == "student" ? <NonEditableStudentDirectory studentList={studentList} /> : <EditableStudentDirectory studentList={studentList}/>}
            </div>
        )
    }
}

export default StudentList;
