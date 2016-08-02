import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import SignUpFormContainer from '../containers/SignUpFormContainer.js';
import Footer from './Footer';

class SignUp extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="bills_new"/>
        <SignUpFormContainer />
            <Footer/>
      </div>
    );
  }
}


export default SignUp;
