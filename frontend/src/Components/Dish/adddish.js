import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Navbar from '../Navbar/navbar';



class AddDish extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dname: '',
      dingredients: '',
      dprice: '',
      ddescription: '',
      dcategory: '',
      durl: '',
      added: false,
    }

    this.dnameChangeHandler = this.dnameChangeHandler.bind(this);
    this.dingredientsChangeHandler = this.dingredientsChangeHandler.bind(this);
    this.dpriceChangeHandler = this.dpriceChangeHandler.bind(this);
    this.ddescriptionChangeHandler = this.ddescriptionChangeHandler.bind(this);
    this.dcategoryChangeHandler = this.dcategoryChangeHandler.bind(this);
  }

  dnameChangeHandler = (event) => {
    this.setState ({
      dname: event.target.value
    })
  }

  dingredientsChangeHandler = (event) => {
    this.setState ({
      dingredients: event.target.value
    })
  }

  dpriceChangeHandler = (event) => {
    this.setState ({
      dprice: event.target.value
    })
  }

  ddescriptionChangeHandler =  (event) => {
    this.setState ({
      ddescription: event.target.value
    })
  }

  dcategoryChangeHandler = (event)  => {
    this.setState ({
      dcategory: event.target.value
    })
  }

  addDish = (event) => {
    event.preventDefault();
    axios.defaults.withCredentials = true;
    let url = 'http://localhost:3001/dishes'

    const data = {
      dname: this.state.dname,
      rid: this.props.rid,
      dingredients: this.state.dingredients,
      dprice: this.state.dprice,
      ddescription: this.state.ddescription,
      dcategory: this.state.dcategory
    }


    axios.post(url, data)
      .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
          console.log("Dish added ")
          
          this.setState({
              added : true
          })
        }
      }).catch(err =>{
        alert("Incorrect credentials")
        this.setState({
            authFlag : false
        })
    });

  }


  render(){

    let redirectVar = null;

    if(! (this.props.isLogged !== true && this.props.whoIsLogged !== true)) {
      //redirectVar = <Redirect to='/login'/>
    }
    if(this.state.added === true) {
      redirectVar = <Redirect to='/restaurant/profile'/>
    }


    return (

      <div>
        <Navbar/>
        <div>
          {redirectVar} 
          <div className="card col-12 col-lg-4 login-card mt-2 hv-center" >

            <br/>
            <form>
              <div className="col d-flex justify-content-center rounded-0">
                <div className="card-header">
                  <h4>New Dish: </h4>
                </div>
              </div>

              <div className = "form-group text-left">
                <br/>
                <label htmlFor="exampleInputEmail1">Dish Name</label>
                <input onChange = {this.dnameChangeHandler} 
                                    type="text"  
                                    name="dname" 
                                    className="form-control form-control-sm"
                                    placeholder="Dish Name"
                                    aria-describedby="emailHelp" 
                                    required/>
              </div>

              <div className = "form-group text-left">
                <br/>
                <label htmlFor="exampleInputEmail1">Dish Ingredients</label>
                <input onChange = {this.dingredientsChangeHandler} 
                                    type="text"  
                                    name="dingredients" 
                                    className="form-control form-control-sm"
                                    placeholder="Ingredients"
                                    aria-describedby="emailHelp" 
                                    />
              </div>
              <div className="form-group text-left">
                <br/>
                <label htmlFor="exampleInputPassword1">Dish Description</label>
                <input onChange = {this.ddescriptionChangeHandler} 
                                    type="password" 
                                    name="cpassword" 
                                    className="form-control form-control-sm"
                                    placeholder="Password" 
                                    rows="5"
                                    required/>
                                    
              </div>
              <div className="form-group text-left">
                <br/>
                <label htmlFor="exampleInputPassword1">Dish Price</label>
                <input onChange = {this.dpriceChangeHandler} 
                                    type="number" 
                                    name="dprice" 
                                    className="form-control form-control-sm"
                                    placeholder="Price"
                                    step="0.01"
                                    required/>
                                    
              </div>

              <div className="col-md-12 text-center">
              <button id="btnLogin" className="btn btn-danger" onClick={this.addDish}>Add Dish</button>
              </div>
            </form>
          </div>
        </div>
      </div>


    )


  }

}


const mapStateToProps = (state) => {
    return {

      //Get global state to get cid, rid and login details to fetch dishes for customer/restaurant
      rid: state.restProfile.rid,
      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,

    }
}


export default connect(mapStateToProps)(AddDish);