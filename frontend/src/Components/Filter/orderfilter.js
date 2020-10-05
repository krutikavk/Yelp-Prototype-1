import React, { Component } from 'react';;


class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ooption: '',
      ooptionStates: ['All', 'Pickup', 'Delivery']
    }

    this.ooptionHandler = this.ooptionHandler.bind(this);
  }

  ooptionHandler = (event) => {
    console.log("selected", event.target.value)

    this.setState({
      ooption: event.target.value
    })
    console.log("State bf: ", this.state)

    setTimeout(() => {
      this.props.updateFilter(this.state)
    }, 0);
    console.log("State af: ", this.state)
  }

  /*

    <div class="form-group">
          <label for="ostatus">Ostatus: </label>
          <select class="form-control" id="ostatus">
            <option>Pickup</option>
            <option>Order received</option>
            <option>Preparing</option>
            <option>Pickup ready</option>
            <option>Picked up</option>
            <option>On the way</option>
            <option>Delivered</option>
          </select>
        </div>

        <div class="form-group">
          <label for="otype">Otype: </label>
          <select class="form-control" id="otype">
            <option>New</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>

  */
  render() {
    return (
      <div>
        <div class="form-group">
          <label for="ooption">Ooption: </label>
          <select class="form-control" id="ooption" onChange = {this.ooptionHandler}>>
            <option value = {this.state.ooption}> Choose...</option>
            {this.state.ooptionStates.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}

export default Filter;