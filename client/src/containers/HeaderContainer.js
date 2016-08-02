import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBills, resetDeletedBill, deleteBill, deleteBillSuccess, deleteBillFailure } from '../actions/bills';
import { logoutUser } from '../actions/users';
import Header from '../components/header.js';



function mapStateToProps(state) {
  return { 
    deletedBill: state.bills.deletedBill,
    authenticatedUser: state.user.status === 'authenticated' ? state.user.user : null,
    user: state.user
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	 onDeleteClick: () => {
      let token = sessionStorage.getItem('jwtToken');
      if (!token || token === '') { //if there is no token, dont bother,
          let data = {data: {message: 'Please Sign In'}};//axios like error
          dispatch(deleteBillFailure(data)); // but let other comps know
          return;
      }

    	dispatch(deleteBill(ownProps.billId, token))
      	.then((response) => {
            !response.error ? dispatch(deleteBillSuccess(response.payload)) : dispatch(deleteBillFailure(response.payload));
          });
  	 },
     resetMe: () =>{
        dispatch(resetDeletedBill());
     },

     logout: () => {
         sessionStorage.removeItem('jwtToken');
         dispatch(logoutUser());
     }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
