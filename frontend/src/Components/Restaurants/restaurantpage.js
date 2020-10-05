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
      rid: '',
      remail: '',
      rname: '',
      rphone: '',
      rabout: '',
      rlocation: '',
      rlatitude: '',
      rlongitude: '',
      raddress: '',
      rcuisine: '',
      rdelivery: '',
      reviews: [],
      pictures: [],
      hours: []
    }
  }

  //Menu handler for view dishes has to be here and not on restaurant page (only the render component is returned there)

  componentDidMount() {
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

      //Get working hours
      let getHours = 'http://localhost:3001/' + this.props.location.query.rid + '/hours'
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
          console.log("No response")
      });


      //Get all reviews
      let getReviews = 'http://localhost:3001/reviews' + this.props.location.query.rid
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



      //Get all pictures
      let getPics = 'http://localhost:3001/pictures' + this.props.location.query.rid
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
  }

  render() {

    var pictures = this.state.pictures.map(function(image) {
      return (<img src={image} alt="" rounded ></img>);
    });

    return(

      <div>
        <img src={restro} style={{width: 250}} alt="" rounded ></img>
        <div class="container-fluid style={{height: 100}}">
          <div class="row">
            <div class="col-12 mt-3">
              <div class="card">
                <div class="card-horizontal">
                  <div class="card-body">
                      <p class="card-text">Name: {this.props.location.query.rname}</p>
                      <p class="card-text">Phone: {this.props.location.query.rphone}</p>
                      <p class="card-text">About us: {this.props.location.query.rabout}</p>
                      <p class="card-text">Address: {this.props.location.query.raddress}</p>
                      <p class="card-text">Cuisine: {this.props.location.query.rcuisine}</p>
                      <p class="card-text">Service: {this.props.location.query.rdelivery}</p>

                  </div>
                </div>
                <div class="card-footer">
                    <small class="text-muted">Featured!</small>
                </div>
              </div>
            </div>
          </div>
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