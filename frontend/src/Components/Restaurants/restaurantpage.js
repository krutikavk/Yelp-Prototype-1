import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout, restaurantLogin} from '../../_actions';
import Restaurant from './restaurant';
import restro from './restro.jpg';
import Review from '../Reviews/displayreview';

 
class Restaurants extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      hours: '',
      avgrating: ''
    }
  }

  //Menu handler for view dishes has to be here and not on restaurant page (only the render component is returned there)

  componentWillMount() {
    console.log("component did mount")

    let rid = (this.props.whoIsLogged === true) ? this.props.rid : this.props.location.query.rid;

    //Get working hours
    let getHours = 'http://localhost:3001/restaurants/' + rid + '/hours'
    axios.get(getHours)
    .then(response => {
      console.log("Status Code : ",response.data);
      if(response.status === 200){
        //When results return multiple rows, rowdatapacket object needs to be converted to JSON object again 
        //use JSON.parse(JSON.stringify()) to convert back to JSON object
        let temp = JSON.parse(JSON.stringify(response.data));

        this.setState({
          hours: response.data[0]
        })
      }

    }).catch(err =>{
        console.log("No response hours")
    });


    //Get all reviews
    let getReviews = 'http://localhost:3001/restaurants/' + rid + '/reviews'
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



    let getAvgRating = 'http://localhost:3001/restaurants/' + rid + '/average'
    axios.get(getAvgRating)
    .then(response => {
      console.log("Status Code : ",response.data);
      if(response.status === 200){
        //When results return multiple rows, rowdatapacket object needs to be converted to JSON object again 
        //use JSON.parse(JSON.stringify()) to convert back to JSON object
        let temp = JSON.parse(JSON.stringify(response.data));
        console.log("avg ", response.data[0]['AVG(rerating)'])
        this.setState({
          avgrating: response.data[0]['AVG(rerating)']
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

    

    //If customer is logged in, take information from props passed to the page

    let restaurantprofile = {};

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

    } else {
      restaurantprofile = {
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
    }
    

    return(

      <div>
        
        <div class="container-fluid style={{height: 100}}">
          <div class="row">
            <div class="col-12 mt-3">
              <div class="card">
                <div class="card-horizontal">
                  <img src={restro} style={{width: 250}} alt="" rounded ></img>
                  <div class="card-body">
                    <p class="card-text font-weight-bold">{restaurantprofile.rname}</p>
                    <p class="card-text font-weight-bold font-italic"> * {this.state.avgrating}/5</p>
                    <p class="card-text font-italic">Phone: {restaurantprofile.rphone}</p>
                    <p class="card-text font-italic">Address: {restaurantprofile.raddress}</p>
                    <p class="card-text font-italic">Cuisine: {restaurantprofile.rcuisine}</p>
                    <p class="card-text font-italic">Service: {restaurantprofile.rdelivery}</p>
                  </div>
                </div>
                <div class="card-footer">

                  <p class="card-text font-weight-bold">About us: {restaurantprofile.rabout}</p>
                  <p class="card-text font-weight-bold">Hours:</p>
                    <p class="card-text">
                        <div>
                          <div> Sunday: {this.state.hours.sunday ? <React.Fragment>Open</React.Fragment> : null}</div>
                          <div> Monday: {this.state.hours.monday ? <React.Fragment>Open</React.Fragment> : null}</div>
                          <div> Tuesday: {this.state.hours.tuesday ? <React.Fragment>Open</React.Fragment> : null}</div>
                          <div> Wednesday: {this.state.hours.wednesday ? <React.Fragment>Open</React.Fragment> : null}</div>
                          <div> Thursday: {this.state.hours.thursday ? <React.Fragment>Open</React.Fragment> : null}</div>
                          <div> Friday: {this.state.hours.friday ? <React.Fragment>Open</React.Fragment> : null}</div>
                          <div> Saturday: {this.state.hours.saturday ? <React.Fragment>Open</React.Fragment> : null}</div>
                          <div> From: {this.state.hours.starttime} hrs.</div>
                          <div> To: {this.state.hours.endtime} hrs.</div>
                        </div>

                    </p>
                  <small class="text-muted">Featured!</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid style={{height: 100}}">
          <p class="card-text font-weight-bold">Reviews</p>
          {this.state.reviews.map (entry => (
            <Review review={entry} />

          ))}

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
      remail: state.restProfile.remail,
      rpassword: state.restProfile.rpassword,
      rname: state.restProfile.rname,
      rphone: state.restProfile.rphone,
      rabout: state.restProfile.rabout,
      rphoto: state.restProfile.rphoto,
      rlocation: state.restProfile.rlocation,
      rlatitude: state.restProfile.rlatitude,
      rlongitude: state.restProfile.rlongitude,
      raddress: state.restProfile.raddress,
      rcuisine:  state.restProfile.rcuisine,
      rdelivery: state.restProfile.rdelivery,
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