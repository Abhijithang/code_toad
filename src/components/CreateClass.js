import React from 'react'
import {Card, CardDeck, Image, Row, Col, Dropdown, DropdownButton, Form, Button, Modal, Carousel} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import FileUploader from './FileUploader'
import {Formik, Field} from 'formik'
import * as yup from 'yup'
import NumberFormat from 'react-number-format'
import { connect } from 'react-redux'
import { produce } from 'immer'
import * as actions from '../actionLookup'
import {createCourse} from '../action'

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  grader: yup.string()


});


class CreateClass extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      newcourse:{
        id: null,
        name: "",
        description: "",
        instructor: "",
        grader: ""
      },


    }
    this.createCourse = this.createCourse.bind(this)
    this.checkNewClass = this.checkNewClass.bind(this)
  }

  componentDidMount(){

  }

  checkNewClass(values) {
    console.log("check class name")
    console.log(this.props);
    var exsist = false
    this.props.catalog.map(c => {
      if (c.name == values.name) {
        exsist = true
      }
    })
    return exsist
  }

  createCourse(values) {
    values.id = this.props.catalog.length.toString()
    console.log("creating a new class");
    console.log(values);
    console.log(this.checkNewClass(values));
    if (this.checkNewClass(values)) {
      console.log("class name already taken");
    } else {
      console.log("updating catalog");
      this.props.createCourse(values)
    }
    // this.props.toggleDisplay("showCreateForm")

  }


  render() {


    const modalStyle = {
      backgroundColor:"#3f3e4f",
      borderColor:"#3f3e4f"
    }

    return (
      <div>
        <Modal centered show={this.props.showCreateForm} onHide={()=>this.props.toggleDisplay("showCreateForm")} >
          <Modal.Header closeButton style={modalStyle}>
            <Modal.Title>Create a Class</Modal.Title>
          </Modal.Header>
          <Modal.Body style={modalStyle}>
          Please fill in the basic information for you class.
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={schema}
            onSubmit={(values, { validate }) => {
                console.log(values);
                this.createCourse(values)

            }}
            initialValues={this.state.newcourse}
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
                  <Form.Label>Class Name</Form.Label>
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
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formGrader">
                  <Form.Label>Grader</Form.Label>
                  <Form.Control
                  type="text"
                  placeholder="Enter grader's name"
                  name="grader"
                  value={values.grader}
                  onChange={handleChange}
                  isInvalid={!!errors.grader}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.grader}
                  </Form.Control.Feedback>
                </Form.Group>

                <div style={{float:"right"}}>
                  <Button variant="warning" onClick={handleReset}>Reset</Button>
                  <Button variant="primary" type="submit" style={{marginLeft:"5px"}}>Create</Button>
                </div>
              </Form>
            )}
          </Formik>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("loading empty class");
  console.log(state);
  return {
    catalog: state.products.catalog
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCourse: (course) => {
      console.log("course")
      dispatch(createCourse(course))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClass)
