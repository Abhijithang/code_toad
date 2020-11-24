import React from 'react'
import mapboxgl from 'mapbox-gl';
import './Location.css'
/*global google*/

class Location extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lng: -76.94024,
      lat: 38.99039,
      zoom: 15
    };
  }
  // componentDidMount() {
  //   var map;
  //   const google=window.google
  //   map = new google.maps.Map(document.getElementById("map"), {
  //     center: { lat: 39.091080, lng: -77.090167 },
  //     zoom: 15
  //   });
  //
  // }

  componentDidMount() {
    const map = new mapboxgl.Map({
    container: this.mapContainer,
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [this.state.lng, this.state.lat],
    zoom: this.state.zoom
    });

    var marker = new mapboxgl.Marker({color:"red"})
    .setLngLat([this.state.lng, this.state.lat])
    .addTo(map);

    var markerHeight = 50, markerRadius = 10, linearOffset = 25;
    var popupOffsets = {
      'top': [0, 0],
      'top-left': [0,0],
      'top-right': [0,0],
      'bottom': [0, -markerHeight],
      'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      'left': [markerRadius, (markerHeight - markerRadius) * -1],
      'right': [-markerRadius, (markerHeight - markerRadius) * -1]
    };


    var popup = new mapboxgl.Popup({anchor:"top",className:"popup-home"})
    .setLngLat([this.state.lng, this.state.lat])
    .setHTML("<b>Code Toad</b>")
    .setMaxWidth("430px")
    .addTo(map);
  }

  render(){
    return(
      <div style={{height:"450px"}} ref={el => this.mapContainer = el} />
    )
  }
}

export default Location
