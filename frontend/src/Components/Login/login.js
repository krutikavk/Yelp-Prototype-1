import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
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
      custLogin: false,
      restLogin: false
    };

    this.customerLoginHandler = this.customerLoginHandler.bind(this);
    this.restaurantLoginhandler = this.restaurantLoginHandler.bind(this);
  }

  customerLoginHandler = (event) => {
    this.setState({
      custLogin: true
    });
  }

  restaurantLoginHandler = (event) => {
    this.setState({
      restLogin: true
    });
  }

  render(){
    //redirect based on successful login

    let redirectVar = null;
    
    if(this.props.isLogged === true && this.props.whoIsLogged === false) {
      //Customer login
      redirectVar = <Redirect to= '/customer/dashboard'/>
    } else if (this.props.isLogged === true && this.props.whoIsLogged === true) {
      //restaurant login
      redirectVar = <Redirect to= '/restaurant/dashboard'/>
    } else if(this.props.isLogged === false && this.state.custLogin === true) {
      redirectVar = <Redirect to= '/customer/login'/>
    } else if(this.props.isLogged === false && this.state.restLogin === true) {
      redirectVar = <Redirect to= '/restaurant/login'/>
    }
  

    return(

      <div>
        {redirectVar}
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center" >

          <br />
          <br />
          <button id="btnLogin" className="btn btn-success btn-sm" onClick={this.customerLoginHandler}>Customer Login</button> 
          <br />
          <br />
          <button id="btnLogin" className="btn btn-success btn-sm" onClick={this.restaurantLoginHandler}>Restaurant Login</button>
        </div>

      </div>

    )
  }
}



//importedname: state.reducer.statename

const mapStateToProps = (state) => {
    return {
      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,
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
