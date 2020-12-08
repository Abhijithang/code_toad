import React from 'react'
import {Card, CardDeck, Image, Row, Col, Dropdown, DropdownButton, Form, Button, Modal, Carousel} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import './ItemCard.css'
import CreateClass from './CreateClass'
import { connect } from 'react-redux'
import { produce } from 'immer'
import * as actions from '../../actionLookup'
import {updateCart, crudOperation} from '../../action'

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
      touched:false,
      textAreaValue:"",
      editing: false
    }

    this.labelWidth = {
      minWidth: '60px',
      margin:'5px'
    }

    this.props.order.length == 0 ? console.log("no order"): console.log("$$");


    this.resetOrder = this.resetOrder.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.initOrderStatus = this.initOrderStatus.bind(this)
    this.formTouched = this.formTouched.bind(this)
    this.crudOperation = this.crudOperation.bind(this)
    this.toggleDisplay = this.toggleDisplay.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
    this.updateCourse = this.updateCourse.bind(this)
    this.updateCourseApi = this.updateCourseApi.bind(this)
    this.deleteCourseApi = this.deleteCourseApi.bind(this)
  }

  componentDidMount(){
    this.initOrderStatus()

  }

  handleDescription(event){
    this.setState({ textAreaValue: event.target.value });

  }

  toggleDisplay(target){
    console.log(target);
    this.setState(
      prevState=> {
        console.log(prevState);
        return {[target]:!prevState[target]}
      }, ()=>{
        console.log(this.state[target],this.state);
      }
    )
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
    console.log(id)
    setTimeout(()=>{
      this.props.addToCart(this.props.item)
    },0)

    this.formTouched()
  }

  updateCourse(target, operation){
    var item = {...this.state.item}
    item.description = this.state.textAreaValue;
    this.setState(()=>{
      return{item:item}
    }, ()=>{

      this.toggleDisplay("editing")
      this.props.crudOperation(item, target, operation)
      // console.log(this.state.item);
    })

  }

  updateCourseApi(){
    var item = {...this.state.item}
    item.description = this.state.textAreaValue;
    this.setState(()=>{
      return{item:item}
    }, ()=>{
      console.log(this.state);
      this.toggleDisplay("editing")
      fetch("https://cors-anywhere.herokuapp.com/"+"https://codetoad613.herokuapp.com/v1/codetoad/course/update", {
        method: "PUT",
        body: JSON.stringify(this.state.item),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Accept": "application/json",

        }
      })
      .then(response => response.json())
      .then(this.forceUpdate())
    })
  }

  deleteCourseApi(obj){
    console.log(obj);
    fetch("https://cors-anywhere.herokuapp.com/"+"https://codetoad613.herokuapp.com/v1/codetoad/course/delete/"+obj.id, {
      method: "DELETE",
      body: JSON.stringify(this.state.item),
      headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Accept": "application/json",

      }
    })
    .then(response => response.json())
    .then(this.forceUpdate())
  }

  crudOperation(obj, target, operation) {
    console.log(obj)
    this.props.crudOperation(obj, target, operation)
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

    const carouselImgs = this.state.item.image? this.state.item.image.map(img=>
      <Carousel.Item key={img.path}>
        <img
          className="d-block w-100"
          src={require(`${img.path}`)}
          alt="IMG"
        />
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
    ) : <Carousel.Item key="./toad.png">
      <img
        className="d-block w-100"
        src={require("./toad.png")}
        alt="IMG"
      />
      <Carousel.Caption>

      </Carousel.Caption>
    </Carousel.Item>

    const isValid = this.state.validOrder

    console.log(this.props);
    return(

      <div>

        <CardDeck>
          <Card className='card-body' bg='dark' text='white'>
            <Card.Body >
              <Row>

                <Image style={{ cursor: "zoom-in" }} onClick={()=>this.toggleDisplay('showModal')} className='product-image' src={this.state.item.image? require(`${this.state.item.image[0].path}`): require("../image/toad.png")} />
                <Modal centered show={this.state.showModal} onHide={()=>this.toggleDisplay('showModal')} >

                  <Modal.Body style={{backgroundColor:"lightslategrey"}}>
                    <Carousel fade interval="25000" >
                      {carouselImgs}
                    </Carousel>
                  </Modal.Body>

                </Modal>
                <Col className="cardContent">
                  <Card.Title >{this.state.item.name}</Card.Title>
                  <Card.Text className="cardContent" style={{height:"100%"}}>
                    {this.state.editing?
                      <div>
                        <Form.Control as="textarea" rows={3} value={this.state.textAreaValue}   onChange={this.handleDescription}/>
                        <Button size='sm' variant='warning' style={{float:'right'}} onClick={()=> this.updateCourseApi()}>Update</Button>
                        <Button size='sm' style={{float:'right'}} onClick={()=>this.toggleDisplay("editing")}>Back</Button>

                      </div> :
                      <span style={{marginBottom:"10px"}}>{this.state.item.description}</span>
                    }




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
                          {
                            this.props.role === "admin"?
                            <div>

                              <Button size='sm' variant='warning' onClick={()=>this.toggleDisplay("editing")}>Edit</Button>
                              <Button size='sm' variant='danger' onClick={()=> this.deleteCourseApi(this.state.item)} style={{marginLeft:"5px"}}>Delete</Button>
                            </div> :
                            <Button size="sm" onClick={ ()=> this.addToCart(this.state.item.id)}  style={{marginLeft:"5px"}}>Add to Cart</Button>
                          }

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
    order: state.order,
    role: state.role
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (order) => {
      console.log("submit")
      dispatch(updateCart(order))
    },
    crudOperation: (order, target, operation) => {
      console.log("submit")
      console.log("crudOperation");
      dispatch(crudOperation(order, target, operation))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard)
