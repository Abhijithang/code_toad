import React, {Component} from 'react'
import {Container, Row, Col } from 'react-bootstrap';
import {Switch, Route, Redirect} from 'react-router-dom'
import {CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux'


import Home from './Home'
import Products from './Products'
import Contact from './Contact'
import About from './About'
import UserList from './UserList'
import Course from './components/Course'
import NotFoundPage from './NotFoundPage'
import Footer from './Footer'


import './Main.css'


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

            <Route render={({location})=>(
              <TransitionGroup>
                <CSSTransition key={location.key} timeout={300} classNames="fade">
                  <Switch location={location}>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/catalog" render={(props) => <Products {...props} productList={this.props.products[this.props.currentPage]} title={this.props.currentPage}/>}></Route>
                    <Route exact path="/contact" component={Contact}></Route>
                    <Route exact path="/about" component={About}></Route>
                    <Route exact path="/course" component={Course}></Route>
                    <Route exact path="/userlist" component={UserList}></Route>
                    <Route exact path="/404" component={NotFoundPage}></Route>
                    <Redirect to="/404"/>
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
