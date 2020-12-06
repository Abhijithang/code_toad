import React from 'react'
import {Image, Col, Row} from 'react-bootstrap'
import UserTable from './components/UserTable'

class UserList extends React.Component {
  constructor(){
    super()
  }

  render(){
    const iframe = '<iframe src="https://codesandbox.io/embed/awesome-roentgen-4wn32jky57?fontsize=14&hidenavigation=1&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="react-table inline editing" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>';
    return(
      <div >
        <Row style={{textAlign:"center", marginTop:"20px"}}>
          <Col>
            <h2>User Management</h2>
          </Col>
        </Row>

        <Row>
          
        </Row>
      </div>
    )
  }
}


export default UserList
