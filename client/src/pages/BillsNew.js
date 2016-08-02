import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import BillFormContainer from '../containers/BillFormContainer.js';

class BillsNew extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="bills_new"/>
        <BillFormContainer />
      </div>
    );
  }
}


export default BillsNew;
