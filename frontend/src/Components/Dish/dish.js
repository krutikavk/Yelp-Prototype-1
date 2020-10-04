import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import nachospic from './nachospic.png';


class Dish extends Component {
  constructor(props) {
    super(props);


    this.addToCartHandler = this.addToCartHandler.bind(this)
  }

  addToCartHandler = (event) => {
    alert("Added to cart");
  }

  render() {
    console.log("=>inside dish" , this.props.dish.dname)
    return (
      
      /*
      <div class="card-horizontal" style={{width: 400 }}>
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



export default Dish;