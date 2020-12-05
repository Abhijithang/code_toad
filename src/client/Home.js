import React from 'react'
import { connect } from 'react-redux'
import {Card, CardDeck, Image, Row, Col, Dropdown, DropdownButton, Form, Button, Modal, Carousel} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import EnrolledCourse from './components/EnrolledCourse'


class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showCreateForm:false
    }
    
  }




  render(){

    const course = this.props.course
    console.log(this.props);
    const courseList = course? course.map(c=>
      <Col key={c.id} style={{marginBottom:'30px'}} sm={12}><EnrolledCourse data={c}/></Col>
    ) : null
    return(
      <div>
        <div>


        </div>
        <Row>
          {courseList}
        </Row>

      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return state
}



export default connect(mapStateToProps)(Home)
