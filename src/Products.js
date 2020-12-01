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
    }
    this.initCatalog = this.initCatalog.bind(this)

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

  render() {
    console.log(this.props);

    
    const courseCatalog = this.initCatalog().map(item=>
      <Col key={item.id} style={{marginBottom:'30px'}} sm={12}><ItemCard key={item.id} item={item}/></Col>
    )
    return(
      <div>
        <h3 style={{textTransform: 'capitalize'}}>{this.props.title}</h3>
        <span className="sticky-cart">
          <Cart />
        </span>
        <Row>
          {courseCatalog}
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}



export default connect(mapStateToProps)(Products)
