const initialCartState = {
  cartContents: []
};

const emptyCart = {
  cartid: '',
  dname: '',            //dish name
  rid: '',              //restaurant
  dquantity: '',        //dish quantity
  dprice: '',           //dish price
  ooption: '',          //Delivery/Pickup
  oaddress: ''          //Only if delivery ooption chosen
}


const cartEntry = {
  cartid: 0,
  dname: 'super tasty dish 1',            //dish name
  rid: '1',              //restaurant
  dquantity: '3',        //dish quantity
  dprice: '10',           //dish price
  ooption: 'Delivery',          //Delivery/Pickup
  oaddress: 'My home'          //Only if delivery ooption chosen
}

const cartEntry2 = {
  cartid: 1,
  dname: 'super tasty dish 2',            //dish name
  rid: '1',              //restaurant
  dquantity: '5',        //dish quantity
  dprice: '8',           //dish price
  ooption: 'Pickup',          //Delivery/Pickup
  oaddress: 'My home'          //Only if delivery ooption chosen
}

initialCartState.cartContents.push(cartEntry);
initialCartState.cartContents.push(cartEntry2);



const cartReducer = (state = initialCartState, action) => {
  switch(action.type) {
    case 'UPDATECART': {
      switch(action.field) {
        case 'ADD': {
          //Add to cart
          //let newcartid = state.length + 1;
          const cartEntry = action.payload;
          let newContents = [...state.cartContents]
          newContents.push(cartEntry);
          let newState = {
            cartContents: newContents
          }
          return newState;
        }
        //send entry number in cart to be deleted
        case 'DELETE': {
          let cartid = action.payload
          console.log("cartreducer id", cartid)
          let newcontents = [...state.cartContents]
          console.log(newcontents)
          if(state.cartContents[cartid].dquantity === 1) {
            newcontents = newcontents.filter(entry => (entry.cartid != cartid))
            console.log("-->", newcontents)
            
          } else {
            newcontents= [...state.cartContents];
            newcontents[cartid].dquantity--;
          }
          let newState = {
            cartContents: newcontents
          }

          return newState;
        }
        case 'ORDER': {
          let temp = initialCartState;
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