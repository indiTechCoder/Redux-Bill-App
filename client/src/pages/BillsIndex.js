import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import BillsListContainer from '../containers/BillsListContainer.js';

class BillsIndex extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="bills_index"/>
        <BillsListContainer />
      </div>
    );
  }
}


export default BillsIndex;
