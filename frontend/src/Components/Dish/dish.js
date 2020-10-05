import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import nachospic from './nachospic.png';
import {updateCart} from '../../_actions';
import {connect} from 'react-redux';


class Dish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
    this.addToCartHandler = this.addToCartHandler.bind(this)
  }

  addToCartHandler = (event) => {
    //Iterate through cartContents and allow to add only if there are no other restaurants' orders
    let check = this.props.cartContents.filter(array => array.rid !== this.props.rid);
    if(check.length >= 1) {
      alert("Please place orders for one restaurant at a time")
    } else {
      let data = {
        dname: this.props.dish.dname,            //dish name
        rid: this.props.rid,              //restaurant
        dquantity: 1,        //dish quantity
        dprice: this.props.dish.dprice,           //dish price
        ooption: this.props.rdelivery,          //Delivery/Pickup
        oaddress: ''
      }
      
      this.props.updateCart('ADD', data);
      alert("Added to cart")
    }

  }

  render() {
 
    return (

      <div>
      
      <div class="card-horizontal" >
        <div class="img-square-wrapper">
            <img class="img-responsive card-img-top" src={nachospic} alt="dish"></img>
        </div>
        <div class="card-body">
          <h4 class="card-title">{this.props.dish.dname}</h4>
          <p class="card-text">{this.props.dish.ddescription}</p>
          <p class="card-text">Category: {this.props.dish.dcategory}</p>
          <p class="card-text">Ingredients: {this.props.dish.dingredients}</p>
          <p class="card-text"><h4>{this.props.dish.dprice}$</h4></p>
          <button onClick = {this.addToCartHandler} class="btn btn-primary">Add to Cart</button>
        </div>
      </div>
      <div class="card-footer">
          <small class="text-muted">Featured!</small>
      </div>
      </div>

      /*
      <td class="border-0 align-middle"><button onClick={()=>this.removeEntryHandler({dname:entry.dname, dprice:entry.dprice})}  class="btn btn-primary">Remove</button></td>

      
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 mt-3">
            <div class="card">
              <div class="card-horizontal">
                <div class="img-square-wrapper">
                    <img class="img-responsive" src={nachospic} alt="dish"></img>
                </div>
                <div class="card-body">
                    <p class="card-text">{this.props.dish.ddescription}</p>
                    <p class="card-text">Category: {this.props.dish.dcategory}</p>
                    <p class="card-text">Ingredients: {this.props.dish.dingredients}</p>
                    <p class="card-text"><h4>Price: {this.props.dish.dprice}$</h4></p>
                    <button class="btn btn-primary">Add to Cart</button>
                </div>
              </div>
              <div class="card-footer">
                  <small class="text-muted">Featured!</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      */
    )
  }

}



const mapStateToProps = (state) => {
    return {
      cartContents: state.cart.cartContents

    }
}

//const mapDispatchToProps = (dispatch) => { since this does not call a function directly it cannot be a function
function mapDispatchToProps(dispatch) {  
  return {
    updateCart: (field, payload) => dispatch(updateCart(field, payload))
  }
  
}

//export Login Component
//export default Login;
//export default connect(mapStateToProps, mapDispatchToProps())(Custsignup);
export default connect(mapStateToProps, mapDispatchToProps)(Dish);
