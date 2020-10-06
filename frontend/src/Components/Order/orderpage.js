import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import classnames from 'classnames';
import {connect} from 'react-redux';
import '../../App.css';


class Orderpage extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.editOrder = this.editOrder.bind(this);

  }

  editOrder = (event) => {

  }

  componentDidMount() {

  }

  render() {
    let redirectVar = null;
    let id = '';
    let type = '';

    if(this.props.isLogged === false) {
      //customer login
      redirectVar = <Redirect to="/login"/>
    } 
    console.log("whoIsLogged", this.props.whoIsLogged)

    return (


      <div>
        <div class="container-fluid style={{height: 100}}">
          <div class="row">
            <div class="col-12 mt-3">
              <div class="card">
                <div class="card-horizontal">
                  <div class="card-body">
                      <p class="card-text">Order ID: {this.props.location.query.oid}</p>
                      <p class="card-text">Restaurant ID: {this.props.location.query.rid}</p>
                      <p class="card-text">Service: {this.props.location.query.ooption}</p>
                      <p class="card-text">Status: {this.props.location.query.ostatus}</p>
                      <p class="card-text">Order Type: {this.props.location.query.otype}</p>
                      <p class="card-text">Time placed: {this.props.location.query.otime}</p>
                  </div>
                </div>
                <div class="card-footer">
                  <button disabled={(this.props.whoIsLogged === false)} id="btnLogin" className="btn btn-danger" onClick={this.editOrder}>Edit Order</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}



const mapStateToProps = (state) => {
    return {
      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,
    }
}

//const mapDispatchToProps = (dispatch) => { since this does not call a function directly it cannot be a function

export default connect(mapStateToProps)(Orderpage);