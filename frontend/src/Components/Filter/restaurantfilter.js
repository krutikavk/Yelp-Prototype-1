import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';



class RestFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: '',
      methodStates: ['All', 'Curbside pickup', 'Yelp Delivery', 'Dine In'],
      nbrLatitude: '',
      nbrLongitude: ''
    }

    this.methodHandler = this.methodHandler.bind(this);

    this.handleSelectAddress = this.handleSelectAddress.bind(this);
  }

  methodHandler = (event) => {
    console.log("selected", event.target.value)

    this.setState({
      method: event.target.value
    })

    //The setTimeout is to ensure that React has finished updating the local state 
    //before we update our provider (to ensure we do not get an old state)
    setTimeout(() => {
      this.props.updateFilter(this.state)
    }, 0);
  }

  handleSelectAddress = address => {
    this.setState({searchAddress : address});
    console.log(address);

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Location found: ', latLng)

        this.setState({
          nbrLatitude : latLng.lat,
          nbrLongitude : latLng.lng,
        })

        setTimeout(() => {
          this.props.updateFilter(this.state)
        }, 0);

      })
      .catch(error => console.error('Error', error));
  }



  render() {
    return (
      <div>

        <div class="form-group">
          <label for="ooption">Filter by Service: </label>
          <select class="form-control" id="ooption" onChange = {this.methodHandler}>>
            <option value = {this.state.method}> Choose...</option>
            {this.state.methodStates.map(option => (
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

export default RestFilter;
