
import React, { Component } from 'react';
import '../../App.css';
import {
  OrderListingsProvider,
  OrderListingsConsumer
} from '../../_context/orderListingsProvider';
import Order from './order';

class OrdersDisplay extends Component {

  render() {
    return (


        <div className="container">
          <OrderListingsProvider>
            <OrderListingsConsumer>
              {function(value) {
                const { orderListings } = value
                return (
                  <ul>
                    {orderListings.map(listing => (
                      <Order order = {listing}/>
                    ))}
                  </ul>
                )
              }}
            </OrderListingsConsumer>
          </OrderListingsProvider >
        </div>

    )

  }
}


export default OrdersDisplay;
