import React from 'react'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default class App extends React.Component {
  constructor() {
    super()
    this.style = {
      position:'fixed',
      top:'50%',
      left:'50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center'
    }
  }


  render() {
    return(
      <div style={this.style}>
        <Loader
           type="Bars"
           color="#adb5bd"
           height={100}
           width={100}
        />
        <p>Loading...</p>

      </div>
    )
  }
}
