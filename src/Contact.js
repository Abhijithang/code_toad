import React from 'react'
import {Row, Col, Card} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import Location from './components/Location'


class Contact extends React.Component {
  constructor(){
    super()
  }



  render(){
    const emailIcon = <FontAwesome
      className="super-crazy-colors"
      name="envelope"
      size="5x"
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />

    const phoneIcon = <FontAwesome
      className="super-crazy-colors"
      name="phone"
      size="5x"
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />

    const storeIcon = <FontAwesome
      className="super-crazy-colors"
      name="home"
      size="5x"
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />


    const cardStyle = {width: "350px", background:"none", textAlign:"center", border:"0px", fontSize:"21px"}
    return(
      <div>
      <h3>Contact</h3>
        <Row>

          <Col lg>
            <Row style={{marginTop:"30px", justifyContent:"center"}}>
              <Card className="mb-1 ml-2 mr-2" style={cardStyle} >

                <Card.Body>
                  <Card.Title>{phoneIcon}</Card.Title>
                  <Card.Text>
                    Quickest way to get attention! Call us if you have any problem about our platform!
                  </Card.Text>
                  Phone: <a href='tel:+13015802277'>123-456-7890</a>
                </Card.Body>
              </Card>
            </Row>
            <Row style={{marginTop:"30px", justifyContent:"center"}}>
              <Card className="mb-2 ml-2 mr-2" style={cardStyle} >

                <Card.Body>
                  <Card.Title>{emailIcon}</Card.Title>
                  <Card.Text>
                    In case we missed your call, you can also reach us via email!
                  </Card.Text>
                  <a href="#" onClick={()=>window.open('mailto:codeToad@gmail.com')}>codeToad@gmail.com</a>
                </Card.Body>
              </Card>

            </Row>
          </Col>
          <Col lg style={{marginTop:"30px", textAlign:"-webkit-center"}}>
          <Card className="mb-2 ml-2 mr-2" style={{width: "450px", background:"none", textAlign:"center", border:"0px", fontSize:"18px"}} >

            <Card.Body>
              <Card.Title>{storeIcon}</Card.Title>
              <Card.Text>
                We are located at College Park, MD 20742. Drop by and see the staffs!
              </Card.Text>
              <Row>
                <Col><Location /></Col>
              </Row>

            </Card.Body>
          </Card>

          </Col>
        </Row>

      </div>
    )
  }
}


export default Contact
