import React from 'react'
import {Card, CardDeck, Image, Row, Col, Dropdown, DropdownButton, Form, Button, Modal, Carousel} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import FileUploader from './FileUploader'
import './ItemCard.css'
import {Formik, Field} from 'formik'
import * as yup from 'yup'
import NumberFormat from 'react-number-format'
import { connect } from 'react-redux'
import { produce } from 'immer'
import * as actions from '../../actionLookup'
import {updateCart} from '../../action'





class ItemCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       showModal:false
    }

    this.labelWidth = {
      minWidth: '60px',
      margin:'5px'
    }



    
    this.showImg = this.showImg.bind(this)
    this.closeImg = this.closeImg.bind(this)

  }

  componentDidMount(){

  }



  showImg(){
    this.setState(
      prevState=> {
        return{showModal:true}
      }, ()=>{
        console.log(this.state.showModal);
      }
    )
  }

  closeImg(){
    this.setState(
      prevState=> {
        return{showModal:false}
      }, ()=>{
        console.log(this.state.showModal);
      }
    )
  }

  render() {

    console.log(this.props, this.state);

    const zoomIcon = <FontAwesome
      className="super-crazy-colors"
      name="search"
      size="lg"
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />


    const isValid = this.state.validOrder


    console.log(this.props);
    return(

      <div>



        <CardDeck>

          <Card className='card-body' bg='dark' text='white'>
            <Card.Body >
              <Row>


                <Col className="cardContent">
                  <Card.Title >{this.props.data.name}</Card.Title>
                  <Card.Text className="cardContent" style={{height:"100%"}}>
                    <span style={{height:"100%"}}>{this.props.data.description.repeat(1)}</span>


                  </Card.Text>
                  <FileUploader/>
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

  return {
    order: state.order
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (order) => {
      console.log("submit")
      dispatch(updateCart(order))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard)
