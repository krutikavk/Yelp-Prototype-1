import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import nachospic from './nachospic.png';
import {updateCart} from '../../_actions';
import {connect} from 'react-redux';


var dataToChange = {
  dname: '',
  ddescription: '',
  dcategory: '',
  dingredients: '',
  dprice: '',
  durl: '',
}

class Dish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dname: '',
      ddescription: '',
      dcategory: '',
      dingredients: '',
      dprice: '',

      dnameToChange: false,
      ddescriptionToChange: false,
      dcategoryToChange: false,
      dingredientsToChange: false,
      dpriceToChange: false,

    }

    dataToChange = {
      dname: this.props.dish.dname,
      ddescription: this.props.dish.ddescription,
      dcategory: this.props.dish.dcategory,
      dingredients: this.props.dish.dingredients,
      dprice: this.props.dish.dprice,
      durl: this.props.dish.durl,
    }


    //for customer
    this.addToCartHandler = this.addToCartHandler.bind(this)

    //for restaurant
    this.dnameEditTextFieldHandler = this.dnameEditTextFieldHandler.bind(this);
    this.ddescriptionEditTextFieldHandler = this.ddescriptionEditTextFieldHandler.bind(this);
    this.dcategoryEditTextFieldHandler = this.dcategoryEditTextFieldHandler.bind(this);
    this.dingredientsEditTextFieldHandler = this.dingredientsEditTextFieldHandler.bind(this);
    this.dpriceEditTextFieldHandler = this.dpriceEditTextFieldHandler.bind(this);

    this.dnameChangeHandler = this.dnameChangeHandler.bind(this);
    this.ddescriptionChangeHandler = this.ddescriptionChangeHandler.bind(this);
    this.dcategoryChangeHandler = this.dcategoryChangeHandler.bind(this);
    this.dingredientsChangeHandler = this.dingredientsChangeHandler.bind(this);
    this.dpriceChangeHandler = this.dpriceChangeHandler.bind(this);

    this.submitDishChange = this.submitDishChange.bind(this);

  }

  addToCartHandler = (event) => {

    if(this.props.isLogged === true) {
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
    } else {
      //If not one is logged in, 
      alert('Please login before placing an order');
    }
  }

  dnameEditTextFieldHandler = (event) => {
    this.setState({
      dnameToChange: true,
    })
  }

  ddescriptionEditTextFieldHandler = (event) => {
    this.setState({
      ddescriptionToChange: true,
    })
  }

  dcategoryEditTextFieldHandler = (event) => {
    this.setState({
      dcategoryToChange: true,
    })
  }

  dingredientsEditTextFieldHandler = (event) => {
    this.setState({
      dingredientsToChange: true,
    })
  }

  dpriceEditTextFieldHandler = (event) => {
    this.setState({
      dpriceToChange: true,
    })
  }

  dnameChangeHandler = (event) => {
    dataToChange = {
      dname: event.target.value,
      ddescription: this.props.dish.ddescription,
      dcategory: this.props.dish.dcategory,
      dingredients: this.props.dish.dingredients,
      dprice: this.props.dish.dprice,
      durl: this.props.dish.durl,
    }
  }


  ddescriptionChangeHandler = (event) => {
    dataToChange = {
      dname: this.props.dish.dname,
      ddescription: event.target.value,
      dcategory: this.props.dish.dcategory,
      dingredients: this.props.dish.dingredients,
      dprice: this.props.dish.dprice,
      durl: this.props.dish.durl,
    }
  }

  dcategoryChangeHandler = (event) => {
    dataToChange = {
      dname: this.props.dish.dname,
      ddescription: this.props.dish.ddescription,
      dcategory: event.target.value,
      dingredients: this.props.dish.dingredients,
      dprice: this.props.dish.dprice,
      durl: this.props.dish.durl,
    }
  }

  dingredientsChangeHandler = (event) => {
    dataToChange ={
      dname: this.props.dish.dname,
      ddescription: this.props.dish.ddescription,
      dcategory: this.props.dish.dcategory,
      dingredients: event.target.value,
      dprice: this.props.dish.dprice,
      durl: this.props.dish.durl,
    }
  }

  dpriceChangeHandler = (event) => {
    dataToChange = {
      dname: this.props.dish.dname,
      ddescription: this.props.dish.ddescription,
      dcategory: this.props.dish.dcategory,
      dingredients: this.props.dish.dingredients,
      dprice: event.target.value,
      durl: this.props.dish.durl,
    }
  }

  submitDishChange = (event) => {
    event.preventDefault();
    axios.defaults.withCredentials = true;


    console.log(dataToChange);
    let url = 'http://localhost:3001/dishes/' + this.props.dish.did;
    console.log("Update dish at ", url)

    axios.put(url, dataToChange)
      .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
          alert("Update done")
          this.setState({
            dname: dataToChange.dname,
            ddescription: dataToChange.dname,
            dcategory: dataToChange.dcategory,
            dingredients: dataToChange.dingredients,
            dprice: dataToChange.dprice,
            durl: dataToChange.durl,

            dnameToChange: false,
            ddescriptionToChange: false,
            dcategoryToChange: false,
            dingredientsToChange: false,
            dpriceToChange: false,
          })

        }
      }).catch(err =>{
        alert("Update failed")
    });
  }




  render() {

    //For customer login, give an option to add to cart
    let addToCartButton = null;
    if(this.props.isLogged === true && this.props.whoIsLogged === false) {
      //customer login
      addToCartButton = <button onClick = {this.addToCartHandler} class="btn btn-primary">Add to Cart</button>
    }

    //For restaurant login, give an option to edit the dish
    let dnameTextField = <button class="btn btn-danger btn-sm" onClick = {this.dnameEditTextFieldHandler}>Edit</button>;
    let ddescriptionTextField = <button class="btn btn-danger btn-sm" onClick = {this.ddescriptionEditTextFieldHandler}>Edit</button>;
    let dcategoryTextField = <button class="btn btn-danger btn-sm" onClick = {this.dcategoryEditTextFieldHandler}>Edit</button>;
    let dingredientsTextField = <button class="btn btn-danger btn-sm" onClick = {this.dingredientsEditTextFieldHandler}>Edit</button>;
    let dpriceTextField = <button class="btn btn-danger btn-sm" onClick = {this.dpriceEditTextFieldHandler}>Edit</button>;

    if(this.state.dnameToChange === true) {
      dnameTextField = (
        <div class = 'login-form'>
        <input onChange = {this.dnameChangeHandler} 
                                type="text"  
                                name="dname" 
                                class="form-control"
                                placeholder="New dish name"
                                required/>
        <button class="btn btn-danger btn-sm" onClick = {this.submitDishChange}>Submit change</button>
        </div>
      )
    }

    if(this.state.ddescriptionToChange === true) {
      ddescriptionTextField = (
        <div class = 'login-form'>
        <input onChange = {this.ddescriptionChangeHandler} 
                                type="text"  
                                name="dname" 
                                class="form-control"
                                placeholder="New dish name"
                                required/>
        <button class="btn btn-danger btn-sm" onClick = {this.submitDishChange}>Submit change</button>
        </div>
      )
    }

    if(this.state.dcategoryToChange === true) {
      dcategoryTextField = (
        <div class = 'login-form'>
        <input onChange = {this.dcategoryChangeHandler} 
                                type="text"  
                                name="dname" 
                                class="form-control"
                                placeholder="New dish name"
                                required/>
        <button class="btn btn-danger btn-sm" onClick = {this.submitDishChange}>Submit change</button>
        </div>
      )
    }

    if(this.state.dingredientsToChange === true) {
      dingredientsTextField = (
        <div class = 'login-form'>
        <input onChange = {this.dingredientsChangeHandler} 
                                type="text"  
                                name="dname" 
                                class="form-control"
                                placeholder="New dish name"
                                required/>
        <button class="btn btn-danger btn-sm" onClick = {this.submitDishChange}>Submit change</button>
        </div>
      )
    }

    if(this.state.dpriceToChange === true) {
      dpriceTextField = (
        <div class = 'login-form'>
        <input onChange = {this.dpriceChangeHandler} 
                                type="text"  
                                name="dname" 
                                class="form-control"
                                placeholder="New dish name"
                                required/>
        <button class="btn btn-danger btn-sm" onClick = {this.submitDishChange}>Submit change</button>
        </div>
      )
    }



    return (

      <div>
      
      <div class="card-horizontal" >
        <div class="img-square-wrapper">
            <img class="img-responsive img-thumbnail" src={nachospic} alt="dish" width="200" height="200"></img>
        </div>
        <div class="card-body">
          <h4 class="card-title">{dataToChange.dname} {dnameTextField}</h4>
          <div class="card-text">{dataToChange.ddescription} {ddescriptionTextField}</div>
          <p class="card-text">{dataToChange.dcategory} {dcategoryTextField}</p>
          <p class="card-text">Ingredients: {dataToChange.dingredients} {dingredientsTextField}</p>
          <p class="card-text"><h4>{dataToChange.dprice}$ {dpriceTextField}</h4></p>
          {addToCartButton}
        </div>
      </div>
      <div class="card-footer">

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
      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,
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
