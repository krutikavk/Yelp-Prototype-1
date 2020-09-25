const initialCustProfile = {
	cname: '',
	cemail: '',
	cpassword: '',
}

const custReducer = (state = initialCustProfile, action) => {
  switch(action.type) {
	case 'UPDATE': {

	  switch(action.field) {
	  	case 'CNAME' : {
	    	console.log(action);
	    	return {
    		  cname  : action.payload,
    		  cemail : state.cemail,
    		  cpassword  : state.cpassword
	    	}
	    }
	    case 'CPASSWORD' : {
	    	console.log(action);
	    	return {
	    	  cname  : state.cname,
    		  cemail : state.cemail,
    		  cpassword  : action.payload
	    	}
	    }
	    case 'CEMAIL' : {
	    	console.log(action);
	    	return {
	    	  cname  : state.cname,
    		  cemail : action.payload,
    		  cpassword  : state.cpassword
	    	}
	    }

	    default : {
	    	return state;
	    }
	  }
	}

	default:
      return state
  }
  
}

export default custReducer