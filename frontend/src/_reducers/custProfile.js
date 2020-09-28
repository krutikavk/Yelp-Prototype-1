const initialCustProfile = {
  cid: '',
	cemail: '',
	cpassword: '',
  cname: '',
  cphone: '',
  cabout: '',
  cjoined: '',
  cphoto: '',
  cfavrest: '',
  cfavcuisine: '',
}

const custReducer = (state = initialCustProfile, action) => {
  switch(action.type) {
	case 'UPDATE': {

	  switch(action.field) {

      case 'CEMAIL' : {
        console.log(action);
        return {
          cid: state.cid,
          cemail: action.payload,
          cpassword: state.cpassword,
          cname: state.cname,
          cphone: state.cphone,
          cabout: state.cabout,
          cjoined: state.cjoined,
          cphoto: state.cphoto,
          cfavrest: state.cfavrest,
          cfavcuisine: state.cfavcuisine,
        }
      }

      case 'CPASSWORD' : {
        console.log(action);
        return {
          cid: state.cid,
          cemail: state.cemail,
          cpassword: action.payload,
          cname: state.cname,
          cphone: state.cphone,
          cabout: state.cabout,
          cjoined: state.cjoined,
          cphoto: state.cphoto,
          cfavrest: state.cfavrest,
          cfavcuisine: state.cfavcuisine,
        }
      }
      
	  	case 'CNAME' : {
	    	console.log(action);
	    	return {
    		  cid: state.cid,
          cemail: state.cemail,
          cpassword: state.cpassword,
          cname: action.payload,
          cphone: state.cphone,
          cabout: state.cabout,
          cjoined: state.cjoined,
          cphoto: state.cphoto,
          cfavrest: state.cfavrest,
          cfavcuisine: state.cfavcuisine,
	    	}
	    }

      case 'CPHONE': {
        console.log(action);
        return {
          cid: state.cid,
          cemail: state.cemail,
          cpassword: state.cpassword,
          cname: state.cname,
          cphone: action.payload,
          cabout: state.cabout,
          cjoined: state.cjoined,
          cphoto: state.cphoto,
          cfavrest: state.cfavrest,
          cfavcuisine: state.cfavcuisine,
        }
      }

      case 'CABOUT': {
        console.log(action);
        return {
          cid: state.cid,
          cemail: state.cemail,
          cpassword: state.cpassword,
          cname: state.cname,
          cphone: state.cphone,
          cabout: action.payload,
          cjoined: state.cjoined,
          cphoto: state.cphoto,
          cfavrest: state.cfavrest,
          cfavcuisine: state.cfavcuisine,
        }
      }

      case 'CPHOTO': {
        console.log(action);
        return {
          cid: state.cid,
          cemail: state.cemail,
          cpassword: state.cpassword,
          cname: state.cname,
          cphone: state.cphone,
          cabout: state.cabout,
          cjoined: state.cjoined,
          cphoto: action.payload,
          cfavrest: state.cfavrest,
          cfavcuisine: state.cfavcuisine,
        }
      }

      case 'CFAVREST': {
        console.log(action);
        return {
          cid: state.cid,
          cemail: state.cemail,
          cpassword: state.cpassword,
          cname: state.cname,
          cphone: state.cphone,
          cabout: state.cabout,
          cjoined: state.cjoined,
          cphoto: state.cphoto,
          cfavrest: action.payload,
          cfavcuisine: state.cfavcuisine,
        }
      }

      case 'CFAVCUISINE': {
        console.log(action);
        return {
          cid: state.cid,
          cemail: state.cemail,
          cpassword: state.cpassword,
          cname: state.cname,
          cphone: state.cphone,
          cabout: state.cabout,
          cjoined: state.cjoined,
          cphoto: state.cphoto,
          cfavrest: state.cfavrest,
          cfavcuisine: action.payload,
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

export default custReducer;