import React from 'react'
import {Button,  Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-transition-group'
import {connect} from 'react-redux'

import Home from './Home'
import Contact from './Contact'
import About from './About'
import Cart from './Cart'
import UserList from './UserList'

import './Menu.css'

class Menu extends React.Component {
  constructor() {
    super()
    this.state = {
      styleActive: {
        fontWeight:'bold',
        color: '#255734',
        backgroundColor: '#00d0ff',
        boxShadow: "0 0 10px #00d0ff , 0 0 40px #00d0ff, 0 0 80px #00d0ff"
      },
      activeNavi: null
    }
    this.activePage = this.activePage.bind(this)
  }

  capitalize(text)
  {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  activePage(name){
    this.setState(()=>{
      return{
        activeNavi:name
      },
      ()=>{
        console.log(this.state.activeNavi);
      }
    })

  }

  grabName=(name)=>{
        this.props.functionCallFromParent(name);
  }

  render() {
    console.log(this.props);
    const menuOptions = [
      {name:'home', path: ''},
      {name:'catalog', path: ''},
      {name:'contact', path: ''},
      {name:'about', path: ''},

    ]


    const menuComponents = menuOptions.map(m =>
      <Nav.Item key={m.name} >

          <NavLink className='navi' onClick={this.grabName.bind(this, m.name)} to={'/' + m.name} activeStyle={this.state.styleActive}>
            {this.capitalize(m.name)}
          </NavLink>

      </Nav.Item>)




    return(

      <div className="sticky">
        <header style={{color:'white', margin:'0px', margin:'10px'}}>
          <img src={require('./image/toad.png')} width="32" height="32"/> <span className="animate__animated animate__bounce"><b>Code Toad - Your Best Friend of Learning Code!</b></span>
        </header>
        <Navbar bg="dark" variant="dark" expand="md" style={{opacity: '0.85', width:"100vw"}}>


          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" variant='pills' >
              {menuComponents}
              <Nav.Item>

                  <NavLink className='navi' to='/userlist' activeStyle={this.state.styleActive}>
                    User Management
                  </NavLink>

              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>





      </div>
    )
  }
}




const mapStateToProps = (state) => {
  return {
    role: state.role
  }
}



export default connect(mapStateToProps)(Menu)
