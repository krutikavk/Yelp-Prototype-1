import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {update, login, logout} from '../../_actions';
import * as ReactBootStrap from 'react-bootstrap'
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
            navLogin = (
                <ReactBootStrap.Navbar.Text>
                  <Link to="/" onClick = {this.handleLogout}>Logout</Link>
                </ReactBootStrap.Navbar.Text>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ReactBootStrap.Navbar.Text>
                  <Link to="/login">Login</Link>
                </ReactBootStrap.Navbar.Text>
            )
        }
        
        
        return(

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


            /*
          <div>
            <div class = "header"> 
            </div>
              <nav class="topnav">
                <div class="container-fluid">
                  <div class="navbar-header">
                  <ul class="topnav">
                    <li><Link to="/userdash"><span class="glyphicon glyphicon-log-in"></span> Dashboard</Link></li>
                    <a class="navbar-brand">Orders</a>
                    {navLogin}
                    </ul>
                  </div>
                </div>
              </nav>
          </div>
          */
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