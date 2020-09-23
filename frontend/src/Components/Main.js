import React, { Component } from 'react';

//use react-router-dom ONLY
//see Marko Perendio comment about using react-router-dom
//Refer: https://stackoverflow.com/questions/55552147/invariant-failed-you-should-not-use-route-outside-a-router

import { Route } from 'react-router-dom';
import Login from './Login/login';
import Userdash from './Userdash/userdash'
import Custsignup from './Signup/custsignup'
import Navbar from './Navbar/navbar.js'

//import Navbar from './Navbar/navbar';
//import Userdash from './Userdash/userdash';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path='/' component={Navbar}/>
                <Route path='/login' component={Login}/>
                <Route path='/custsignup' component={Custsignup}/>
                <Route path='/userdash' component={Userdash}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;