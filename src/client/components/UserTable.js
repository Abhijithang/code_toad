import React from 'react'

class UserTable extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    console.log(this.props);
    return(
      <div>
        <iframe src={this.props.src} height={this.props.height} width={this.props.width}/>
      </div>
    )
  }
}



export default UserTable
