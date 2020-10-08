import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout, restaurantLogin} from '../../_actions';
import Restaurant from './restaurantcard';
import GoogleMapReact from 'google-map-react';
import Map from '../Map/map'

 
class Restaurants extends Component {

  constructor(props) {
    super(props);

    this.state = {
      restaurants: []
    }

    this.menuHandler = this.menuHandler.bind(this);
  }

  //Menu handler for view dishes has to be here and not on restaurant page (only the render component is returned there)
  menuHandler = (event) => {
    alert("menu handler")
    this.setState ({
      dishes: true
    });
  }

  componentDidMount() {
    //replace this URL with search URL 
    let url = 'http://localhost:3001/restaurants';
    axios.get(url)
        .then(response => {
          console.log("Status Code : ",response.data);
          if(response.status === 200){
            //When results return multiple rows, rowdatapacket object needs to be converted to JSON object again 
            //use JSON.parse(JSON.stringify()) to convert back to JSON object
            let temp = JSON.parse(JSON.stringify(response.data));
            this.setState({
                restaurants: [...temp]
            })
          }
        }).catch(err =>{
            console.log("No response")
        });
  }

  render() {

    const location = {
      address: '1600 Amphitheatre Parkway, Mountain View, california.',
      lat: 37.42216,
      lng: -122.08427,
    }

    let locations = [];
    this.state.restaurants.forEach(item => {
      console.log(item)
      let location = {
        address: item.raddress,
        lat: item.rlatitude,
        lng: item.rlongitude
      }
      locations.push(location)
    });

    console.log("locations:", locations)

    return(
      <div>

        <section class="container">
          <div class="left-half">
            {this.state.restaurants.map (restaurant => (
              <div>
                <Restaurant restaurant = {restaurant} />
              </div>
            ))}
          </div>

          <div class="right-half">
            I will put gmap here

            <Map location={location} zoomLevel={17} />
          </div>
        </section>
      </div>


      /*
      <div>
        {this.state.restaurants.map (restaurant => (
          <div>
            <Restaurant restaurant = {restaurant} />
          </div>
        ))}
      </div>
      */

    )

  }

}


const mapStateToProps = (state) => {
    return {

      //Get global state to get cid, rid and login details to fetch dishes for customer/restaurant

      cid: state.custProfile.cid,
      rid: state.restProfile.rid,
      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,

    }
}

function mapDispatchToProps(dispatch) {  
  return {
    update : (field, payload) => dispatch(update(field, payload)),
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
  }
  
}


export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);