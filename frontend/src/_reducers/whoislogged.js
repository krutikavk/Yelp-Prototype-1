const initialWhoIsLogged = {
  //false: customer, true: restaurant
  whoIsLogged : false
}

const whoIsLoggedReducer = (state = initialWhoIsLogged, action) => {
  // eslint-disable-next-line default-case
  switch(action.type) {
  case 'CUSTOMER':
    return {whoIsLogged: false};
  case 'RESTAURANT':
    return {whoIsLogged: true};
  default:
    return state;  

  }
}

export default whoIsLoggedReducer;