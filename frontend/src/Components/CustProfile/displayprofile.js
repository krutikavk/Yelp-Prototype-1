import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {update} from '../../_actions'
import {login} from '../../_actions';
import {Redirect, Link} from 'react-router-dom';
import profilepicture from './profile-picture.png';


const validText = RegExp('[A-Za-z0-9]+')

class DisplayProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }

  }

  componentWillMount() {
    
  }



  render() {
    let redirectVar = null;
    console.log(this.props.isLogged)
    if(this.props.isLogged === false) {
      redirectVar = <Redirect to= '/login'/>
    }

    return (

      <div>
        <div class="container-fluid style={{height: 100}}">
          <div class="row">
            <div class="col-12 mt-3">
              <div class="card">
                <div class="card-horizontal">
                  <img src={this.props.cphoto} class="img-thumbnail" alt="Cinque Terre" width = "300" />

                  <div class="card-body">
                    <p class="card-text font-weight-bold font-italic"> {this.props.cname}</p>
                    <p class="card-text text-muted font-italic">Here since: {this.props.cjoined}</p>
                    <p class="card-text text-muted font-italic">Reviews: {this.state.reviews.length}</p>
                    <p class="card-text text-muted font-italic">Friends: 4728</p>
                    <Link to='/customer/edit' class="btn btn-danger">Edit profile</Link> 
                  </div>
                </div>
                <div class="card-footer">
                  <p class="card-text font-weight-bold">About Me:</p>
                  <p class="card-text font-italic">{this.props.cabout}</p>
                  <p class="card-text font-weight-bold">Favourite Restaurant:</p>
                  <p class="card-text font-italic">{this.props.cfavrest}</p>
                  <p class="card-text font-weight-bold">Favourite Cusine:</p>
                  <p class="card-text font-italic">{this.props.cfavcuisine}</p>
                  <small class="text-muted">muted</small>
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
      cid: state.custProfile.cid,
      cemail: state.custProfile.cemail,
      cpassword: state.custProfile.cpassword,
      cname: state.custProfile.cname,
      cphone: state.custProfile.cphone,
      cabout: state.custProfile.cabout,
      cjoined: state.custProfile.cjoined,
      cphoto: state.custProfile.cphoto,
      cfavrest: state.custProfile.cfavrest,
      cfavcuisine: state.custProfile.cfavcuisine,
      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,
    }
}

//const mapDispatchToProps = (dispatch) => { since this does not call a function directly it cannot be a function

function mapDispatchToProps(dispatch) {  
  return {
    update : (field, payload) => dispatch(update(field, payload)),
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayProfile);

//export default Userdash;