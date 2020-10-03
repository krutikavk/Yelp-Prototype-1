import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout, restaurantLogin} from '../../_actions';
import Dish from './dish';

 
class Dishes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: []
    }
  }


  componentWillMount() {
    let url = 'http://localhost:3001/dishes/1';
    axios.get(url)
        .then(response => {

          console.log("Status Code : ",response.status);
          if(response.status === 200){
            console.log("==>", response.data)
            let temp = [];
            for( let i = 0;
             i < response.data.length; i++) {
              temp.push(response.data[i])
            }
            this.setState({
//              dishes: JSON.parse(response.data)
                dishes: temp
            })
            
            //Access data inside the state as this.state.dishes[0].dname, .rid, .dingredients, etc.
            console.log("State changed to response: ", this.state.dishes)
          }
        }).catch(err =>{
            console.log("No response")
        });
  }

  render() {
    //{this.state.dishes.length > 0 && <displayDishes dishes={this.state.dishes} />}
    return(
      <div>
        {this.state.dishes}
        {this.state.dishes.map (dish => (
          <Dish dish = {dish} />
        ))}
      </div>

    )

  }

}


const mapStateToProps = (state) => {
    return {

      //Get global state to get cid, rid and login details to fetch dishes for customer/restaurant

      cid: state.custProfile.cid,
      rid: state.restProfile.rid,
      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,

    }
}

function mapDispatchToProps(dispatch) {  
  return {
    update : (field, payload) => dispatch(update(field, payload)),
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishes);