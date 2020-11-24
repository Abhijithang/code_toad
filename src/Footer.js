import React from 'react';




function Footer() {
  const footerStyle = {
    margin:"20px",
    flexShrink:"0",

    textAlign:"center"

  }
  var phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
  }
  return (

    <div style={footerStyle}>
      Copyright © 2020 Code Toad Group . All rights reserved
    </div>


  )
}

export default Footer;
