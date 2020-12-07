import React from 'react';
import { connect } from 'react-redux'
import {Card, CardDeck, Image, Row, Col, Dropdown, DropdownButton, Form, Button, Modal, Carousel} from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Course extends React.Component {
    constructor(props) {
        super(props);
    }

    handleCourseMenuOptionClick = () => {
        console.log("ha");
    }

    render() {
        const {
            buyer,
            order,
            products,
            admin,
            role,
            course,
            match, 
            location
        } = this.props;
        const buttonStyle = {
            color: "white",
            textTransform: "capitalize"
        };
        console.log({buyer, order, products, admin, role, course, match,location})
        const courseMenuOptions = ["announcements", "lectures", "assignments", "grades", "syllabus", "student_list"];
        const courseMenu = courseMenuOptions.map(c =>
            <Col key={c} style={{marginBottom:'30px'}} sm={12}><Button className="course-button">
            <Link to={`${location.pathname}/${c}`} style={buttonStyle}>{c}</Link>
          </Button></Col>
        )
        return(
            <div className="course">
                <Row className="course-menu">
                    {courseMenu}
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Course)
