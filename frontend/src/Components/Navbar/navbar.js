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
        this.props.update('CID', '')
        this.props.update('CEMAIL', '')
        this.props.update('CPASSWORD', '')
        this.props.update('CNAME', '')
        this.props.update('CPHONE', '')
        this.props.update('CABOUT', '')
        this.props.update('CJOINED', '')
        this.props.update('CPHOTO', '')
        this.props.update('CFAVREST', '')
        this.props.update('CFAVCUISINE', '')

        this.props.update('RID', '')
        this.props.update('REMAIL', '')
        this.props.update('RPASSWORD', '')
        this.props.update('RNAME', '')
        this.props.update('RPHONE', '')
        this.props.update('RABOUT', '')
        this.props.update('RLOCATION', '')
        this.props.update('RLATITUDE', '')
        this.props.update('RLONGITUDE', '')
        this.props.update('RADDRESS', '')
        this.props.update('RCUISINE', '')
        this.props.update('RDELIVERY', '')

        this.props.logout()



    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(this.props.isLogged === true){
            console.log("Login is true");
            navLogin = (
                  <Link className="nav-link" to="/login" onClick = {this.handleLogout}>Logout</Link>
            ); 
        }else{
            navLogin = (
                  <Link className="nav-link" to="/login">Login</Link>
            )
        }


        let links = null;
        let dashboard = null;

        //let cart = null;
        let cart = (
            <Link className="nav-link" to="/cart">
              <i className="fa fa-shopping-cart" style={{'font-size':36}}></i>
            </Link>
          )
        let menu = null;
        let search = (
          <li className="nav-item">
            <form className="form-inline" action="/" >
              <input className="form-control mr-sm-2" type="text" placeholder="Restaurants" ></input>
              <input className="form-control mr-sm-2" type="text" placeholder="Location" ></input>
              <button className="btn btn-success btn-sm" type="submit">Search</button>
            </form>
          </li>
        )

        
        

        if(this.props.isLogged === true && this.props.whoIsLogged === false) {
          //customer login
          dashboard = <Link className="nav-link" to="/customer/dashboard">Profile</Link>
          /*
          cart = (
            <Link className="nav-link" to="/cart">
              <i className="fa fa-shopping-cart" style={{'font-size':36}}></i>
            </Link>
          )
          */

        } else if (this.props.isLogged === true && this.props.whoIsLogged === true) {
          //restaurant login
          dashboard = <Link className="nav-link" to="/restaurant/dashboard">Profile</Link>
          search = null;
          menu = <Link className="nav-link" to="/dishes">Menu</Link>
          cart = null;
        }
        
        
        return(

          <nav className="navbar navbar-expand-sm bg-light navbar-light">
            <Link to="/"><img src={logo}></img></Link>

            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                {dashboard}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">Orders</Link>
              </li>
              <li className="nav-item">
                {menu}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/events">Events</Link>
              </li>
            </ul>
              
            <ul className="navbar-nav mx-auto">
              {search}
            </ul>
            
            <ul className="navbar-nav ml-auto">
              {cart}
              <li className="nav-item">
                {navLogin}
              </li>
            </ul>
          </nav>





          
          /*
          <nav className="navbar navbar-expand-sm bg-light navbar-light">
            <Link to="/"><img src={logo}></img></Link>

            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/userdash">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/events">Events</Link>
              </li>
            </ul>
              
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <form className="form-inline" action="/" >
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" ></input>
                  <button className="btn btn-success " type="submit">Search</button>
                </form>
              </li>
            </ul>

            <i className="fa fa-shopping-cart" style={{'font-size':36}}>
              <Link className="nav-link" to="/cart"></Link>
            </i>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                {navLogin}
              </li>
            </ul>
          </nav>
          */
          
        )
    }
}

//importedname: state.reducer.statename

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
    logout: () => dispatch(logout())
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

//export default Navbar;