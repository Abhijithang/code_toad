import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Redirect} from 'react-router-dom'


import LoadingPage from './LoadingPage'
import Header from './Header'
import Main from './Main'
import Menu from './Menu'
import Footer from './Footer'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      isLoading: true,
      selectedMenu: window.location.pathname.substring(1)
    }

    this.style = {
      height: '100vh',
      display: "flex",
      flexDirection: "column"

    }
  }

  componentDidMount() {
    setTimeout(()=>{
      this.setState({
        isLoading: false
      })
    }, 500)


  }

  menuSelected=(menu_name)=>{
        this.setState({selectedMenu: menu_name},
          ()=>{
            console.log(this.state.selectedMenu);
          }
        )
  }

  render() {
    return(
      <div style={this.style}>
        <React.Fragment>
          {this.state.isLoading ?
            <div><LoadingPage /></div> :
            <Router>
              
              <Menu functionCallFromParent={this.menuSelected.bind(this)}/>
              <Main currentPage={this.state.selectedMenu}/>
              <Footer />
            </Router>
          }
        </React.Fragment>

      </div>
    )
  }
}

export default App;
