import './App.css';
import React from 'react'
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Geocode from 'react-geocode';

Geocode.setApiKey("AIzaSyBgMshusM-bvKyKgOluOHFUeHUaQhvky5o")

class App extends React.Component {

  states = {
    address: "THE GALLERIA Shopping Hub",
    area: 'Sanjeev Kumar Auditorium Rd, beside Sanjeev Kumar Auditorium, Adajan',
    city: 'Surat',
    state: 'Gujarat',
    zoom: 15,
    height: 400,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    }
  }
  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng)
      .then(response => {
        console.log(response, "response");
      })
    console.log(newLat, newLng);
  }


  // New Code
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
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
    this.getUserAddress();
  }
  getUserAddress() {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}`)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => alert(error))

  }

  handleLocationError(error) {

    switch (error.code) {
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
        break;

    }
  }
  render() {

    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: this.state.latitude, lng: this.state.longitude }}
      >
        <Marker
          draggable={true}
          onDragEnd={this.onMarkerDragEnd}
          position={{ lat: this.state.latitude, lng: this.state.longitude }}
        >
          <InfoWindow>
            <div className="card" 
            style={{
              paddingRight: "0px", 
              paddingBottom: "0px",
              maxWidth: "200px",
              maxHeight: "250px",
              minWidth: "0px"
            }}
            >
              <div className="card-body">
                <h5 className="card-title">{this.states.address}</h5>
                <p className="card-text">{this.states.area}</p>
                <p className="card-text">{this.states.city}, {this.states.state}</p>
                <p className="card-text"></p>
              </div>
            </div>
            {/* <div>
              {this.states.address}
              {this.states.city}
              {this.states.area}
              {this.states.state}
            </div> */}
          </InfoWindow>
        </Marker>
      </GoogleMap >
    ));

    return (
      <div className="App">
        <h2>React Geolocation</h2>
        <button onClick={this.getLocation}>Get coordinates</button>
        <h4></h4>
        <p>Latitude: {this.state.latitude}</p>
        <p>Longitude: {this.state.longitude}</p>
        <h4></h4>
        <p>Address: {this.state.userAddress}</p>


        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBgMshusM-bvKyKgOluOHFUeHUaQhvky5o&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `750px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}

export default App




























// import React from 'react'
// import './App.css';

// class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       latitude: null,
//       longitude: null,
//     };
//     this.getLocation = this.getLocation.bind(this);
//     this.getCoordinates = this.getCoordinates.bind(this);
//   }
//   getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   }

//   getCoordinates(position) {
//     this.setState({
//       latitude: position.coords.latitude,
//       longitude: position.coords.longitude
//     })
//     this.getUserAddress();
//   }
//   // getUserAddress() {
//   //   fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}`)
//   //     .then(response => response.json())
//   //     .then(data => console.log(data))
//   //     .catch(error => alert(error))

//   // }

//   // handleLocationError(error) {

//   //   switch (error.code) {
//   //     case error.PERMISSION_DENIED:
//   //       alert("User denied the request for Geolocation.")
//   //       break;
//   //     case error.POSITION_UNAVAILABLE:
//   //       alert("Location information is unavailable.")
//   //       break;
//   //     case error.TIMEOUT:
//   //       alert("The request to get user location timed out.")
//   //       break;
//   //     case error.UNKNOWN_ERROR:
//   //       alert("An unknown error occurred.")
//   //       break;

//   //   }
//   // }
//   render() {
//     let map;

//     function initMap() {
//       map = new window.google.maps.Map(document.getElementById("map"), {
//         center: { lat: this.state.latitude, lng: this.state.longitude },
//         zoom: 8,
//       });
//     }
//     // var latlon = this.state.latitude + "," + this.state.longitude;
//     return (
//       <div className="App">
//         <h2>React Geolocation</h2>
//         <button onClick={this.getLocation}>Get coordinates</button>
//         <h4></h4>
//         <p>Latitude: {this.state.latitude}</p>
//         <p>Longitude: {this.state.longitude}</p>
//         <h4></h4>
//         <p>Address: {this.state.userAddress}</p>
//         {
//           this.state.latitude && this.state.longitude ?

//             // var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false&key=YOUR_KEY"
//             // <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&sensor=false&markers=color:red%7C${this.state.latitude},${this.state.longitude}&key=AIzaSyBgMshusM-bvKyKgOluOHFUeHUaQhvky5o`} /> : null
//             // <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&sensor=false&markers=color:red%7C${this.state.latitude},${this.state.longitude}&key=AIzaSyBgMshusM-bvKyKgOluOHFUeHUaQhvky5o`} />:null
//             // <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${latlon}&zoom=14&size=400x300&sensor=false&key=AIzaSyBgMshusM-bvKyKgOluOHFUeHUaQhvky5o`} /> : null
//             // <img src={"https://maps.googleapis.com/maps/api/js?key=AIzaSyBgMshusM-bvKyKgOluOHFUeHUaQhvky5o&callback=initMap&v=weekly&channel=2"} /> : null
//             // <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBgMshusM-bvKyKgOluOHFUeHUaQhvky5o&callback=initMap&v=weekly&channel=2" async></script> : null
//             <img src={"https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback="+initMap+"&v=weekly&channel=2"} /> : null
//           // <img src={"https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false&key=AIzaSyBgMshusM-bvKyKgOluOHFUeHUaQhvky5o"} /> : null
//         }
//       </div>
//     )
//   }
// }

// export default App;
