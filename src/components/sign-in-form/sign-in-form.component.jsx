import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormField();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password');
          break;
        case 'auth/user-not-found':
          alert('no such user');
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <section className='sign-in-container'>
      <h2>Alreade have an account?</h2>
      <span>Sign ip with your email and password</span>
      <form onSubmit={handleSubmit}>
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
          title='Enter an password consisting of 6-20 hexadecimal digits'
          pattern='[0-9a-fA-F]{4,8}'
          minLength='6'
          maxLength='20'
          required
          autoComplete='off'
        />

        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button onClick={signInWithGoogle} buttonType='google' type='button'>
            Google Sign In
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SignInForm;
