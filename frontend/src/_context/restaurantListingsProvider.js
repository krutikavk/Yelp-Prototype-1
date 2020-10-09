import * as React from 'react';
import axios from 'axios';

const DefaultState = {
  restaurantListings: []
}

export class RestaurantListingsProvider extends React.Component {
  state = DefaultState

  componentDidMount() {
    //Get all restaurants
    let url = 'http://localhost:3001/restaurants';
    axios.get(url)
      .then(response => {

        if(response.status === 200){
          //When results return multiple rows, rowdatapacket object needs to be converted to JSON object again 
          //use JSON.parse(JSON.stringify()) to convert back to JSON object
          let locations = [];
          response.data.forEach(item => {
            let location = {
              name: item.rname,
              lat: item.rlatitude,
              lng: item.rlongitude
            }
            locations.push(location)
          });

          let pins = {
            restaurants: locations
          }
          this.setState({ 
            restaurantListings: response.data, 
          })
        }
      }).catch(err =>{
          console.log("No response")
    });
    
  }

  render() {
    const { children } = this.props
    const { restaurantListings } = this.state

    return (
      <RestaurantListingsContext.Provider
        value={{
          restaurantListings
        }} 
      >
        {children}
      </RestaurantListingsContext.Provider>
    )
  }
}

const RestaurantListingsContext = React.createContext(DefaultState)

export const RestaurantListingsConsumer = RestaurantListingsContext.Consumer