import React from 'react';
import './App.css';
import { showUsers } from './services/api-helper'

//Comment sample


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this)
  }

getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
  
  getCoordinates(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
  })
  }
  
  handleLocationError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
    }
  }

  render() {
    return ( 
      
    
      <div className="App">
        <button onClick={this.getLocation}>Get Coordinates</button>
        <h2>Your Coordinates</h2>
        <p>Latitude: {this.state.latitude}</p>
        <p>Longitude: {this.state.longitude}</p>
        <h2>Mapping</h2>
        {
          this.state.latitude && this.state.longitude ?
            <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}
            &zoom=14&size=400x300&sensor=false&markers=color:blue%7C${this.state.latitude},${this.state.longitude}&key=${`AIzaSyAnNnQTni-5DtGhczaaQoY9O4GOFOXsQBM`}`} alt="" />
          :
          null
        }

      </div>
    );
  }
}

export default App;