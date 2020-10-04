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
      dishes: [],
      rid: ''
    }

  }




  componentDidMount(props) {

    console.log("rest id: ", this.props.location.query.rid)
    console.log("rest id: ", this.props.location.query.rname)
    console.log("rest id: ", this.props.location.query.rphone)
    console.log("rest id: ", this.props.location.query.rdelivery)

    //
    let url = 'http://localhost:3001/dishes/' + this.props.location.query.rid;

    axios.get(url)
        .then(response => {
          if(response.status === 200){
            //When results return multiple rows, rowdatapacket object needs to be converted to JSON object again 
            //use JSON.parse(JSON.stringify()) to convert back to JSON object
            let temp = JSON.parse(JSON.stringify(response.data));
            this.setState({
                dishes: [...temp],
                rid: this.props.location.query.rid
            })
          }
        }).catch(err =>{
            console.log("No response")
        });
  }

  render() {
    //{this.state.dishes.length > 0 && <displayDishes dishes={this.state.dishes} />}
    return(

      <div>
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