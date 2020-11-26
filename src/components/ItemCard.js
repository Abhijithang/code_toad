import React from 'react'
import {Card, CardDeck, Image, Row, Col, Dropdown, DropdownButton, Form, Button, Modal, Carousel} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import './ItemCard.css'
import { connect } from 'react-redux'
import { produce } from 'immer'
import * as actions from '../actionLookup'
import {updateCart} from '../action'

class ItemCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: this.props.item,
      order:{
        id: this.props.item.id,
        name: this.props.item.name,
        price: this.props.item.price
      },
      touched:false
    }

    this.labelWidth = {
      minWidth: '60px',
      margin:'5px'
    }

    this.props.order.length == 0 ? console.log("no order"): console.log("$$");


    this.resetOrder = this.resetOrder.bind(this)
    this.showImg = this.showImg.bind(this)
    this.closeImg = this.closeImg.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.validateOrder = this.validateOrder.bind(this)
    this.initOrderStatus = this.initOrderStatus.bind(this)
    this.formTouched = this.formTouched.bind(this)

  }

  componentDidMount(){
    this.initOrderStatus()

  }



  initOrderStatus(){
    this.props.order.map(order=> {if (order.id == this.props.item.id) {
      this.setState(
        prevState => {
          return{order:order}
        }, () => {
          console.log(this.state.order)
        }
      )}}
    )
  }

  formTouched(){
    this.setState(prevState=>{
      return{touched:true}
    }, ()=>{
      console.log(this.state.touched);
    })
  }

  addToCart(id) {
    if (this.state.validOrder) {
      console.log(id)
      setTimeout(()=>{
        this.props.addToCart(this.state.order)
      },0)

    } else {
      console.log(this.state.order)
    }
    console.log(id)
    setTimeout(()=>{
      this.props.addToCart(this.state.order)
    },0)

    this.formTouched()
  }

  validateOrder(){

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

  resetOrder(){
    console.log("reset");
    this.setState(
      prevState => {
        let order = Object.assign({}, prevState.order);
        Object.keys(order).filter(key => key != "id" && key!= "name").map(key => order[key]="")

        return { order:order, validOrder:false }
      },
      ()=>{
        console.log(this.state.order);
      }
    )
  }

  render() {

    console.log(this.props, this.state);

    const priceTag = this.props.item.price?
    <span style={{color:"red", fontWeight:"bold", marginRight:"15px"}}>{this.props.item.price}</span> :
    <span style={{marginRight:"15px"}}>N/A</span>
    console.log(priceTag);

    const zoomIcon = <FontAwesome
      className="super-crazy-colors"
      name="search"
      size="lg"
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />

    const carouselImgs = this.state.item.image.map(img=>
      <Carousel.Item key={img.path}>
        <img
          className="d-block w-100"
          src={require(`${img.path}`)}
          alt="IMG"
        />
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
    )

    const isValid = this.state.validOrder

    console.log(this.props);
    return(

      <div>

        <CardDeck>
          <Card className='card-body' bg='dark' text='white'>
            <Card.Body >
              <Row>

                <Image style={{ cursor: "zoom-in" }} onClick={()=>this.showImg()} className='product-image' src={require(`${this.state.item.image[0].path}`)} />
                <Modal centered show={this.state.showModal} onHide={()=>this.closeImg()} >

                  <Modal.Body style={{backgroundColor:"lightslategrey"}}>
                    <Carousel fade interval="25000" >
                      {carouselImgs}
                    </Carousel>
                  </Modal.Body>

                </Modal>
                <Col className="cardContent">
                  <Card.Title >{this.state.item.name}</Card.Title>
                  <Card.Text className="cardContent" style={{height:"100%"}}>
                    <span style={{height:"100%"}}>{this.state.item.description.repeat(1)}</span>


                  </Card.Text>
                  <Row className="orderSelect">
                    <Card.Footer  style={{width:"100%", padding:"5px"}}>

                        <Form inline style={{float:"left"}}>
                          <Form.Group>
                            <Form.Label style={this.labelWidth} htmlFor="inlineFormCustomSelectPref">
                              Enrollment Fee:
                            </Form.Label>
                            <span>{priceTag}</span>

                          </Form.Group>

                        </Form>
                        <div style={{float:"right"}}>
                          
                          <Button size="sm" onClick={ ()=> this.addToCart(this.state.item.id)}  style={{marginLeft:"5px"}} >Add to Cart</Button>
                        </div>



                    </Card.Footer>
                  </Row>
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
