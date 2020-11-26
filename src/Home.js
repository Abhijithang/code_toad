import React from 'react'
import { connect } from 'react-redux'
import {Card, CardDeck, Image, Row, Col, Dropdown, DropdownButton, Form, Button, Modal, Carousel} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import EnrolledCourse from './components/EnrolledCourse'
import CreateClass from './components/CreateClass'

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showCreateForm:false
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


  render(){
    const createClassIcon = <FontAwesome
      className="super-crazy-colors"
      name="plus"
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />
    const course = this.props.course
    console.log(this.props);
    const courseList = course? course.map(c=>
      <Col key={c.id} style={{marginBottom:'30px'}} sm={12}><EnrolledCourse data={this.props.products.catalog.find(enrolled => enrolled.id === c.id)}/></Col>
    ) : null
    return(
      <div>
        <div>
          {
            this.props.role == "instructor"?
            <span className="sticky-cart">
              <Button onClick={()=>this.toggleDisplay("showCreateForm")}>{createClassIcon}</Button>
            </span> : ""
          }

        </div>
        <Row>
          {courseList}
        </Row>
        <CreateClass showCreateForm={this.state.showCreateForm} toggleDisplay={this.toggleDisplay}/>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return state
}



export default connect(mapStateToProps)(Home)
