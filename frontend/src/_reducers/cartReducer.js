const initialCartState = [];
const emptyCart = {
  cartid: '',
  dname: '',            //dish name
  rid: '',              //restaurant
  dquantity: '',        //dish quantity
  dprice: '',           //dish price
  ooption: '',          //Delivery/Pickup
  oaddress: ''          //Only if delivery ooption chosen
}


const cartReducer = (state = initialCartState, action) => {
  switch(action.type) {
    case 'UPDATECART': {
      switch(action.field) {
        case 'ADD': {
          //Add to cart
          //let newcartid = state.length + 1;
          const cartEntry = action.payload;
          let newState = [...initialCartState]
          newState.push(cartEntry);
          return newState;
        }
        //send entry number in cart to be deleted
        case 'DELETE': {
          let cartId = action.payload
          let newState;
          if(state[cartId].dquantity === 1) {
            newState = state.filter(entry => (entry.cartId !== cartId))
            for(let i = cartId; i <= newState.length; i++) {
              newState.cartId--;
            }
          } else {
            newState = [...state];
            newState[cartId].dquantity--;
          }

          return newState;
        }
        case 'ORDER': {
          let temp = [];
          return temp;

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
}

export default cartReducer;