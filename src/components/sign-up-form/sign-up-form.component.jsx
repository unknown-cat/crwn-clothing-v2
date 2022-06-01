import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  cofirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, cofirmPassword } = formFields;

  console.log(formFields);

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== cofirmPassword)
      return alert('your password does not match');

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormField();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use')
        return alert('Cannot create user, email already in use');
      console.log('user creation encountered an error ', error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <section className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          onChange={handleChange}
          type='text'
          name='displayName'
          value={displayName}
          required
        />

        <FormInput
          label='Email'
          onChange={handleChange}
          type='email'
          name='email'
          value={email}
          required
        />

        <FormInput
          label='Password'
          onChange={handleChange}
          type='password'
          name='password'
          value={password}
          title='Enter an password consisting of 6-12 hexadecimal digits'
          pattern='[0-9a-fA-F]{4,8}'
          minLength='6'
          maxLength='12'
          required
          autoComplete='off'
        />

        <FormInput
          label='Confirm Password'
          onChange={handleChange}
          type='password'
          name='cofirmPassword'
          value={cofirmPassword}
          required
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </section>
  );
};

export default SignUpForm;
