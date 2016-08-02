import BillDetails from '../components/BillDetails.js';
import { fetchBill, fetchBillSuccess, fetchBillFailure, resetActiveBill, resetDeletedBill } from '../actions/bills';
import { connect } from 'react-redux';



function mapStateToProps(globalState, ownProps) {
  return { activeBill: globalState.bills.activeBill, billId: ownProps.id };
}

const mapDispatchToProps = (dispatch) => {
  return {
  	 fetchBill: (id) => {
    	dispatch(fetchBill(id))
      	.then((data) => 
          {
          	!data.error ? dispatch(fetchBillSuccess(data.payload)) : dispatch(fetchBillFailure(data.payload));
          }) 
  	 },
     resetMe: () =>{
      //clean up both activeBill(currrently open) and deletedBill(open and being deleted) states
        dispatch(resetActiveBill());
        dispatch(resetDeletedBill());
     }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BillDetails);
