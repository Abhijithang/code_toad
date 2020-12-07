import React from 'react'
import {Card, CardDeck, Image, Row, Col, Dropdown, DropdownButton, Form, Button, Modal, Carousel} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {Formik, Field} from 'formik'
import './ItemCard.css'

import { connect } from 'react-redux'
import {updateCart} from '../../action'




class Assignment extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      questions:[],
      answers: new Array(this.props.location.state.questions.length).fill(''),
    }

    this.labelWidth = {
      minWidth: '60px',
      margin:'5px'
    }

    this.handleAnswer = this.handleAnswer.bind(this)
    this.submitAnswer = this.submitAnswer.bind(this)
  }

  componentDidMount(){
    console.log(this.state.answers);
    this.setState({ questions: this.props.location.state.questions });
  }

  handleAnswer(event) {
    console.log(event.target.value);
    console.log(event.target.id);
    let index = event.target.id
    let answers = [...this.state.answers];
    answers[index] = event.target.value;
    this.setState({answers:answers})
    // 4. Put it back int
    console.log(index);
    // var item = {...this.prop.item}
    // item.description = this.state.textAreaValue;
    // this.setState(()=>{
    //   return{item:item}
    // }, ()=>{
    //
    // })
    // this.setState({ textAreaValue: event.target.value });
  }


  submitAnswer(){
    console.log("submit answer");
  }



  render() {

    console.log(this.props, this.state);
    var answerList = new Array(this.props.location.state.questions.length).fill('')
    const questionList =  this.props.location.state.questions.length != 0? this.props.location.state.questions.map((item, index)=>
    <CardDeck style={{marginBottom:'20px'}}>
      <Card className='card-body' bg='dark' text='white'>
        <Card.Body >
            <Row>
              <div key={index} style={{width:'100%'}}>

                <h4>Question {index+1}</h4>
                <Row>
                  <Col  style={{marginBottom:'30px'}} sm={12}>{item.q}</Col>
                </Row>
                <Row>
                  <Col key={'a' + index} style={{marginBottom:'10px'}} sm={12}>
                    <Form.Group controlId={index}>
                      <Form.Control as="textarea" rows={3} onBlur={this.handleAnswer}/>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Row>
          </Card.Body>
        </Card>
      </CardDeck>

    ) : <h1>Something is wrong</h1>
    return(
      <div>
        <Form>
          {questionList}
        </Form>

        <div style={{float:'right'}}>
          <Link to='/course/:courseId/assignments'>
            <Button variant='warning'>Back</Button>
          </Link>
          <Button style={{marginLeft:'10px'}} onClick={()=>this.submitAnswer()}>Submit</Button>

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

export default connect(mapStateToProps, mapDispatchToProps)(Assignment)
