import React,{Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {update, login, logout} from '../../_actions';
import logo from './yelp-logo.jpg';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';




//create the Navbar Component
class Navbar extends Component {
  constructor(props){
    super(props);

    this.state = {
        searchBy: '',
        searchStates: ['Location', 'Cuisine', 'Delivery Type', 'Dish Name'],
        searchTxt: '',
        searchAddress : '',
        searchLat: 0.0,
        searchLng: 0.0,
        cuisineType: '',
        cuisineStates: ['Mexican', 'Italian', 'French', 'Indian'],
        deliveryType: '',
        deliveryStates: ['Pick up', 'Home Delivery', 'Curbside'],
                        
      };  
    
    this.handleLogout = this.handleLogout.bind(this);

    this.searchByHandler     = this.searchByHandler.bind(this);
    this.searchTextHandler   = this.searchTextHandler.bind(this);
    this.cuisineTypeHandler  = this.cuisineTypeHandler.bind(this);
    this.deliveryTypeHandler  = this.deliveryTypeHandler.bind(this);
    this.getPlaceHolder      = this.getPlaceHolder.bind(this);

    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSelectAddress = this.handleSelectAddress.bind(this);

    this.submitSearch = this.submitSearch.bind(this)

  }

  searchByHandler = (event) => {
    console.log("selected", event.target.value)
    this.setState({
      searchBy: event.target.value
      })
  }

  searchTextHandler = (event) => {
    this.setState({
      searchTxt: event.target.value
    })
  }

  cuisineTypeHandler = (event) => {
    console.log("Cuisine type", event.target.value)
    this.setState({
      cuisineType: event.target.value
      })
  }

  deliveryTypeHandler = (event) => {
    console.log("delivert type", event.target.value)
    this.setState({
      deliveryType: event.target.value
      })
  }

  getPlaceHolder() {
    if (this.state.searchBy === 'Location') return 'Restaurant Name'
    if (this.state.searchBy === 'Dish Name') return 'Enter Dish Name'
    return 'Restaurants'
  }

  handleAddressChange = (address) => {
    this.setState({
      searchAddress: address
    })
  }

  handleSelectAddress = address => {
    this.setState({searchAddress : address});
    console.log(address);

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Location found: ', latLng)
        this.setState({
          searchLat : latLng.lat,
          searchLng : latLng.lng
        })
      })
      .catch(error => console.error('Error', error));
  }



  handleLogout = () => {
      //cookie.remove('cookie', { path: '/' })
      this.props.update('CID', '')
      this.props.update('CEMAIL', '')
      this.props.update('CPASSWORD', '')
      this.props.update('CNAME', '')
      this.props.update('CPHONE', '')
      this.props.update('CABOUT', '')
      this.props.update('CJOINED', '')
      this.props.update('CPHOTO', '')
      this.props.update('CFAVREST', '')
      this.props.update('CFAVCUISINE', '')

      this.props.update('RID', '')
      this.props.update('REMAIL', '')
      this.props.update('RPASSWORD', '')
      this.props.update('RNAME', '')
      this.props.update('RPHONE', '')
      this.props.update('RABOUT', '')
      this.props.update('RLOCATION', '')
      this.props.update('RLATITUDE', '')
      this.props.update('RLONGITUDE', '')
      this.props.update('RADDRESS', '')
      this.props.update('RCUISINE', '')
      this.props.update('RDELIVERY', '')

      this.props.logout()

  }


  submitSearch = (event) => {
    event.preventDefault();
    //set the with credentials to true
    axios.defaults.withCredentials = true;

    //searchStates: ['Location', 'Cuisine', 'Delivery Type', 'Dish Name']
    switch(this.state.searchBy) {

      case 'Location': {


        break;
      }

      case 'Cuisine': {


        break;
      }

      case 'Delivery Type': {


        break;
      }

      case 'Dish Name': {


        break;
      }

      default: 
        break;

    }

  }


  render(){
      //if Cookie is set render Logout Button

    let navLogin = null;
    if(this.props.isLogged === true){
        console.log("Login is true");
        navLogin = (
              <Link className="nav-link" to="/login" onClick = {this.handleLogout}>Logout</Link>
        ); 
    }else{
        navLogin = (
              <Link className="nav-link" to="/login">Login</Link>
        )
    }


    let links = null;
    let dashboard = null;

    //let cart = null;
    let cart = (
        <Link className="nav-link" to="/cart">
          <i className="fa fa-shopping-cart" style={{'font-size':36}}></i>
        </Link>
      )
    let menu = null;
    /*
    let search = (
      <li className="nav-item">
        <form className="form-inline" action="/" >
          <input className="form-control mr-sm-2" type="text" placeholder="Restaurants" ></input>
          <input className="form-control mr-sm-2" type="text" placeholder="Location" ></input>
          <Link to='/restaurants'><button className="btn btn-danger" type="submit">Search</button></Link>
        </form>
      </li>
    )
    */


    let search = (
      <li className="nav-item">
        <form className="form-inline" action="/" >
          <select class="form-control" id="searchBy" onChange = {this.searchByHandler}>>
            <option value = {this.state.searchBy}> Search By...</option>
            {this.state.searchStates.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
            ))}
          </select>


          {(this.state.searchBy !== 'Cuisine' &&
            this.state.searchBy !== 'Delivery Type') ?
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder={this.getPlaceHolder()}
            onChange={this.searchTextChangeHandler}>
          </input>
          : ''}


          {this.state.searchBy === 'Cuisine' ?
          <select class="form-control" id="cuisineType" onChange = {this.cuisineTypeHandler}>>
            <option value = {this.state.cuisineType}> Cuisines...</option>
            {this.state.cuisineStates.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
            ))}
          </select>
          : ''}


          {this.state.searchBy === 'Delivery Type' ?
          <select class="form-control" id="deliveryType" onChange = {this.deliveryTypeHandler}>>
            <option value = {this.state.deliveryType}> Delivery Type...</option>
            {this.state.deliveryStates.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
            ))}
          </select>
          : ''}


          <PlacesAutocomplete
          value={this.state.searchAddress}
          onChange={this.handleAddressChange}
          onSelect={this.handleSelectAddress}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'form-control mr-sm-0',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

          <button
            onClick={this.submitSearch}
            className="btn btn-success btn-sm"
            type="submit">
              Search
          </button>
        </form>
      </li>
    )

    
    

    if(this.props.isLogged === true && this.props.whoIsLogged === false) {
      //customer login
      dashboard = <Link className="nav-link" to="/customer/profile">Profile</Link>
      /*
      cart = (
        <Link className="nav-link" to="/cart">
          <i className="fa fa-shopping-cart" style={{'font-size':36}}></i>
        </Link>
      )
      */

    } else if (this.props.isLogged === true && this.props.whoIsLogged === true) {
      //restaurant login
      dashboard = <Link className="nav-link" to="/restaurant">Profile</Link>
      search = null;
      menu = <Link className="nav-link" to="/dishes">Menu</Link>
      cart = null;
    }
    
    
    return(

      <div>
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
          <Link to="/"><img src={logo}></img></Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              {dashboard}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">Orders</Link>
            </li>
            <li className="nav-item">
              {menu}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events">Events</Link>
            </li>
          </ul>
            
          <ul className="navbar-nav mx-auto">
            {search}
          </ul>
          
          <ul className="navbar-nav ml-auto">
            {cart}
            <li className="nav-item">
              {navLogin}
            </li>
          </ul>
        </nav>
      </div>
      
    )
  }
}

//importedname: state.reducer.statename

const mapStateToProps = (state) => {
    return {
      cid: state.custProfile.cid,
      cemail: state.custProfile.cemail,
      cpassword: state.custProfile.cpassword,
      cname: state.custProfile.cname,
      cphone: state.custProfile.cphone,
      cabout: state.custProfile.cabout,
      cjoined: state.custProfile.cjoined,
      cphoto: state.custProfile.cphoto,
      cfavrest: state.custProfile.cfavrest,
      cfavcuisine: state.custProfile.cfavcuisine,

      rid: state.restProfile.rid,
      remail: state.restProfile.remail,
      rpassword: state.restProfile.rpassword,
      rname: state.restProfile.rname,
      rphone: state.restProfile.rphone,
      rabout: state.restProfile.rabout,
      rlocation: state.restProfile.rlocation,
      rlatitude: state.restProfile.rlatitude,
      rlongitude: state.restProfile.rlongitude,
      raddress: state.restProfile.raddress,
      rcuisine: state.restProfile.rcuisine,
      rdelivery: state.restProfile.rdelivery,

      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,
    }
}

//const mapDispatchToProps = (dispatch) => { since this does not call a function directly it cannot be a function

function mapDispatchToProps(dispatch) {  
  return {
    update : (field, payload) => dispatch(update(field, payload)),
    login: () => dispatch(login()),
    logout: () => dispatch(logout())
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

//export default Navbar;