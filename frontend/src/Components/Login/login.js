import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

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
      type: '',
      authFlag: 'false',
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
      authFlag: 'false',
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
      password : this.state.password
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/login', data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                    authFlag : true
                })
            }
        }).catch(err =>{
            this.setState({
                authFlag : false
            })
        });
  }

  render(){
    //redirect based on successful login
    let redirectVar = null;
    if(cookie.load('cookie')){
       redirectVar = <Redirect to= "/home"/>
    } else {
       //Book ID already exists
       //document.getElementById("exists").textContent= "Incorrect Login"
    }
    const errors = this.state.errors;
    return(
        <div>
            {redirectVar}
            <span id = "exists"></span>

            <div class="container">
            	<div class="logo">
            		<img src="../../kelp_logo.css"></img>
            	</div>
                <form onSubmit={this.submitLogin} >
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <p>Login as:</p>  
                            </div>
                            <div class = "form-group">
                            	<input type="radio" id="customer" name="loginType" value="customer"/>
								<label for="customer">Customer</label><br />
								<input type="radio" id="restaurant" name="loginType" value="restaurant"/>
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
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
  }
}
//export Login Component
export default Login;
