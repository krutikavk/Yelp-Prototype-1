
import React, { Component } from 'react';
import '../../App.css';
import {
  OrderListingsProvider,
  OrderListingsConsumer
} from '../../_context/orderListingsProvider';
import Order from './order';
import Filter from '../Filter/orderfilter';

class OrdersDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ooption: ''
    }
  }

  render() {
    return (

        <div className="container">
          <OrderListingsProvider>
            <OrderListingsConsumer>
              {function(value) {
                const { orderListings, updateFilter } = value
                return (
                  <div>
                    <Filter updateFilter={updateFilter}/>
                    <ul>
                      {orderListings.map(listing => (
                        <Order order = {listing}/>
                      ))}
                    </ul>
                  </div>
                )
              }}
            </OrderListingsConsumer>
          </OrderListingsProvider >
        </div>

    )

  }
}


export default OrdersDisplay;
