import React, { Component } from 'react';

//use react-router-dom ONLY
//see Marko Perendio comment about using react-router-dom
//Refer: https://stackoverflow.com/questions/55552147/invariant-failed-you-should-not-use-route-outside-a-router

import { Route } from 'react-router-dom';
import Login from './Login/login';
import Userdash from './Userdash/userdash';
import Restdash from './Restdash/restdash';
import Custsignup from './Signup/custsignup';
import Restsignup from './Signup/restsignup';
import Restupdate1 from './Restdash/restupdate1';
import Custlogin from './Login/custlogin';
import Restlogin from './Login/restlogin';
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
                <Route path='/customer/login' component={Custlogin}/>
                <Route path='/restaurant/login' component={Restlogin}/>
                <Route path='/customer/signup' component={Custsignup}/>
                <Route path='/restaurant/signup' component={Restsignup}/>
                <Route path='/restaurant/update1' component={Restupdate1}/>
                <Route path='/customer/dashboard' component={Userdash}/>
                <Route path='/restaurant/dashboard' component={Restdash}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;