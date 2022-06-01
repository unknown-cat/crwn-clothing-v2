import React from 'react';

import SignUpForm from '../sign-up-form/sign-up-form.component';
import SignInForm from '../sign-in-form/sign-in-form.component';

import './authentication.styles.scss';

const Authentication = () => {
  return (
    <section className='authentication-container'>
      <SignInForm />
      <SignUpForm />
    </section>
  );
};

export default Authentication;
