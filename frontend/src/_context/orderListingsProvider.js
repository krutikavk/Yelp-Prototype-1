import * as React from 'react';
import axios from 'axios';

const DefaultState = {
  orderListings: [],
  filter: {}
}

const OrderListingsContext = React.createContext(DefaultState)

export class OrderListingsProvider extends React.Component {
  
  constructor(props){
    super(props)
    this.state = DefaultState
  }

  componentDidMount() {
    //change this to axios call
    let url = 'http://localhost:3001/orders/restaurants/' + 1
    console.log("Component mounted");

    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.get(url)
      .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
          this.setState({ orderListings: response.data })
        }
      }).catch(err =>{
        //alert("Error fetching orders")
        console.log("Error fetching orders")
    });
  }

  updateFilter = filter => {
    this.setState({
      filter: filter
    })
  }

  render() {
    const { children } = this.props
    const { orderListings, filter } = this.state

    console.log("updateFilter: ", filter)

    return (
      <OrderListingsContext.Provider
        value={{
          orderListings,
          updateFilter: this.updateFilter
        }}
      >
        {children}
      </OrderListingsContext.Provider>
    )
  }
}


export const OrderListingsConsumer = OrderListingsContext.Consumer