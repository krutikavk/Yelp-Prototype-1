import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';

//use react-router-dom ONLY
//see Marko Perendio comment about using react-router-dom
//Refer: https://stackoverflow.com/questions/55552147/invariant-failed-you-should-not-use-route-outside-a-router
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout} from '../../_actions'




const validText = RegExp('[A-Za-z0-9]+')
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {

      username: '',
      password: '',
      loginOption: '',
      authFlag: false,
      errors: {
      	username: '',
      	password: '',
      }
    };

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  componentWillMount() {
    this.setState({
      authFlag: false,
    })
  }

  loginOptionHandler = (event) => {
    this.setState({
      loginOption: event.target.value
    })
  }

  // Comment
  usernameChangeHandler = (event) => {
    let err = this.state.errors;
    err.username = validText.test(event.target.value) ? "" : "Username-Only alphanumeric word"
    this.setState({
            errors: err
        }, ()=> {
            console.log(err.username)
    }) 
    this.setState({
        username : event.target.value
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

  usernameChangeHandler = (event) => {
    let err = this.state.errors;
    err.username = validText.test(event.target.value) ? "" : "Username-Only alphanumeric word"
    this.setState({
            errors: err
        }, ()=> {
            console.log(err.username)
    }) 
    this.setState({
        username : event.target.value
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
      username : this.state.username,
      password : this.state.password,
      loginOption: this.state.loginOption,
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/customers/login', data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
              console.log("Login authorized")
              console.log(response.data[0]);
              //call props action
              this.props.update('CNAME', response.data[0].cname)
              this.props.update('CEMAIL', response.data[0].cemail)
              this.props.update('CPASSWORD', response.data[0].cpassword)
              this.props.login()   //this will update isLogged = true
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
      redirectVar = <Redirect to= "/userdash"/>
    }

    const errors = this.state.errors;

    return(
        <div>
            {redirectVar}
            <span id = "exists"></span>
            <div class="container">
                <form onSubmit={this.submitLogin} >
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <p>Login as:</p>  
                            </div>
                            <div class = "form-group">
                            	<input type="radio" value="customer" 
                                checked={this.state.loginOption === 'customer'}
                                onChange={this.loginOptionHandler}/>
              								<label for="customer">Customer</label><br />
              								<input type="radio" value="restaurant"
                                checked={this.state.loginOption === 'restaurant'}
                                onChange={this.loginOptionHandler}/>
              								<label for="restaurant">Restaurant</label><br />
                        	  </div>
                            
                            <div class="form-group">
                                <input onChange = {this.usernameChangeHandler} 
                                type="text"  
                                name="username" 
                                class="form-control"
                                placeholder="Username"
                                required/>
                                {errors.username.length > 0 && 
                                <span>{errors.username}</span>}
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} 
                                type="password" 
                                name="password" 
                                class="form-control"
                                placeholder="Password"
                                required/>
                                {errors.password.length > 0 && 
                                <span>{errors.password}</span>}
                            </div>
                            
                            <button disabled={! validateForm(this.state.errors)} class="btn btn-primary">Login</button>

                            <div class='forgot'>
                              Don't have an account yet?<br />
                              <a href="/custsignup">Customer signup</a> <br />
                              <a href="/restsignup">Restaurant signup</a>
                            </div>
                        </div>
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
      cname : state.custProfile.cname,
      cpassword: state.custProfile.cpassword,
      cemail: state.custProfile.cemail,
      isLogged: state.isLogged.isLoggedIn
    }
}

//const mapDispatchToProps = (dispatch) => { since this does not call a function directly it cannot be a function

function mapDispatchToProps(dispatch) {  
  return {
    update : (field, payload) => dispatch(update(field, payload)),
    login: () => dispatch(login()),
    logout: () => dispatch(logout())
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
//export Login Component
//export default Login;
