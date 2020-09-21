import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/login';
import Navbar from './Navbar/navbar'

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path='/navbar' component={Navbar}/>
                <Route path='/login' component={Login}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;