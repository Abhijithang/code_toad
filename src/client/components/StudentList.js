import React from 'react';
import * as ReactBootStrap from "react-bootstrap"
import './StudentList.css'
import EditableStudentDirectory from './EditableStudentDirectory.js';
import NonEditableStudentDirectory from './NonEditableStudentDirectory.js';
import {Card, CardDeck, Image, Row, Col, Dropdown, DropdownButton, Form, Button, Modal, Carousel} from 'react-bootstrap'

const stubStudent = [
    {name: "William Ma", email: "wma5283@gmail.com", phone: "123-456-789"},          
    {name: "William Ma", email: "wma5283@gmail.com", phone: "123-456-789"},          
    {name: "William Ma", email: "wma5283@gmail.com", phone: "123-456-789"},          
    {name: "William Ma", email: "wma5283@gmail.com", phone: "123-456-789"},          
];
class StudentList extends React.Component {
    constructor() {
        super();
        this.state = {
            userType: "instructor",
            //userType: "student",
            studentList: stubStudent,
            userDirectory: '',
            specificCourse: '',
        }
    }

    componentDidMount() {
        const {
            userDirectory,
            specificCourse,
        } = this.state;
        // Simple GET request using fetch
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const userDirectoryUrl = "https://codetoad613.herokuapp.com/v1/codetoad/user/all"; // get user directory for lookup
        const specificCourseUrl = `https://codetoad613.herokuapp.com/v1/codetoad/course/details/${this.props.match.params.courseId}`; // get specific course information
        fetch(proxyUrl + userDirectoryUrl)
            .then(response => response.json())
            .then(data => this.setState({ userDirectory: data }));

        fetch(proxyUrl + specificCourseUrl)
            .then(response => response.json())
            .then(data => this.setState({ specificCourse: data }));
    }

    // using the student id list in the course, we want to retrieve each student's information in the userDirectory
    getListOfStudentInformation = (userDirectory, specificCourse) => {
        const studentListOfId = null;
        if (specificCourse != null || specificCourse != undefined) {
            specificCourse.studentIdList;
            console.log(studentListOfId)
            const listOfStudentInformation = []; 
            studentListOfId.forEach(studentId => {
                if (userDirectory.contains(studentId)) {
                    const index = userDirectory.getIndexOf(studentId)
                    listOfStudentInformation.push(userDirectory.get(index));
                }
            });
            this.setState({studentList : listOfStudentInformation});
        }
    }

    render() {
        const {
            match,
            location,
        } = this.props;
        const {
            userType,
            studentList,
            userDirectory,
            specificCourse,
        } = this.state;

        console.log({userDirectory, match, location, specificCourse});
        if (userDirectory != null || userDirectory != undefined && specificCourse != null || specificCourse != undefined) {
            this.getListOfStudentInformation(userDirectory, specificCourse);
        }
        
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
