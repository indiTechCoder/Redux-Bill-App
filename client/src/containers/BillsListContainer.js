import { connect } from 'react-redux'
import { fetchBills, fetchBillsSuccess, fetchBillsFailure } from '../actions/bills';

import BillsList from '../components/BillsList';


const mapStateToProps = (state) => {
  return { 
    billsList: state.bills.billsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBills: () => {
      dispatch(fetchBills()).then((response) => {
            !response.error ? dispatch(fetchBillsSuccess(response.payload)) : dispatch(fetchBillsFailure(response.payload));
          });
    }
  }
}


const BillsListContainer = connect(mapStateToProps, mapDispatchToProps)(BillsList)

export default BillsListContainer
