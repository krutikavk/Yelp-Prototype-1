import React, { Component } from 'react';

//use react-router-dom ONLY
//see Marko Perendio comment about using react-router-dom
//Refer: https://stackoverflow.com/questions/55552147/invariant-failed-you-should-not-use-route-outside-a-router

import {Route,Switch} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Login from './Login/login';
import Userdash from './Userdash/userdash';
import Restdash from './Restdash/restdash';
import Custsignup from './Signup/custsignup';
import Restsignup from './Signup/restsignup';
import Restupdateinfo from './Restdash/restupdateinfo';
import Restupdatelocation from './Restdash/restupdatelocation';
import Custlogin from './Login/custlogin';
import Restlogin from './Login/restlogin';
import Navbar from './Navbar/navbar';
import dishes from './Dish/displaydishes'
import restaurants from './Restaurants/displayRestaurants';
import cart from './Cart/cart';


import notfound from './NotFound/notfound'

//import Navbar from './Navbar/navbar';
//import Userdash from './Userdash/userdash';

//Create a Main Component
class Main extends Component {
  render(){
    //<Route exact path='/dishes' render ={(props) => <dishes {...props} />} />

    // <Route path ='*' component={notfound}/>
    return(
    <div>
        {/*Render Different Component based on Route*/}

        <Route path='/' component={Navbar}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/customer/login' component={Custlogin}/>
        <Route exact path='/restaurant/login' component={Restlogin}/>
        <Route exact path='/customer/signup' component={Custsignup}/>
        <Route exact path='/restaurant/signup' component={Restsignup}/>
        <Route exact path='/restaurant/updateinfo' component={Restupdateinfo}/>
        <Route exact path='/restaurant/updatelocation' component={Restupdatelocation}/>
        <Route exact path='/customer/dashboard' component={Userdash}/>
        <Route exact path='/restaurant/dashboard' component={Restdash}/>
        <Route exact path='/dishes' component={dishes}/>
        <Route exact path='/restaurants' component={restaurants}/>
        <Route exact path='/cart' component={cart}/>

    </div>
    )
  }
}
//Export The Main Component
export default Main;