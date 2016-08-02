import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import SignInFormContainer from '../containers/SignInFormContainer.js';
import Footer from './Footer';

class SignIn extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="bills_new"/>
        <SignInFormContainer />
        <Footer/>
        
      </div>
    );
  }
}


export default SignIn;
