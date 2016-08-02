import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteBill } from '../actions/bills';
import Header from '../containers/HeaderContainer.js';
import BillDetailsContainer from '../containers/BillDetailsContainer.js';

class BillsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onDeleteClick() {
    this.props.deleteBill(this.props.params.id)
      .then(() => { this.context.router.push('/'); });
  }

  render() {
    return (
      <div className='container'>
        <Header type="bills_show" postId={this.props.params.id}/>
        <BillDetailsContainer id={this.props.params.id}/>
      </div>
    );
  }
}

export default BillsShow;
