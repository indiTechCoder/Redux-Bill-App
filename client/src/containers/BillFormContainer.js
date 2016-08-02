import BillsForm from '../components/BillsForm.js';
import {
  createBill, createBillSuccess, createBillFailure, resetNewBill, validateBillFields, validateBillFieldsSuccess, validateBillFieldsFailure
}
from '../actions/bills';
import {
  reduxForm
}
from 'redux-form';

//Client side validation
function validate(values) {
  const errors = {};

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter a name';
  }
  if (!values.item || values.item.trim() === '') {
    errors.item = 'Enter item';
  }
  if (!values.cost || values.cost.trim() === '') {
    errors.cost = 'Enter cost of item';
  }

  return errors;
}

//For instant async server validation
const asyncValidate = (values, dispatch) => {

  return new Promise((resolve, reject) => {

    dispatch(validateBillFields(values))
      .then((response) => {
        let data = response.payload.data;
        //if status is not 200 or any one of the fields exist, then there is a field error
        if (response.payload.status != 200 || data.name || data.cost || data.item) {
          //let other components know of error by updating the redux` state
          dispatch(validateBillFieldsFailure(response.payload));
          reject(data); //this is for redux-form itself
        } else {
          //let other components know that everything is fine by updating the redux` state
          dispatch(validateBillFieldsSuccess(response.payload)); //ps: this is same as dispatching RESET_POST_FIELDS
          resolve(); //this is for redux-form itself
        }
      });
  });
};

//For any field errors upon submission (i.e. not instant check)
const validateAndCreateBill = (values, dispatch) => {

  return new Promise((resolve, reject) => {


    let token = sessionStorage.getItem('jwtToken');
   // token = 'qedwc';
    if (!token || token === '') { //if there is no token, dont bother,
      let data = {data: {message: 'Please Sign In'}};//axios like error
      dispatch(createBillFailure(data)); // but let other comps know
      reject(data); //this is for redux-form itself
      return;
    }
    dispatch(createBill(values, token))
      .then((response) => {
        let data = response.payload.data;
        //if any one of these exist, then there is a field error 
        if (response.payload.status != 200) {
          //let other components know of error by updating the redux` state
          dispatch(createBillFailure(response.payload));
          reject(data); //this is for redux-form itself
        } else {
          //let other components know that everything is fine by updating the redux` state
          dispatch(createBillSuccess(response.payload));
          alert('bill sucessfully added ....');
          resolve(); //this is for redux-form itself
        }
      });

  });
};



const mapDispatchToProps = (dispatch) => {
  return {
    createBill: validateAndCreateBill,
    resetMe: () => {
      dispatch(resetNewBill());
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    newBill: state.bills.newBill
  };
}


// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'BillsNewForm',
  fields: ['name', 'item', 'cost'],
  asyncValidate,
  asyncBlurFields: ['name'],
  validate
}, mapStateToProps, mapDispatchToProps)(BillsForm);