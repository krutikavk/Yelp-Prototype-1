import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout, restaurantLogin} from '../../_actions';
import Restaurant from './restaurant';
import restro from './restro.jpg';

 
class Restaurants extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurant: {}
    }
  }

  //Menu handler for view dishes has to be here and not on restaurant page (only the render component is returned there)

  componentDidMount() {
    /*
    let url = 'http://localhost:3001/restaurants/' + this.props.location.query.rid;
    axios.get(url)
      .then(response => {
        console.log("Status Code : ",response.data);
        if(response.status === 200){
          //When results return multiple rows, rowdatapacket object needs to be converted to JSON object again 
          //use JSON.parse(JSON.stringify()) to convert back to JSON object
          //let temp = JSON.parse(JSON.stringify(response.data));
          this.setState({
            rid: response.data.rid,
            remail: response.data.remail,
            rname: response.data.rname,
            rphone: response.data.rphone,
            rabout: response.data.rabout,
            rlocation: response.data.rlocation,
            rlatitude: response.data.rlatitude,
            rlongitude: response.data.rlongitude,
            raddress: response.data.raddress,
            rcuisine: response.data.rcuisine,
            rdelivery: response.data.rdelivery,
          })
        }

      }).catch(err =>{
          console.log("No response")
      });

      */

      //If customer is logged in, take information from props passed to the page

      let restaurantprofile = {
        rid: this.props.location.query.rid,
        remail: this.props.location.query.remail,
        rpassword: this.props.location.query.rpassword,
        rname: this.props.location.query.rname,
        rphone: this.props.location.query.rphone,
        rabout: this.props.location.query.rabout,
        rlocation: this.props.location.query.rlocation,
        rlatitude: this.props.location.query.rlatitude,
        rlongitude: this.props.location.query.rlongitude,
        raddress: this.props.location.query.raddress,
        rcuisine: this.props.location.query.rcuisine,
        rdelivery: this.props.location.query.rdelivery,
      }

      console.log("restaurant profile before: ", restaurantprofile);

      //If restaurant is logged in, take this info from redux state
      if(this.props.whoIsLogged === true) {
        restaurantprofile = {
          rid: this.props.rid,
          remail: this.props.remail,
          rpassword: this.props.rpassword,
          rname: this.props.rname,
          rphone: this.props.rphone,
          rabout: this.props.rabout,
          rlocation: this.props.rlocation,
          rlatitude: this.props.rlatitude,
          rlongitude: this.props.rlongitude,
          raddress: this.props.raddress,
          rcuisine: this.props.rcuisine,
          rdelivery: this.props.rdelivery,
        }
      }

      this.setState({
        restaurant: restaurantprofile
      })

      console.log("restaurant profile after: ", restaurantprofile);
      console.log("restaurant state: ", this.state.restaurant)
      //Get working hours
      let getHours = 'http://localhost:3001/' + this.state.restaurant.rid + '/hours'
      axios.get(getHours)
      .then(response => {
        console.log("Status Code : ",response.data);
        if(response.status === 200){
          //When results return multiple rows, rowdatapacket object needs to be converted to JSON object again 
          //use JSON.parse(JSON.stringify()) to convert back to JSON object
          let temp = JSON.parse(JSON.stringify(response.data));
          this.setState({
            hours: [...temp]
          })
        }

      }).catch(err =>{
          console.log("No response hours")
      });


      //Get all reviews
      let getReviews = 'http://localhost:3001/' + this.state.restaurant.rid + '/reviews'
      axios.get(getReviews)
      .then(response => {
        console.log("Status Code : ",response.data);
        if(response.status === 200){
          //When results return multiple rows, rowdatapacket object needs to be converted to JSON object again 
          //use JSON.parse(JSON.stringify()) to convert back to JSON object
          let temp = JSON.parse(JSON.stringify(response.data));
          this.setState({
            reviews: [...temp]
          })
        }

      }).catch(err =>{
          console.log("No response")
      });



      //Get all pictures--FOR NOW, SINGLE IMAGE
      //Display images from array
      //Reference: https://stackoverflow.com/questions/42410164/display-array-of-images-in-react
      /*
      let getPics = 'http://localhost:3001/pictures' + this.state.restaurant.rid
      axios.get(getPics)
      .then(response => {
        console.log("Status Code : ",response.data);
        if(response.status === 200){
          //When results return multiple rows, rowdatapacket object needs to be converted to JSON object again 
          //use JSON.parse(JSON.stringify()) to convert back to JSON object
          let temp = JSON.parse(JSON.stringify(response.data));
          this.setState({
            pictures: [...temp]
          })
        }


      }).catch(err =>{
          console.log("No response")
      });

      */
  }

  render() {

    /*
    var pictures = this.state.pictures.map(function(image) {
      return (<img src={image} alt="" rounded ></img>);
    });
    */

    /*

    //If customer is logged in, take information from props passed to the page
    let restaurantprofile = {
      rid: this.props.location.query.rid,
      remail: this.props.location.query.remail,
      rpassword: this.props.location.query.rpassword,
      rname: this.props.location.query.rname,
      rphone: this.props.location.query.rphone,
      rabout: this.props.location.query.rabout,
      rlocation: this.props.location.query.rlocation,
      rlatitude: this.props.location.query.rlatitude,
      rlongitude: this.props.location.query.rlongitude,
      raddress: this.props.location.query.raddress,
      rcuisine: this.props.location.query.rcuisine,
      rdelivery: this.props.location.query.rdelivery,
    }

    //If restaurant is logged in, take this info from redux state
    if(this.props.whoIsLogged === true) {
      restaurantprofile = {
        rid: this.props.rid,
        remail: this.props.remail,
        rpassword: this.props.rpassword,
        rname: this.props.rname,
        rphone: this.props.rphone,
        rabout: this.props.rabout,
        rlocation: this.props.rlocation,
        rlatitude: this.props.rlatitude,
        rlongitude: this.props.rlongitude,
        raddress: this.props.raddress,
        rcuisine: this.props.rcuisine,
        rdelivery: this.props.rdelivery,
      }
    }
    */

    return(

      <div>
        <img src={restro} style={{width: 250}} alt="" rounded ></img>
        <div class="container-fluid style={{height: 100}}">
          <div class="row">
            <div class="col-12 mt-3">
              <div class="card">
                <div class="card-horizontal">
                  <div class="card-body">
                      <p class="card-text">Name: {this.state.restaurant.rname}</p>
                      <p class="card-text">Phone: {this.state.restaurant.rphone}</p>
                      <p class="card-text">About us: {this.state.restaurant.rabout}</p>
                      <p class="card-text">Address: {this.state.restaurant.raddress}</p>
                      <p class="card-text">Cuisine: {this.state.restaurant.rcuisine}</p>
                      <p class="card-text">Service: {this.state.restaurant.rdelivery}</p>
                  </div>
                </div>
                <div class="card-footer">
                    <small class="text-muted">Featured!</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid style={{height: 100}}">
          Add reviews here

        </div>



      </div>

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