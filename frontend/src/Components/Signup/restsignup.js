import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';

import {Redirect} from 'react-router-dom';

const validText = RegExp('[A-Za-z0-9]+')
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Restsignup extends Component {
  constructor(props) {
	  super(props);
  }

	render (){
    return (
		  <h2> Rest signup page</h2>
    )
  }

}

export default Restsignup;


