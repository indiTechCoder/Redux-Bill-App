import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class BillDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchBill(this.props.billId);
  }


  render() {
    const { bill, loading, error } = this.props.activeBill;
    if (loading) {
      return <div className="container">Loading...</div>;
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!bill) {
      return <span />
    }

    return (
      <div className="container">
        <h3>{bill.title}</h3>
        <h6>Categories: {bill.categories}</h6>
        <p>{bill.content}</p>
      </div>
    );
  }
}

export default BillDetails;
