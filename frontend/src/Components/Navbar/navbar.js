import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {update, login, logout} from '../../_actions'

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
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        
        let redirectVar = null;
        if(this.props.isLogged === true){
            redirectVar = <Redirect to="/home"/>
        }
        
        return(

            <div>
                <nav class="topnav">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand">Yelp!</a>
                        </div>
                        {navLogin}
                    </div>
                </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

//export default Navbar;