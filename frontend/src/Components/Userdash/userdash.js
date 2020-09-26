import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {update} from '../../_actions'
import {login} from '../../_actions';
import {Redirect} from 'react-router-dom';
import profilepicture from './profile-picture.png';


const validText = RegExp('[A-Za-z0-9]+')

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
  	//this.props.update('CNAME', event.target.value)
  	
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
  	//this.props.update('CPASSWORD', event.target.value)
  }


  submitUsernameChange = (event) => {
  	//Write backend put request
  	event.preventDefault();
    
    const data = {
      cname: this.state.username,
      cpassword: this.props.cpassword,
      cemail: this.props.cemail
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    console.log(data);
    axios.put('http://localhost:3001/custUpdate', data)
      .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){

          //call props action
          this.props.update('CNAME', this.state.username)

          this.setState({
	    	usernameToChange: false,
	      })
        }
      }).catch(err =>{
        alert("Update failed")
    });
  }
	

  submitPasswordChange = (event) => {
  	//Write backend put request
  	event.preventDefault();
    
    const data = {
      cname: this.props.cname,
      cpassword: this.state.password,
      cemail: this.props.cemail
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.put('http://localhost:3001/custUpdate', data)
      .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){

          //call props action
          this.props.update('CPASSWORD', this.state.password)

          this.setState({
	    	passwordToChange: false,
	      })
        }
      }).catch(err =>{
        alert("Update failed")
    });
  }


  render() {
  	let redirectVar = null;
  	console.log(this.props.isLogged)
    if(this.props.isLogged === false) {
      redirectVar = <Redirect to= '/login'/>
    }
  	let usernameTextField = <button onClick = {this.usernameEditTextFieldHandler}>Edit</button>;
  	let passwordTextField = <button onClick = {this.passwordEditTextFieldHandler}>Edit</button>;
  	const errors = this.state.errors;

  	if(this.state.usernameToChange === true) {
  	  usernameTextField = (
  	  	<div class = 'login-form'>
  	  	<input onChange = {this.usernameChangeHandler} 
                                type="text"  
                                name="username" 
                                class="form-control"
                                placeholder="New username"
                                required/>
        {errors.username.length > 0 && 
          <span>{errors.username}</span>}
        <button disabled={this.state.errors.username.length > 0} onClick = {this.submitUsernameChange}>Submit change</button>
        </div>
      )
  	}

  	if(this.state.passwordToChange === true) {
  	  passwordTextField = (
  	  	<div>
  	  	<input onChange = {this.passwordChangeHandler} 
                                type="password"  
                                name="password" 
                                class="form-control"
                                placeholder="New password"
                                required/>
        {errors.password.length > 0 && 
          <span>{errors.password}</span>}

        <button disabled={this.state.errors.password.length > 0} onClick = {this.submitPasswordChange}>Submit change</button>
        </div>
      )
  	}

    return (

      <div>
      	{redirectVar}
	    <div class='dashboard'>
		    <div class='form-group'>
			  USERNAME: {this.props.cname}
			  {usernameTextField}

		    </div>
		    <div class='form-group'>
		      PASSWORD
		      {passwordTextField}

		    </div>
		    <div class='form-group'>
			  EMAIL ID: {this.props.cemail}
			</div>
			<div>
			  PROFILE PICTURE
			  <div>
		    	<img src={profilepicture} alt = "" width="300px" height="200px"></img>
			    <h2>User Dashboard</h2>
		      </div>
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