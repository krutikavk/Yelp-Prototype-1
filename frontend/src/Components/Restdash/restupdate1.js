import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {update, login, logout, restaurantLogin} from '../../_actions'


const validText = RegExp('[A-Za-z0-9]+')
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}



class Restupdate1 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rname: '',
      errors: {
        rname: '',
      }
    };

    this.rnameChangeHandler = this.rnameChangeHandler.bind(this);
    this.submitChange = this.submitChange.bind(this);
  }

  rnameChangeHandler = (event) => {
    let err = this.state.errors;
    err.rname = event.target.value.length >= 50 ? "" : "Too long name"
    this.setState({
        errors: err
      }, ()=> {
        console.log(err.rname)
    }) 
    this.setState({
        rname : event.target.value
    })
  }

  submitChange = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      console.info("Valid form")
    } else {
      console.error("Invalid form")
    }
    const data = {
      remail : this.state.email,
      rpassword : this.state.password,
    }
    axios.put('http://localhost:3001/restaurants/login', data)
      .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
          console.log("Login authorized")
          console.log(response.data[0]);
          //call props action
          this.props.update('RID', response.data[0].rid)
          this.props.update('REMAIL', response.data[0].remail)
          this.props.update('RPASSWORD', response.data[0].rpassword)
          this.props.update('RNAME', response.data[0].rname)
          this.props.update('RPHONE', response.data[0].rphone)
          this.props.update('RABOUT', response.data[0].rabout)
          this.props.update('RLOCATION', response.data[0].rlocation)
          this.props.update('RLATITUDE', response.data[0].rlatitude)
          this.props.update('RLONGITUDE', response.data[0].rlongitude)
          this.props.update('RADDRESS', response.data[0].raddress)
          this.props.update('RCUISINE', response.data[0].rcuisine)
          this.props.update('RDELIVERY', response.data[0].rdelivery)
          this.props.login()            //this will update isLogged = true
          this.props.restaurantLogin()
          this.setState({
              authFlag : true
          })
        }
      }).catch(err =>{
        alert("Incorrect credentials")
        this.setState({
            authFlag : false
        })
    });


  }


  
  render() {

    let redirectVar = null;
    //Nobody is logged in
    if(this.props.isLogged === false ) {
      redirectVar = <Redirect to= "/login"/>
    }
    //customer is logged in
    if(this.props.isLogged === true && this.props.whoIsLogged === false) {
      redirectVar = <Redirect to= "/customer/dashboard"/>
    }

    return (

      <div>
        {redirectVar} 
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center" >
          <form>
            <div className="col d-flex justify-content-center rounded-0">

            <div className="card-header">
              <h4>Customer</h4>
            </div>
            </div>
                  <div className = "form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange = {this.rnameChangeHandler} 
                                        type="text"  
                                        name="rname" 
                                        className="form-control form-control-lg"
                                        placeholder="Restaurant Name"
                                        aria-describedby="emailHelp" 
                                        required/>
                                        {errors.rname.length > 0 && 
                                        <span><small id="emailHelp" className="form-text text-muted">{errors.email}</small></span>}
                  </div>
                  <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange = {this.passwordChangeHandler} 
                                        type="password" 
                                        name="password" 
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        required/>
                                        {errors.password.length > 0 && 
                                        <span><small id="emailHelp" className="form-text text-muted">{errors.password}</small></span>}
                  </div>

                  <div className="col-md-12 text-center">
                  <button disabled={! validateForm(this.state.errors)} id="btnLogin" className="btn btn-success btn-lg" onClick={this.submitLogin}>Login</button>
                  </div>
          </form>
        </div>
      </div>

    )
  }

}


const mapStateToProps = (state) => {
    return {
      //Restaurant props
      rid: state.restProfile.rid,
      remail: state.restProfile.remail,
      rpassword: state.restProfile.rpassword,
      rname: state.restProfile.rname,
      rphone: state.restProfile.rphone,
      rabout: state.restProfile.rabout,
      rlocation: state.restProfile.rlocation,
      rlatitude: state.restProfile.rlatitude,
      rlongitude: state.restProfile.rlongitude,
      raddress: state.restProfile.raddress,
      rcuisine: state.restProfile.rcuisine,
      rdelivery: state.restProfile.rdelivery,
      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,
    }
}

//const mapDispatchToProps = (dispatch) => { since this does not call a function directly it cannot be a function

function mapDispatchToProps(dispatch) {  
  return {
    update : (field, payload) => dispatch(update(field, payload)),
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
    restaurantLogin: () => dispatch(restaurantLogin())
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Restupdate1);