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
        color: this.props.item.spec[0].color,
        price: this.props.item.spec[0].price,
        size: this.props.item.spec[0].size[0],
        amount: ""
      },
      showModal:false,
      errorMessage: {
        id: false,
        name: false,
        color: false,
        size:false,
        amount:false
      },
      validOrder:false,
      touched:false
    }

    this.labelWidth = {
      minWidth: '60px',
      margin:'5px'
    }

    this.props.order.length == 0 ? console.log("no order"): console.log("$$");

    this.setOrder = this.setOrder.bind(this)
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
    this.formTouched()
  }

  validateOrder(){
    console.log("validating");
    let invalid = 0
    Object.keys(this.state.order).map(key => {
      if (this.state.order[key] == "") {
        this.state.errorMessage[key] = true
        invalid ++
      } else {
        this.state.errorMessage[key] = false
      }
    })
    let validOrder
    console.log(this.state.errorMessage);
    invalid == 0 ? validOrder = true :validOrder = false
    console.log(validOrder);
    this.setState(
      prevState=> {
        return{validOrder:validOrder}
      }, ()=>{
        console.log(this.state.validOrder);
      }
    )
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

  setOrder(e){
    e.persist();
    console.log(e.target.id);
    this.setState(
      prevState => {
        let order = Object.assign({}, prevState.order);
        console.log(order[e.target.id]);
        if(order.color && e.target.id === "color") {
          

          console.log(order);
          order[e.target.id] = e.target.value
          order.price = this.props.item.spec.find(spec => {return spec.color === e.target.value}).price
          return{ order }
        } else {
          order[e.target.id] = e.target.value
          return{ order }
        }
      }
      ,
      ()=>{
        this.validateOrder()
        console.log(this.state.order,this.props.order);
      }
    )
  }

  resetOrder(){
    console.log("reset");
    this.setState(
      prevState => {
        let order = Object.assign({}, prevState.order);
        Object.keys(order).filter(key => key != "id" && key!= "name").map(key => order[key]="")
        order.color =  this.props.item.spec[0].color
        order.price = this.props.item.spec[0].price
        order.size = this.props.item.spec[0].size[0]
        console.log(order, this.props.item.spec[0].color);
        return { order:order, validOrder:false }
      },
      ()=>{
        console.log(this.state.order);
      }
    )
  }

  render() {

    console.log(this.props, this.state);

    const colorOptions = this.props.item.spec[0] ? this.props.item.spec.map(item =>

      <option key={item.color} value={item.color}>{item.color}</option>
    ):<option>n/a</option>
    console.log(colorOptions);

    const priceTag = this.props.item.spec.find(spec => {return spec.color === this.state.order.color})?
    <span style={{textDecoration:"line-through", color:"red", fontWeight:"bold", marginRight:"15px"}}>{this.props.item.spec.find(spec => {return spec.color === this.state.order.color}).price}</span> :
    <span style={{marginRight:"15px"}}>N/A</span>
    console.log(priceTag);

    const sizeOptions =this.props.item.spec.find(spec => {return spec.color === this.state.order.color})?
    this.props.item.spec.find(spec => {return spec.color === this.state.order.color}).size.map(size =>
      <option key= {size} value={size}>{size}</option>
    ) : <option value="">n/a</option>
    console.log(sizeOptions);

    const amountOptions = Array.from(Array(20), (_, i) => i+1).map(
      value=> <option key= {value} value={value}>{value}</option>
    )

    const errorText = Object.keys(this.state.errorMessage).map(key=>this.state.errorMessage[key] == true ? <span>{key} </span> : <span></span>)

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
                              MAP:
                            </Form.Label>
                            <span>{priceTag}</span>

                          </Form.Group>
                          <Form.Group>
                            <Form.Label style={this.labelWidth} htmlFor="inlineFormCustomSelectPref">
                              Color
                            </Form.Label>
                            <Form.Control size="sm" as="select"
                            id="color"
                            className="ml-2 mr-4"
                            value={this.state.order.color}
                            onChange={this.setOrder} >

                              {colorOptions}
                            </Form.Control>
                          </Form.Group>

                          <Form.Group>
                            <Form.Label style={this.labelWidth} htmlFor="inlineFormCustomSelectPref">
                              Size
                            </Form.Label>
                            <Form.Control size="sm" as="select"
                            id="size"
                            className="ml-2 mr-4"
                            value={this.state.order.size}
                            onChange={this.setOrder}>

                              {sizeOptions}
                            </Form.Control>
                          </Form.Group>




                          <Form.Group>
                            <Form.Label style={this.labelWidth} htmlFor="inlineFormCustomSelectPref">
                              Amount
                            </Form.Label>
                            <Form.Control size="sm" as="select"
                            id="amount"
                            custom
                            className="ml-2 mr-4"
                            value={this.state.order.amount}
                            onChange={this.setOrder}>
                              <option key="" value="">0</option>
                              {amountOptions}

                            </Form.Control>

                          </Form.Group>



                        </Form>
                        <div style={{float:"right"}}>
                          <Button size="sm" onClick={this.resetOrder} variant="warning">Reset</Button>
                          <Button size="sm" onClick={ ()=> this.addToCart(this.state.item.id)}  style={{marginLeft:"5px"}} disabled={!isValid}>Add to Cart</Button>
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
