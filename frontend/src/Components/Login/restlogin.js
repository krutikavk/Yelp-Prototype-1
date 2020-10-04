import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
//use react-router-dom ONLY
//see Marko Perendio comment about using react-router-dom
//Refer: https://stackoverflow.com/questions/55552147/invariant-failed-you-should-not-use-route-outside-a-router
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout, restaurantLogin} from '../../_actions'




const validEmail = RegExp('\\S+\@\\S+\.\\S+')
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class restLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {

      email: '',
      password: '',
      loginOption: '',
      authFlag: false,
      errors: {
        email: '',
        password: '',
      }
    };

    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  loginOptionHandler = (event) => {
    this.setState({
      loginOption: event.target.value
    })
  }

  // Comment
  emailChangeHandler = (event) => {
    let err = this.state.errors;
    err.email = validEmail.test(event.target.value) ? "" : "Invalid email ID"
    this.setState({
        errors: err
      }, ()=> {
        console.log(err.email)
    }) 
    this.setState({
        email : event.target.value
    })
  }

  passwordChangeHandler = (event) => {
    let err = this.state.errors;
    err.password = event.target.value.length >= 5 ? "" : "Password should have 8 or more characters"
    this.setState({
      errors: err
      }, ()=> {
      console.log(err.password)
    }) 
    this.setState({
      password : event.target.value
        
    })
  }

  submitLogin = (event) => {
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
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/restaurants/login', data)
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

  render(){
    //redirect based on successful login

    let redirectVar = null;
    /*
    if(cookie.load('cookie')){
      console.log(cookie)
      redirectVar = <Redirect to= "/userdash"/>
    } 
    */
    console.log(this.props.isLogged)
    if(this.props.isLogged === true) {
      redirectVar = <Redirect to= "/restaurant/dashboard"/>
    }

    const errors = this.state.errors;

    return(


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
                    <input onChange = {this.emailChangeHandler} 
                                        type="email"  
                                        name="email" 
                                        className="form-control form-control-sm"
                                        placeholder="Email ID"
                                        aria-describedby="emailHelp" 
                                        required/>
                                        {errors.email.length > 0 && 
                                        <span><small id="emailHelp" className="form-text text-muted">{errors.email}</small></span>}
                  </div>
                  <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange = {this.passwordChangeHandler} 
                                        type="password" 
                                        name="password" 
                                        className="form-control form-control-sm"
                                        placeholder="Password"
                                        required/>
                                        {errors.password.length > 0 && 
                                        <span><small id="emailHelp" className="form-text text-muted">{errors.password}</small></span>}
                  </div>

                  <div className="col-md-12 text-center">
                  <button disabled={! validateForm(this.state.errors)} id="btnLogin" className="btn btn-success btn-sm" onClick={this.submitLogin}>Login</button>
                  </div>
          </form>
        </div>
      </div>
    )
  }
}


//importedname: state.reducer.statename
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

export default connect(mapStateToProps, mapDispatchToProps)(restLogin);
//export Login Component
//export default Login;
