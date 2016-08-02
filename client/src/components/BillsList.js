import React, { Component } from 'react';
import { Link } from 'react-router';

class BillsList extends Component {
  componentWillMount() {
    this.props.fetchBills();
  }

  renderBills(bills) {
    return bills.map((bill) => {
      return (
        <li className="list-group-item" key={bill._id}>
          <Link style={{color:'black'}} to={"bills/" + bill._id}>
            <h3 className="list-group-item-heading">{bill.name}</h3>
            <h3 className="list-group-item-heading">{bill.cost}</h3>
            <h3 className="list-group-item-heading">{bill.item}</h3>
          </Link>
        </li>
      );
    });
  }

  render() {
    const { bills, loading, error } = this.props.billsList;
    console.log(bills);
    if(loading) {
      return <div className="container"><h1>Bills</h1><h3>Loading...</h3></div>      
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <h1>Bills</h1>
        <ul className="list-group">
          {this.renderBills(bills)}
        </ul>
      </div>
    );
  }
}


export default BillsList;
