import React, {Component} from 'react';

import classnames from 'classnames'

class Order extends Component {
    render() {
      const columnClasses = classnames('column', 'col-4', 'col-xs-12')
      const cardClasses = classnames('card')
      return(
        <div className={columnClasses} style={{margin: '1rem 0' }}>
          <div className={cardClasses}>
            <div className="card-header">
              <div className="card-title-h5">{this.props.order.rid}</div>
            </div>
            <div className="card-body">
              <div className="card-title-h5">{this.props.order.oid}</div>
            </div>
            <div className="card-footer">
              <div className="card-title-h5">{this.props.order.ostatus}</div>
            </div>
            <div className="card-footer">
              <div className="card-title-h5">{this.props.order.ooption}</div>
            </div>
            <div className="card-footer">
              <div className="card-title-h5">{this.props.order.otype}</div>
            </div>
          </div>
        </div>
      )
    }
}
export default Order;