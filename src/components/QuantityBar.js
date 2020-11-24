import React from 'react'
import {Form, Button, ButtonGroup } from 'react-bootstrap';

class QuantityBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      quantity: 0
    }

  }

  render(){

    return(
      <Form.Group>
        <Form.Label className="ml-4 mr-2" htmlFor="inlineFormCustomSelectPref">
          Quantity
        </Form.Label>
        <ButtonGroup>
          <Button size="sm">-10</Button>
          <Button size="sm">-1</Button>
        </ButtonGroup>
        <Form.Control size="sm" readOnly
        id="quantity"
        value={this.state.quantity}
        custom
        style={{width:"30px"}}
        >
        </Form.Control>
        <ButtonGroup>
          <Button size="sm">+1</Button>
          <Button size="sm">+10</Button>
        </ButtonGroup>
      </Form.Group>
    )
  }
}

export default QuantityBar
