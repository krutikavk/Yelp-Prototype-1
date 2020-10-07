import React, { Component } from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Review extends Component {

  constructor(props) {
    super(props);

    this.state = {
      linkReviewTo: {}
    }
  }

  componentDidMount() {

    let url = '';

    if(this.props.whoIsLogged === true) {
      //for restaurant login, link review to customer
      url = 'http://localhost:3001/customers/' + this.props.review.cid
    } else {
      //for customer login, link review to restaurant
      url = 'http://localhost:3001/restaurants/' + this.props.review.rid
    }
    axios.get(url)
        .then(response => {
          if(response.status === 200){
            //When results return multiple rows, rowdatapacket object needs to be converted to JSON object again 
            //use JSON.parse(JSON.stringify()) to convert back to JSON object
            let temp = JSON.parse(JSON.stringify(response.data));
            this.setState({
              //Expecting just one row of result, so return row 0!! 
              //Do not =[...temp] or temp
              linkReviewTo: temp[0],
            })
          }
        }).catch(err =>{
            console.log("No response")
    });

    
  }

  render() {


    let linkto = '/restaurant';
    let query = this.state.linkReviewTo;
    console.log("query data: ", query)


    if(this.props.whoIsLogged === false) {
      //customer login--link to restaurant
      linkto = '/customer/profile ';
      
    }

    return (
      <Link to ={{
                  pathname: linkto , query: query
                }}>
        <div class="card-horizontal" >
          <div class="card-body">
            <h4 class="card-title">{this.props.review.rerating}</h4>
            <p class="card-text">{this.props.review.retext}</p>
            <p class="card-text">Category: {this.props.review.rdate}</p>
          </div>
        </div>
      </Link>
    )
  }

}

const mapStateToProps = (state) => {
    return {

      //Get global state to get cid, rid and login details to fetch dishes for customer/restaurant
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,

    }
}

export default Review;