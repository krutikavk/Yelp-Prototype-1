import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout, customerLogin} from '../../_actions';

const validText = RegExp('[A-Za-z0-9]+')
// eslint-disable-next-line no-useless-escape
const validEmail = RegExp('\\S+\@\\S+\.\\S+')
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Custsignup extends Component {
  constructor(props) {
	super(props);

	this.state = {
	  cname: '',
	  cemail: '',
	  cpassword: '',
	  isAdded: false,
	  errors: {
  		cname: '',
  		cemail: '',
  		cpassword: '',
	  }
	}

	this.cnameChangeHandler = this.cnameChangeHandler.bind(this);
	this.cemailChangeHandler = this.cemailChangeHandler.bind(this);
	this.cpasswordChangeHandler = this.cpasswordChangeHandler.bind(this);
	this.registerCustomer = this.registerCustomer.bind(this);

  }

  cnameChangeHandler = (event) => {
    let err = this.state.errors;
    err.cname = validText.test(event.target.value) ? '' : 'Username-Only alphanumeric word';
    this.setState({
      errors: err
        }, ()=> {
          console.log(err.cname)
    }) 
    //this.props.update('CNAME', event.target.value)
    this.setState({
      cname: event.target.value
    })
  }

  cemailChangeHandler = (event) => {
    let err = this.state.errors;
    err.cemail = validEmail.test(event.target.value) ? '' : 'Invalid email ID';
    this.setState({
      errors: err
        }, ()=> {
            console.log(err.cemail)
    }) 
    //this.props.update('CEMAIL', event.target.value)
    this.setState({
      cemail: event.target.value
    })
  }

  cpasswordChangeHandler = (event) => {
    let err = this.state.errors;
    err.cpassword = event.target.value.length >= 5 ? "" : "Password should have 5 or more characters"
    this.setState({
      errors: err
      }, ()=> {
	    console.log(err.cpassword)
  	}) 
    //this.props.update('CPASSWORD', event.target.value)
  	this.setState({
  	  cpassword : event.target.value
  	})
  }

  registerCustomer = (event) => {
  	event.preventDefault();
  	if(validateForm(this.state.errors)) {
      console.info("Valid form")
    } else {
      console.error("Invalid form")
    }

    const data = {
      cname : this.state.cname,
      cemail : this.state.cemail,
      cpassword: this.state.cpassword,
    }

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/customers', data)
      .then(response => {

        console.log("Status Code : ",response.status);
        if(response.status === 200){
          console.log('Customer added')
          this.props.update('CID', response.data[0].cid)
          this.props.update('CEMAIL', response.data[0].cemail)
          this.props.update('CPASSWORD', response.data[0].cpassword)
          this.props.update('CNAME', response.data[0].cname)
          this.props.update('CPHONE', response.data[0].cphone)
          this.props.update('CABOUT', response.data[0].cabout)
          this.props.update('CJOINED', response.data[0].cjoined)
          this.props.update('CPHOTO', response.data[0].cphoto)
          this.props.update('CFAVREST', response.data[0].cfavrest)
          this.props.update('CFAVCUISINE', response.data[0].cfavcuisine)
          this.props.login()
          this.props.customerLogin()
          //This is no longer needed, state error only needed
          this.setState({
            isAdded : true
          })
        }
      }).catch(err =>{
        this.setState({
            isAdded : false
        })
        this.props.logout();
    });
  }




  render() {
  	let redirectVar = null;
    console.log("islogged props: ", this.props.isLogged)
    if(this.props.isLogged === true && this.props.whoIsLogged === false) {
      redirectVar = <Redirect to= "/customer/dashboard"/>
    }
    const errors = this.state.errors;

	  return (

	    <div>

        {redirectVar}

        <div class="container">
            <form onSubmit={this.registerCustomer} >
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <p>Customer Signup</p>  
                        </div>
                        <div class="form-group">
                            <input onChange = {this.cnameChangeHandler} 
                            type="text"  
                            name="cname" 
                            class="form-control"
                            placeholder="Name"
                            required/>
                            {errors.cname.length > 0 && 
                            <span>{errors.cname}</span>}
                        </div>
                        
                        <div class="form-group">
                            <input onChange = {this.cemailChangeHandler} 
                            type="text"  
                            name="cemail" 
                            class="form-control"
                            placeholder="Email ID"
                            required/>
                            {errors.cemail.length > 0 && 
                            <span>{errors.cemail}</span>}
                        </div>
                        <div class="form-group">
                            <input onChange = {this.cpasswordChangeHandler} 
                            type="password" 
                            name="cpassword" 
                            class="form-control"
                            placeholder="Password"
                            required/>
                            {errors.cpassword.length > 0 && 
                            <span>{errors.cpassword}</span>}
                        </div>
                        
                        <button disabled={! validateForm(this.state.errors)} class="btn btn-danger">Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
      </div>
    )	
  }

}

//importedname: state.reducer.statenames
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
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
    customerLogin: () => dispatch(customerLogin())
  }
  
}

//export Login Component
//export default Login;
//export default connect(mapStateToProps, mapDispatchToProps())(Custsignup);
export default connect(mapStateToProps, mapDispatchToProps)(Custsignup);

//export default Custsignup;



