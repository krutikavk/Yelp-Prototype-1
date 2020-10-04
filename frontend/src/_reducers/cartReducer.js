

const initialCartState = {
  cartContents: [],

};

const emptyCart = {
  dname: '',            //dish name
  rid: '',              //restaurant
  dquantity: '',        //dish quantity
  dprice: '',           //dish price
  ooption: '',          //Delivery/Pickup
  oaddress: ''          //Only if delivery ooption chosen
}


const cartEntry = {
  dname: 'super tasty dish 1',            //dish name
  rid: '1',              //restaurant
  dquantity: '3',        //dish quantity
  dprice: '10',           //dish price
  ooption: 'Delivery',          //Delivery/Pickup
  oaddress: 'My home'          //Only if delivery ooption chosen
}

const cartEntry2 = {
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
          let dname = action.payload.dname
          let newcontents;
          //Loose equality--match string/number
          //Q-Why search for index? 
          /* A-Because when we delete a complete entry from the cart, cart id does not 
          ** coincide with cartContents' index! 
          ** (delete entry 0 and then try to delete 1--will not find state.cartContents[cartid].dquantity)
          */
          let index = state.cartContents.findIndex(x => x.dname === dname);
          
          if (index === -1) {
        
            newcontents =  [
              ...state,
              {
                dname: action.payload.dname,            //dish name
                rid: action.payload.rid,              //restaurant
                dquantity: action.payload.dquantity,        //dish quantity
                dprice: action.payload.dprice,           //dish price
                ooption: action.payload,          //Delivery/Pickup
                oaddress: action.payload
              }
            ]
          } else {
          
            newcontents= [...state.cartContents];
            newcontents[index].dquantity++;
          }
          let newState = {
            cartContents: newcontents
          }
          return newState;
        }
        //send entry number in cart to be deleted
        case 'DELETE': {
         
          let newcontents = [...state.cartContents]
          let dname = action.payload.dname;

          //Q-Why search for index? 
          /* A-Because when we delete a complete entry from the cart, cart id does not 
          ** coincide with cartContents' index! 
          ** (delete entry 0 and then try to delete 1--will not find state.cartContents[cartid].dquantity)
          */
          let index = state.cartContents.findIndex(x => x.dname === dname);
          if(state.cartContents[index].dquantity === 1) {
            //Loose equality--match string/number
            newcontents = newcontents.filter(entry => (entry.dname !== dname))
            console.log("-->", newcontents)
            
          } else {
            newcontents= [...state.cartContents];
            newcontents[index].dquantity--;
          }

          let newState = {
            cartContents: newcontents
          }
          console.log('new state', newState)
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