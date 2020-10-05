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
import restaurant from './Restaurants/restaurantpage';
import cart from './Cart/cart';
import orders from './Order/ordersDisplay';


import notfound from './NotFound/notfound'

//import Navbar from './Navbar/navbar';
//import Userdash from './Userdash/userdash';

//Create a Main Component
class Main extends Component {
  render(){
    //<Route exact path='/dishes' render ={(props) => <dishes {...props} />} />

    // <Route path ='*' component={notfound}/>
    //<Route path='/' component={Navbar}/>
    //Reference: https://medium.com/@alexfarmer/redirects-in-react-router-dom-46198938eedc
    return(
    <div> 
        {/*Render Different Component based on Route*/}
        <Navbar/>
        <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/customer/login' component={Custlogin}/>
            <Route path='/restaurant/login' component={Restlogin}/>
            <Route path='/customer/signup' component={Custsignup}/>
            <Route path='/restaurant/signup' component={Restsignup}/>
            <Route path='/restaurant/updateinfo' component={Restupdateinfo}/>
            <Route path='/restaurant/updatelocation' component={Restupdatelocation}/>
            <Route path='/customer/dashboard' component={Userdash}/>
            <Route path='/restaurant/dashboard' component={Restdash}/>
            <Route path='/dishes' component={dishes}/>
            <Route path='/restaurants' component={restaurants}/>
            <Route path='/cart' component={cart}/>
            <Route path='/restaurant' component={restaurant}/>
            <Route path='/orders' component={orders}/>
            <Route path ='*' component={notfound}/>
        </Switch>

    </div>
    )
  }
}
//Export The Main Component
export default Main;