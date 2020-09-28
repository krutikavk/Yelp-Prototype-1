const initialRestProfile = {
  rid: '',
  remail: '',
  rpassword: '',
  rname: '',
  rphone: '',
  rabout: '',
  rlocation: '',
  rlatitude: '',
  rlongitude: '',
  raddress: '',
  rcuisine: '',
  rdelivery: '',

}


const restReducer = (state = initialRestProfile, action) => {
  switch(action.type) {
    case 'UPDATE': {

      switch(action.field) {

        case 'REMAIL': {
          console.log(action);
          return {
            rid: state.rid,
            remail: action.payload,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone,
            rabout: state.rabout,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude,
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RPASSWORD': {
          console.log(action);
          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: action.payload,
            rname: state.rname,
            rphone: state.rphone,
            rabout: state.rabout,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude,
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RNAME': {
          console.log(action);
          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: action.payload,
            rphone: state.rphone,
            rabout: state.rabout,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude,
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RPHONE': {
          console.log(action);
          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: action.payload,
            rabout: state.rabout,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude,
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RABOUT': {
          console.log(action);
          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone, 
            rabout: action.payload,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude,
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RLOCATION': {
          console.log(action);
          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone, 
            rabout: state.rabout,
            rlocation: action.payload,
            rlatitude: state.rlatitude,
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RLATITUDE': {
          console.log(action);
          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone, 
            rabout: state.rabout,
            rlocation: state.rlocation,
            rlatitude: action.payload,
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RLONGITUDE': {
          console.log(action);
          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone, 
            rabout: state.rabout,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude, 
            rlongitude: action.payload,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RADDRESS': {
          console.log(action);
          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone, 
            rabout: state.rabout,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude, 
            rlongitude: state.rlongitude,
            raddress: action.payload,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RCUISINE': {
          console.log(action);
          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone, 
            rabout: state.rabout,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude, 
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: action.payload,
            rdelivery: state.rdelivery,
          }
        }

        case 'RDELIVERY': {
          console.log(action);
          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone, 
            rabout: state.rabout,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude, 
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: action.payload,
          }
        }


        default: {
          return state;
        }


      }
    }
    default: {
      return state;
    }


  }

};

export default restReducer;