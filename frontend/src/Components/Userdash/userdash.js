import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {connect} from 'react-redux';
import {update} from '../../_actions'
import {login} from '../../_actions';
import {Redirect} from 'react-router-dom';


const validText = RegExp('[A-Za-z0-9]+')
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Userdash extends Component {

  constructor(props) {
	super(props);

	this.state = {

	  username: '',
	  password: '',
	  usernameToChange: false,
	  passwordToChange: false,
	  errors: {
	  	username: '',
	  	password: '',
	  }
    };

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitUsernameChange = this.submitUsernameChange.bind(this);
    this.submitPasswordChange = this.submitPasswordChange.bind(this);
    this.usernameEditTextFieldHandler = this.usernameEditTextFieldHandler.bind(this);
    this.passwordEditTextFieldHandler = this.passwordEditTextFieldHandler.bind(this);
  }

  componentWillMount() {
  	this.setState({
  	  usernameToChange: false,
	  passwordToChange: false,
  	})
  }

  usernameEditTextFieldHandler = (event) => {
    this.setState({
    	usernameToChange: true,
    })
  }  

  passwordEditTextFieldHandler = (event) => {
    this.setState({
    	passwordToChange: true,
    })
  }



  usernameChangeHandler = (event) => {
  	this.setState({
  		username: event.target.value,
  	})
  	this.props.update('CNAME', event.target.value)
  }

  passwordChangeHandler = (event) => {
  	this.setState({
  		password: event.target.value
  	})
  	this.props.update('CPASSWORD', event.target.value)
  }



  submitUsernameChange = (event) => {
  	//Write backend put request
  	
  }

  submitPasswordChange = (event) => {
  	//write backend put request
	
  }
  
  
	
  render() {
  	let redirectVar = null;
  	console.log(this.props.isLogged)
    if(this.props.isLogged === false) {
      redirectVar = <Redirect to= '/login'/>
    }
  	let usernameTextField = <button class="btn btn-primary" onClick = {this.usernameEditTextFieldHandler}>Edit</button>;
  	let passwordTextField = <button class="btn btn-primary" onClick = {this.passwordEditTextFieldHandler}>Edit</button>;
  	const errors = this.state.errors;

  	if(this.state.usernameToChange === true) {
  	  usernameTextField = (
  	  	<div class = 'login-form'>
  	  	<input onChange = {this.submitUsernameChange} 
                                type="text"  
                                name="username" 
                                class="form-control"
                                placeholder="New username"
                                required/>
        {errors.username.length > 0 && 
          <span>{errors.username}</span>}
        <button class="btn btn-primary" onClick = {this.submitUsernameChange}>Submit username change</button>
        </div>
      )
  	}

  	if(this.state.passwordToChange === true) {
  	  passwordTextField = (
  	  	<div class = 'login-form'>
  	  	<input onChange = {this.submitPasswordChange} 
                                type="password"  
                                name="password" 
                                class="form-control"
                                placeholder="New password"
                                required/>
        {errors.password.length > 0 && 
          <span>{errors.password}</span>}

        <button class="btn btn-primary" onClick = {this.submitPasswordChange}>Submit password change</button>
        </div>
      )
  	}

    return (

      <div>
      	{redirectVar}
	    <div class = 'login-form'>

		    <h2> User Dashboard</h2>

		    <div class='form-group'>
			  <h3>Username</h3>
			  {usernameTextField}

		    </div>
		    <div class='form-group'>
		      <h3>Password</h3>
		      {passwordTextField}

		    </div>
		    <div class='form-group'>
			  <h3>Email ID</h3>
			  
			</div>
		  </div>
	  </div>
	)
  }

}


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
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Userdash);

//export default Userdash;