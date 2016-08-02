import axios from 'axios';

//Post list
export const FETCH_BILLS = 'FETCH_BILLS';
export const FETCH_BILLS_SUCCESS = 'FETCH_BILLS_SUCCESS';
export const FETCH_BILLS_FAILURE = 'FETCH_BILLS_FAILURE';
export const RESET_BILLS = 'RESET_BILLS';

//Create new bill
export const CREATE_BILL = 'CREATE_BILL';
export const CREATE_BILL_SUCCESS = 'CREATE_BILL_SUCCESS';
export const CREATE_BILL_FAILURE = 'CREATE_BILL_FAILURE';
export const RESET_NEW_BILL = 'RESET_NEW_BILL';

//Validate bill fields like Title, Categries on the server
export const VALIDATE_BILL_FIELDS = 'VALIDATE_BILL_FIELDS';
export const VALIDATE_BILL_FIELDS_SUCCESS = 'VALIDATE_BILL_FIELDS_SUCCESS';
export const VALIDATE_BILL_FIELDS_FAILURE = 'VALIDATE_BILL_FIELDS_FAILURE';
export const RESET_BILL_FIELDS = 'RESET_BILL_FIELDS';

//Fetch bill
export const FETCH_BILL = 'FETCH_BILL';
export const FETCH_BILL_SUCCESS = 'FETCH_BILL_SUCCESS';
export const FETCH_BILL_FAILURE = 'FETCH_BILL_FAILURE';
export const RESET_ACTIVE_BILL = 'RESET_ACTIVE_BILL';

//Delete bill
export const DELETE_BILL = 'DELETE_BILL';
export const DELETE_BILL_SUCCESS = 'DELETE_BILL_SUCCESS';
export const DELETE_BILL_FAILURE = 'DELETE_BILL_FAILURE';
export const RESET_DELETED_BILL = 'RESET_DELETED_BILL';



const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';
export function fetchBills() {
  const request = axios.get(`${ROOT_URL}/bills`);

  return {
    type: FETCH_BILLS,
    payload: request
  };
}

export function fetchBillsSuccess(bills) {
  return {
    type: FETCH_BILLS_SUCCESS,
    payload: bills
  };
}

export function fetchBillsFailure(error) {
  return {
    type: FETCH_BILLS_FAILURE,
    payload: error
  };
}

export function validateBillFields(props) {
  //note: we cant have /bills/validateFields because it'll match /bills/:id path!
  const request = axios.post(`${ROOT_URL}/bills/validate/fields`, props);

  return {
    type: VALIDATE_BILL_FIELDS,
    payload: request
  };
}

export function validateBillFieldsSuccess() {
  return {
    type: VALIDATE_BILL_FIELDS_SUCCESS
  };
}

export function validateBillFieldsFailure(error) {
  return {
    type: VALIDATE_BILL_FIELDS_FAILURE,
    payload: error
  };
}

export function resetBillFields() {
  return {
    type: RESET_BILL_FIELDS
  }
};


export function createBill(props, tokenFromStorage) {
  //const request = axios.bill(`${ROOT_URL}/bills`, props);
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/bills`,
    headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });

  return {
    type: CREATE_BILL,
    payload: request
  };
}

export function createBillSuccess(newPost) {
  return {
    type: CREATE_BILL_SUCCESS,
    payload: newPost
  };
}

export function createBillFailure(error) {
  return {
    type: CREATE_BILL_FAILURE,
    payload: error
  };
}

export function resetNewBill() {
  return {
    type: RESET_NEW_BILL
  }
};

export function resetDeletedBill() {
  return {
    type: RESET_DELETED_BILL
  }
};

export function fetchBill(id) {
  const request = axios.get(`${ROOT_URL}/bills/${id}`);

  return {
    type: FETCH_BILL,
    payload: request
  };
}


export function fetchBillSuccess(activePost) {
  return {
    type: FETCH_BILL_SUCCESS,
    payload: activeBill
  };
}

export function fetchBillFailure(error) {
  return {
    type: FETCH_BILL_FAILURE,
    payload: error
  };
}

export function resetActiveBill() {
  return {
    type: RESET_ACTIVE_BILL
  }
};

export function deleteBill(id, tokenFromStorage) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/bills/${id}`,
    headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });
  return {
    type: DELETE_BILL,
    payload: request
  };
}

export function deleteBillSuccess(deletedPost) {
  return {
    type: DELETE_BILL_SUCCESS,
    payload: deletedPost
  };
}

export function deleteBillFailure(response) {
  return {
    type: DELETE_BILL_FAILURE,
    payload: response
  };
}