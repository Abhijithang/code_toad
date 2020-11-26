import React from 'react'
import ItemCard from './components/ItemCard'
import Cart from './Cart'
import {Row, Col} from 'react-bootstrap'
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
        contact_email: null
      },
      productList: this.props.productList
    }
  }

  render() {
    console.log(this.props);
    var enrolled_list = []
    this.props.course.map(c=> { return enrolled_list+=c.id})
    var availCourses = this.state.productList.filter(({id})=> !enrolled_list.includes(id))
    console.log(availCourses);
    const productItems = availCourses? availCourses.map(item=>
      <Col key={item.id} style={{marginBottom:'30px'}} sm={12}><ItemCard key={item.id} item={item}/></Col>
    ) : null
    return(
      <div>
        <h3 style={{textTransform: 'capitalize'}}>{this.props.title}</h3>
        <span className="sticky-cart">
          <Cart />
        </span>
        <Row>
          {productItems}
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}



export default connect(mapStateToProps)(Products)
