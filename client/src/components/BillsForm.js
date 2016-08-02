import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class BillsForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newBill.bill && !nextProps.newBill.error) {
      this.context.router.push('/');
    }
  }

  renderError(newBill) {
    if(newBill && newBill.error && newBill.error.message) {
      return (
        <div className="alert alert-danger">
          {newBill ? newBill.error.message : ''}
        </div>
      );
    } else {
      return <span></span>
    }
  }

  render() {
    const {asyncValidating, fields: { name, item, cost }, handleSubmit, submitting, newBill } = this.props;

    return (
      <div className="container">
      {this.renderError(newBill)}
      <form onSubmit={handleSubmit(this.props.createBill.bind(this))}>
        <div className={`form-group ${name.touched && name.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Name of Item*</label>
          <input type="text" className="form-control" {...name} />
          <div className="help-block">
            {name.touched ? name.error : ''}
          </div>
          <div className="help-block">
            {asyncValidating === 'name'? 'validating..': ''}
          </div>
        </div>

        <div className={`form-group ${item.touched && item.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Item type or Category*</label>
          <input type="text" className="form-control" {...item} />
          <div className="help-block">
            {item.touched ? item.error : ''}
          </div>
        </div>

        <div className={`form-group ${cost.touched && cost.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Cost of item*</label>
          <textarea className="form-control" {...cost} />
          <div className="help-block">
            {cost.touched ? cost.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary"  disabled={submitting} >Submit</button>
        <Link to="/" className="btn btn-error">Cancel</Link>
      </form>
      <br/>
      <br/>
      <br/>
      </div>

    );
  }
}

export default BillsForm;