import React from 'react'
import {Card, CardDeck, Image, Row, Col, Dropdown, DropdownButton, Form, Button, Modal, Carousel} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import './ItemCard.css'
import { connect } from 'react-redux'
import {updateCart} from '../../action'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';






class AssignmentCard extends React.Component {
  constructor(props) {
    super(props)


    this.labelWidth = {
      minWidth: '60px',
      margin:'5px'
    }

  }

  componentDidMount(){

  }



  render() {
    const {
        order,
        products,
        admin,
        role,
        course,
        match,
        location
    } = this.props;
    console.log(this.props, this.state);

    const zoomIcon = <FontAwesome
      className="super-crazy-colors"
      name="search"
      size="lg"
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />

    console.log(this.props);

    const buttonStyle = {
      color: "white",
      textTransform: "capitalize",
      width:"100%"
    };
    return(
      <div>
        <CardDeck>
          <Card className='card-body' bg='dark' text='white'>
            <Card.Body >
              <Row>
                <Col className="cardContent">
                  <Card.Title >{this.props.assignment.name}</Card.Title>
                  <Card.Text className="cardContent" style={{height:"100%"}}>
                    <span style={{height:"100%"}}>Deadline: {this.props.assignment.deadline}</span>
                    <span style={{height:"100%"}}>Total Marks: {this.props.assignment.marks}</span>
                  </Card.Text>

                    <Link className="course-button" to= {{
                      pathname: `${this.props.path}/${this.props.assignment.id}`,
                      state: {questions: this.props.assignment.questions}
                    }}
                    >
                      <Button style={buttonStyle}>Start</Button>
                    </Link>


                </Col>
              </Row>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("loading item");

  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (order) => {
      console.log("submit")
      dispatch(updateCart(order))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentCard)
