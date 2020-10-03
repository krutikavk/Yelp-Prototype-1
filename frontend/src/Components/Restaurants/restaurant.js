import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import restropic from './restro.jpg';


class Dish extends Component {
  render() {
    console.log("=>inside restaurant" , this.props)
    return (
      /*
      <div class="card" style={{width: 400 }}>
        <img class="card-img-top" src={nachospic} alt="dish"></img>
        <div class="card-body">
          <h4 class="card-title">{this.props.dish.dname}</h4>
          <p class="card-text">{this.props.dish.ddescription}</p>
          <p class="card-text">Category: {this.props.dish.dcategory}</p>
          <p class="card-text">Ingredients: {this.props.dish.dingredients}</p>
          <p class="card-text"><h4>Price: {this.props.dish.dprice}$</h4></p>
          <button class="btn btn-primary">Add to Cart</button>
        </div>
      </div>
      */


      <div class="container-fluid style={{height: 100}}">
        <div class="row">
          <div class="col-12 mt-3">
            <div class="card">
              <div class="card-horizontal">
                <div class="img-square-wrapper">
                    <img class="img-responsive card-img-top" src={restropic} alt="restro"></img>
                </div>
                <div class="card-body">
                    <p class="card-text">Name: {this.props.restaurant.rname}</p>
                    <p class="card-text">Phone: {this.props.restaurant.rphone}</p>
                    <p class="card-text">About us: {this.props.restaurant.rabout}</p>
                    <p class="card-text">Address: {this.props.restaurant.raddress}</p>
                    <p class="card-text">Cuisine: {this.props.restaurant.rcuisine}</p>
                    <p class="card-text">Service: {this.props.restaurant.rdelivery}</p>
                    <button class="btn btn-primary">View Menu</button>
                </div>
              </div>
              <div class="card-footer">
                  <small class="text-muted">Featured!</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}



export default Dish;