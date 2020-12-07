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
      selectedMenu: window.location.pathname.substring(1),
      courseDirectory: '',
    }

    this.style = {
      height: '100vh',
      display: "flex",
      flexDirection: "column"

    }
  }

  componentDidMount() {
    // Simple GET request using fetch
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const courseDirectoryUrl = "https://codetoad613.herokuapp.com/v1/codetoad/course/details/all"; // get all course directory
    fetch(proxyUrl + courseDirectoryUrl)
        .then(response => response.json())
        .then(data => this.setState({ courseDirectory: data }))
        .then(console.log(this.state))
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
    const {
      userDirectory
    } = this.state;
    console.log(this.state);
    return(
      <div style={this.style}>
        <React.Fragment>
          {this.state.isLoading ?
            <div><LoadingPage /></div> :
            <Router>

              <Menu functionCallFromParent={this.menuSelected.bind(this)}/>
              <Main currentPage={this.state.selectedMenu} userDirectory={userDirectory}/>
              <Footer />
            </Router>
          }
        </React.Fragment>

      </div>
    )
  }
}

export default App;
