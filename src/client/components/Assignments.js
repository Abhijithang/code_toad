import React from 'react';
import {Row, Col, Button, ButtonGroup} from 'react-bootstrap'
import PdfGenerator from './PdfGenerator';
import AssignmentCard from './AssignmentCard'

import { connect } from 'react-redux'
import {updateCart} from '../../action'


class Assignments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onChange(e) {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        console.log(e.target.files)
    }

    componentDidMount() {
     // const apiUrl = 'https://codetoad.herokuapp.com/v1/codetoad/course/details/all';
     // fetch(apiUrl)
     //   .then((response) => response.json())
     //   .then((data) => {
     //     console.log('This is your data', data)
     //   });
   }
   handleAssignmentSubmit(){

   }

   getAssignmentAnswers=()=>{

   }


    render() {
      console.log(this.props);
      const assignmentList = this.props.assignments.length != 0? this.props.assignments.map(item=>
        <Col key={item.id} style={{marginBottom:'30px'}} sm={12}><AssignmentCard key={item.id} assignment={item} path={this.props.match.path}/></Col>
      ) :
      <h1>No assignment at this momoent</h1>
        return(
            <div>
                <div>
                  <Row>
                    {assignmentList}
                  </Row>
                    <input type="file" name="file" onChange={(e) => this.onChange(e)} />
                    <PdfGenerator></PdfGenerator>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  console.log("loading item");

  return {
    assignments: state.assignments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (order) => {
      console.log("submit")
      dispatch(updateCart(order))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignments)
