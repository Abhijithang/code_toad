import React from 'react'
import ItemCard from './components/ItemCard'
import Cart from './Cart'
import CreateClass from './components/CreateClass'
import FontAwesome from 'react-fontawesome'
import {Row, Col, Button, ButtonGroup} from 'react-bootstrap'
import { connect } from 'react-redux'

class Products extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderList:{
        id: null,
        name: null,
        color: null,
        size: null,
        quantity: null,
        contact_name: null,
        contact_phone: null,
        contact_email: null,
        courseDirectory:null
      },
    }
    this.initCatalog = this.initCatalog.bind(this)
    this.checkNewClass = this.checkNewClass.bind(this)
    this.createCourse = this.createCourse.bind(this)
    this.toggleDisplay = this.toggleDisplay.bind(this)
  }

  componentDidMount() {
    // Simple GET request using fetch
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const courseDirectoryUrl = "https://codetoad613.herokuapp.com/v1/codetoad/course/details/all"; // get all course directory
    fetch(proxyUrl + courseDirectoryUrl)
        .then(response => response.json())
        .then(data => this.setState({ courseDirectory: data }));
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

  initCatalog(){
    var courseCatalog
    if (this.props.products.catalog.length != 0) {
      if (this.props.role === "student") {
        var enrolled_list = []
        this.props.course.map(c=> { return enrolled_list+=c.id})
        courseCatalog = this.props.products.catalog.filter(({id})=> !enrolled_list.includes(id))
      } else {
        courseCatalog = this.props.products.catalog
      }
    } else {
      courseCatalog = [{

      }]
    }
    console.log("init course catalog", courseCatalog);
    return courseCatalog
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
    console.log(this.props);

    const createClassIcon = <FontAwesome
      className="super-crazy-colors"
      name="plus"
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />
    const courseCatalog = this.state.courseDirectory? this.state.courseDirectory.map(item=>
      <Col key={item.id} style={{marginBottom:'30px'}} sm={12}><ItemCard key={item.id} item={item}/></Col>
    ) :
    <h1>No Course is provided at this momoent</h1>
    return(
      <div>
        <h3 style={{textTransform: 'capitalize'}}>{this.props.title}</h3>
        {
          this.props.role == "admin"?
          <span className="sticky-cart">
            <Button onClick={()=>this.toggleDisplay("showCreateForm")}>{createClassIcon}</Button>
          </span> :
          <span className="sticky-cart">
            <Cart />
          </span>
        }

        <Row>
          {courseCatalog}
        </Row>
        <CreateClass showCreateForm={this.state.showCreateForm} toggleDisplay={this.toggleDisplay}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}



export default connect(mapStateToProps)(Products)
