import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import nachospic from './nachospic.png';


class Dish extends Component {
  render() {
    console.log("inside dish" , this.props)
    return (
      <div>
        {this.props.dishes}
      </div>
    )
  }

}

export default Dish;