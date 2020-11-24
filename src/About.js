import React from 'react'
import {Image, Col, Row} from 'react-bootstrap'

class About extends React.Component {
  constructor(){
    super()
  }

  render(){
    return(
      <div >
        <Row style={{textAlign:"center"}}><Col><Image style={{width:"500px", height:"auto"}} src={require("./toad.png")} roundedCircle/></Col></Row>
        <Row style={{textAlign:"center", marginTop:"20px"}}>
          <Col>
            <h2>Code </h2>

              A platform for people to begin their very firstcoding journey!<br />

          </Col>

        </Row>

      </div>
    )
  }
}


export default About
