import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {update, login, logout} from '../../_actions';
//import * as ReactBootStrap from 'react-bootstrap'
import logo from './yelp-logo.jpg';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        //cookie.remove('cookie', { path: '/' })
        this.props.update('CNAME', '')
        this.props.update('CEMAIL', '')
        this.props.update('CPASSWORD', '')
        this.props.logout()

    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(this.props.isLogged === true){
            console.log("Login is true");
            /*
            navLogin = (
                <ReactBootStrap.Navbar.Text>
                  <Link to="/" onClick = {this.handleLogout}>Logout</Link>
                </ReactBootStrap.Navbar.Text>
            );
            */
            navLogin = (
                
                  <Link class="nav-link" to="/" onClick = {this.handleLogout}>Logout</Link>
                
            ); 
        }else{
            //Else display login button
            /*
            console.log("Not Able to read cookie");
            navLogin = (
                <ReactBootStrap.Navbar.Text>
                  <Link to="/login">Login</Link>
                </ReactBootStrap.Navbar.Text>
            )
            */
            console.log("Not Able to read cookie");
            navLogin = (

                  <Link class="nav-link" to="/login">Login</Link>

            )
        }
        
        
        return(

/*
            <ReactBootStrap.Navbar bg="light" expand="sm">
              <ReactBootStrap.Navbar.Brand> <Link to="/"><img src={logo}></img></Link> </ReactBootStrap.Navbar.Brand>
              <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
              <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
                <ReactBootStrap.Nav className="mr-auto">
                  <Link to="/userdash">Profile</Link>
                   
                </ReactBootStrap.Nav>
                <ReactBootStrap.Form inline>
                  <ReactBootStrap.FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <ReactBootStrap.Button variant="outline-success">Search</ReactBootStrap.Button>
                </ReactBootStrap.Form>
                <ReactBootStrap.Navbar.Collapse className="justify-content-end">
                {navLogin}
              </ReactBootStrap.Navbar.Collapse>
              </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>


            
          <div>
            <div class = "header"> 
            </div>
              <nav class="topnav">
                <div class="container-fluid">
                  <div class="navbar-header">
                  <ul class="topnav">
                    <li><Link to="/userdash"><span class="glyphicon glyphicon-log-in"></span> Dashboard</Link></li>
                    
                    {navLogin}
                    <a class="navbar-brand">Orders</a>
                    </ul>
                  </div>
                </div>
              </nav>
          </div>
            */

            /*
              For Left Align
              class = "navbar-nav mr-auto"
              right: ml-auto
              center: mx-auto

            */

          <nav class="navbar navbar-expand-sm bg-light navbar-light">
            <Link to="/"><img src={logo}></img></Link>

            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <Link class="nav-link" to="/userdash">Profile</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/order">Orders</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/order">Events</Link>
              </li>
            </ul>
              
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <form class="form-inline" action="/" >
                  <input class="form-control mr-sm-2" type="text" placeholder="Search" ></input>
                  <button class="btn btn-success " type="submit">Search</button>
                </form>
              </li>
            </ul>

            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                {navLogin}
              </li>
            </ul>
          </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

//export default Navbar;