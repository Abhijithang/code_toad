import React from 'react'
import {Table} from 'react-bootstrap'

class Service extends React.Component {
  constructor(props){
    super(props)
    this.state={
      strings:this.props.productList
    }
  }

  render(){
    console.log(this.state);
    return(
      <div style={{"textAlign":"center"}}>
        <h3>Re-string:</h3>
        Price include string & labor. Please add $14 for shipping.<br />
        <Table striped bordered hover variant="dark" style={{maxWidth: "500px", opacity: "80%", margin:"auto"}}>
          <thead>
            <tr>
              <th>String</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NANOGY 99</td>
              <td>$31.00</td>
            </tr>
            <tr>
              <td>NANOGY 98</td>
              <td>$30.00</td>
            </tr>
            <tr>
              <td>AEROBITE</td>
              <td>$30.00</td>
            </tr>
            <tr>
              <td>AEROSONIC</td>
              <td>$30.00</td>
            </tr>
            <tr>
              <td>NANOGY 95</td>
              <td>$29.00</td>
            </tr>
            <tr>
              <td>BG 66 FORCE</td>
              <td>$29.00</td>
            </tr>
            <tr>
              <td>BG 85</td>
              <td>$28.00</td>
            </tr>
            <tr>
              <td>BG 80 POWER</td>
              <td>$28.00</td>
            </tr>
            <tr>
              <td>BG 80</td>
              <td>$27.00</td>
            </tr>
            <tr>
              <td>BG 66 ULTIMAX</td>
              <td>$27.00</td>
            </tr>
            <tr>
              <td>BG 70 PRO</td>
              <td>$26.00</td>
            </tr>
            <tr>
              <td>BG 68 TI</td>
              <td>$25.00</td>
            </tr>
            <tr>
              <td>BG 65 TI</td>
              <td>$24.00</td>
            </tr>
            <tr>
              <td>BG 65</td>
              <td>$23.00</td>
            </tr>
            <tr>
              <td>Customer's string</td>
              <td>$18.00</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Service
