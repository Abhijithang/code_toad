import React, {Component} from 'react'
import {Container, Row, Col } from 'react-bootstrap';
import {Switch, Route, Redirect} from 'react-router-dom'
import {CSSTransition, TransitionGroup, } from 'react-transition-group';

import Cart from './Cart'
import Home from './Home'
import Products from './Products'
import Contact from './Contact'
import About from './About'
import Footer from './Footer'
import Service from './Service'
import InventoryTable from './InventoryTable'

import './Main.css'

import { connect } from 'react-redux'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 3,

    }

    this.style = {
      color:'white',
      margin:'0 40px 0 20px'
    }



    this.increOne = this.increOne.bind(this)

  }

  increOne() {
    this.setState(xyz => {
      console.log(xyz);
      return{
        count: xyz.count + 1
      }

    })

  }

  render() {
    console.log(this.state)
    console.log(this.props);
    const currentPage = window.location.pathname.substring(1)
    console.log(currentPage);
    return(

      <>
        <div style={{paddingTop:'150px', width:'100%', flex: "1 0 auto"}}>
          <Container>
            <span className="sticky-cart">
              <Cart />
            </span>
            <Route render={({location})=>(
              <TransitionGroup>
                <CSSTransition key={location.key} timeout={300} classNames="fade">
                  <Switch location={location}>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/racquets" render={(props) => <Products {...props} productList={this.props.products[this.props.currentPage]} title={this.props.currentPage}/>}></Route>
                    <Route exact path="/footwear" render={(props) => <Products {...props} productList={this.props.products[this.props.currentPage]} title={this.props.currentPage}/>}></Route>
                    <Route exact path="/bags" render={(props) => <Products {...props} productList={this.props.products[this.props.currentPage]} title={this.props.currentPage}/>}></Route>
                    <Route exact path="/service" render={(props) => <Service {...props} productList={this.props.products.string} />}></Route>
                    <Route exact path="/contact" component={Contact}></Route>
                    <Route exact path="/about" component={About}></Route>
                    <Route exact path="/test" component={InventoryTable}></Route>
                    <Redirect from="*" to={"/home"} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}>
            </Route>

          </Container>

        </div>
      </>



    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Main)
