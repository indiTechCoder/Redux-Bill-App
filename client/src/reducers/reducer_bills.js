import {
	FETCH_Bills, FETCH_Bills_SUCCESS, FETCH_Bills_FAILURE, RESET_Bills,
	FETCH_Bill, FETCH_Bill_SUCCESS,  FETCH_Bill_FAILURE, RESET_ACTIVE_Bill,
	CREATE_Bill, CREATE_Bill_SUCCESS, CREATE_Bill_FAILURE, RESET_NEW_Bill,
	DELETE_Bill, DELETE_Bill_SUCCESS, DELETE_Bill_FAILURE, RESET_DELETED_Bill,
  VALIDATE_Bill_FIELDS,VALIDATE_Bill_FIELDS_SUCCESS, VALIDATE_Bill_FIELDS_FAILURE, RESET_Bill_FIELDS
} from '../actions/bills';


	const INITIAL_STATE = { billsList: {bills: [], error:null, loading: false},  
							newBill:{bill:null, error: null, loading: false}, 
							activeBill:{bill:null, error:null, loading: false}, 
							deletedBill: {bill: null, error:null, loading: false},
						};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_Bills:// start fetching bills and set loading = true
  	return { ...state, billsList: {bills:[], error: null, loading: true} }; 
  case FETCH_Bills_SUCCESS:// return list of bills and make loading = false
    return { ...state, billsList: {bills: action.payload.data, error:null, loading: false} };
  case FETCH_Bills_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, billsList: {bills: [], error: error, loading: false} };
  case RESET_Bills:// reset billList to initial state
    return { ...state, billsList: {bills: [], error:null, loading: false} };

  case FETCH_Bill:
    return { ...state, activeBill:{...state.activeBill, loading: true}};
  case FETCH_Bill_SUCCESS:
    return { ...state, activeBill: {bill: action.payload.data, error:null, loading: false}};
  case FETCH_Bill_FAILURE:
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, activeBill: {bill: null, error:error, loading:false}};
  case RESET_ACTIVE_Bill:
    return { ...state, activeBill: {bill: null, error:null, loading: false}};

  case CREATE_Bill:
  	return {...state, newBill: {...state.newBill, loading: true}}
  case CREATE_Bill_SUCCESS:
  	return {...state, newBill: {bill:action.payload.data, error:null, loading: false}}
  case CREATE_Bill_FAILURE:
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
  	return {...state, newBill: {bill:null, error:error, loading: false}}
  case RESET_NEW_Bill:
  	return {...state,  newBill:{bill:null, error:null, loading: false}}


  case DELETE_Bill:
   	return {...state, deletedBill: {...state.deletedBill, loading: true}}
  case DELETE_Bill_SUCCESS:
  	return {...state, deletedBill: {bill:action.payload.data, error:null, loading: false}}
  case DELETE_Bill_FAILURE:
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
  	return {...state, deletedBill: {bill:null, error:error, loading: false}}
  case RESET_DELETED_Bill:
  	return {...state,  deletedBill:{bill:null, error:null, loading: false}}

  case VALIDATE_Bill_FIELDS:
    return {...state, newBill:{...state.newBill, error: null, loading: true}}
  case VALIDATE_Bill_FIELDS_SUCCESS:
    return {...state, newBill:{...state.newBill, error: null, loading: false}}
  case VALIDATE_Bill_FIELDS_FAILURE:
    let result = action.payload.data;
    if(!result) {
      error = {message: action.payload.message};
    } else {
      error = {title: result.title, categories: result.categories, description: result.description};
    }
    return {...state, newBill:{...state.newBill, error: error, loading: false}}
  case RESET_Bill_FIELDS:
    return {...state, newBill:{...state.newBill, error: null, loading: null}}
  default:
    return state;
  }
}
