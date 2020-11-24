import React from 'react'
import NumberFormat from 'react-number-format'


class NumberInput extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: '',
    };
  }

  render() {
    return (
      <NumberFormat
        placeholder="Number Format Input looses focus"
        isNumericString={true}
        thousandSeparator={true}
        value={this.state.value}
        onValueChange={vals => this.setState({ value: vals.formattedValue })}
        {...this.props}
      />
    );
  }
}

export default NumberInput;
