import React from 'react'
import { Dropdown, DropdownButton, Button, Modal, Form, Toast } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome'
import {Formik, Field} from 'formik'
import * as yup from 'yup'
import NumberFormat from 'react-number-format'
import { connect } from 'react-redux'
import NumberInput from './components/NumberInput'
import * as actions from './actionLookup'
import {deleteOrder, updateContact} from './action'
import './Cart.css'

const cellRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string()
    .email('The email is invalid')
    .required(),
  cell: yup.string()
    .required("Required")

});

class Cart extends React.Component {
  constructor(props){
    super(props)

    this.state={
      order:{
        buyerInfo:{
          name:"",
          email:"",
          cell:""
        },
        orderList:this.props.order
      },
      showCheckOut:false,
      showNotification: false,
      showCart:false
    }



    this.toggleDisplay = this.toggleDisplay.bind(this)

    this.removeFromCart = this.removeFromCart.bind(this)
    this.submitContact = this.submitContact.bind(this)
    this.generateEmail = this.generateEmail.bind(this)
    this.calculatePrice = this.calculatePrice.bind(this)

  }

  generateEmail(values){
    var subject = "order information - " + new Date().toLocaleString("en-US", {timeZone: "America/New_York"})
    var orderList = ""
    this.props.order.map(
      item=>{
        var d = ""
        Object.keys(item).map(key=>{
          if (key!=="id"&& key!== "price") {
            d+=key+": "+item[key] + " "
          }
        })
        console.log(d);
        orderList += d + "\n"
    })
    var contactInfo = ""
    Object.keys(values).map(key =>{
      contactInfo += key + ": " + values[key] + "\n"
    })
    var body = "order info: \n" + orderList + "\n" + "contact info:\n" + contactInfo
    window.open("mailto:sssinc855@cs.com?subject=" + encodeURIComponent(subject) + "&body=" +encodeURIComponent(body))
  }

  submitContact(values){
    console.log(values);
    this.toggleDisplay("showNotification")
    this.toggleDisplay("showCheckOut")
    this.generateEmail(values)

    this.props.updateContact(values)


  }

  removeFromCart(order){
    console.log(this.props.order);
    if (this.props.order.length === 1) {
      this.toggleDisplay("showCart")
    }
    this.props.removeFromCart(order)
    this.forceUpdate()
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

  calculatePrice(){
    var total = 0
    console.log(this.props);
    this.props.order.map(order=>{ return total += parseFloat(order.price.slice(1), 10) * parseFloat(order.amount, 10)})
    return total.toFixed(2)
  }

  render(){
    console.log(this.props, this.state);
    const cartIcon = <FontAwesome
      className="super-crazy-colors"
      name="shopping-cart"
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />

    const removeIcon = <FontAwesome
      className="super-crazy-colors"
      name="remove"
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />

    const removeIconStyle = {float:'right',
                            marginRight:'5px',
                            height:'75%',
                            alignSelf:'center'
                           }

    const dropdownItemStyle = {padding:'5px',

                              }
    const modalStyle = {
      backgroundColor:"#3f3e4f",
      borderColor:"#3f3e4f"
    }
    console.log(this.props, this.state);
    const orderItems = this.props.order.length != 0? this.props.order.map(order=> <div key={order.id+order.color+order.size} style={{display: 'inline-flex', width:'100%', marginBottom:'3px'}}>
      <Dropdown.Item style={{fontSize:"14px"}} disabled><div style={{fontWeight:"bold"}}>{order.name}</div>{order.color} - {order.size} x {order.amount}</Dropdown.Item>
      <Button size='sm' variant='danger' style={removeIconStyle} onClick={()=>this.removeFromCart(order)}>{removeIcon}</Button>
    </div> ) : <Dropdown.Item disabled>Empty Cart</Dropdown.Item>



    return(

      <div>
        <div style={{marginRight:"10px"}}>
          <Dropdown alignRight onToggle={()=>this.toggleDisplay("showCart")} >
            <Dropdown.Toggle id="cart">
              {cartIcon}
            </Dropdown.Toggle>
            <Dropdown.Menu id="cartMenu" className={this.props.order.length%2 === 0? "even-cart" : "odd-cart"} show={this.state.showCart} style={{marginRight:"100px"}}>
              <Dropdown.Header>Order Details</Dropdown.Header>
              {orderItems}
              <Dropdown.Divider />
              <Dropdown.Item disabled>Total: {this.props.order.length===0? <span>N/A</span> : <span style={{textDecoration:"line-through", color:"red", fontWeight:"bold", marginRight:"15px"}}>{this.calculatePrice()}</span>}</Dropdown.Item>
              <Button disabled={this.props.order.length===0} onClick={()=>this.toggleDisplay("showCheckOut")} style={{margin:'10px', float:'right' , alignSelf: 'center'}}>Check Out!</Button>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Modal centered show={this.state.showCheckOut} onHide={()=>this.toggleDisplay("showCheckOut")} >
          <Modal.Header closeButton style={modalStyle}>
            <Modal.Title>Last step!</Modal.Title>
          </Modal.Header>
          <Modal.Body style={modalStyle}>
          Please fill in your email or cellphone number as contact info.<br />
          We should reach out to you within 24 hours!
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={schema}
            onSubmit={(values, { validate }) => {
                console.log(values);
                this.submitContact(values)

            }}
            initialValues={this.props.buyer}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              handleReset,
              values,
              touched,
              isValid,
              errors,
            }) => (

              <Form noValidate onSubmit={handleSubmit} style={{marginTop:"10px"}}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                  type="name"
                  placeholder="Enter name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formCell">
                  <Form.Label>Cell #</Form.Label>
                  <Form.Control

                  format="(###) ###-####"
                  placeholder="Enter cellphone number"
                  name="cell"
                  value={values.cell}
                  onChange={handleChange}
                  isInvalid={!!errors.cell}
                  as={NumberFormat}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cell}
                  </Form.Control.Feedback>

                </Form.Group>
                <div style={{float:"right"}}>
                  <Button variant="warning" onClick={handleReset}>Reset</Button>
                  <Button variant="primary" type="submit" style={{marginLeft:"5px"}}>Send Order!</Button>
                </div>
              </Form>
            )}
          </Formik>
          </Modal.Body>
        </Modal>
        <Toast onClose={
        () => this.toggleDisplay("showNotification")}
        show={this.state.showNotification}
        delay={5000}
        autohide
        className="toastCustom"
        style={{
          position: 'absolute',
          bottom: "15px",
          right: "15px",
        }}
        >
          <Toast.Header className="toastCustom">
            <strong className="mr-auto">Order Sent!</strong>
          </Toast.Header>
          <Toast.Body >We should reach out to you within 24 hours!</Toast.Body>
        </Toast>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (order) => {
      console.log("delete")
      dispatch(deleteOrder(order))},
    updateContact: (buyer) => {
      console.log("update buyer contact")
      dispatch(updateContact(buyer))}

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
