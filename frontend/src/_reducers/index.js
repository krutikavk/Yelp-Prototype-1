import loggedReducer from './isLogged';
import custReducer from './custProfile'
import {combineReducers} from 'redux';

const allReducer = combineReducers({
	//equivalent: counterReducer: counterReducer
	//JS6 shorthand: counterReducer
	isLogged: loggedReducer,
	custProfile: custReducer
})


export default allReducer;