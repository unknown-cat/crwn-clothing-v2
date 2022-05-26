import React, { useState } from 'react';

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <section>
      <h2>Sign up with your email and password</h2>
      <form onSubmit={() => {}}>
        <label>Display Name</label>
        <input
          onChange={handleChange}
          type='text'
          name='displayName'
          value={displayName}
          required
        />

        <label>Email</label>
        <input
          onChange={handleChange}
          type='email'
          name='email'
          value={email}
          required
        />

        <label>Password</label>
        <input
          onChange={handleChange}
          type='password'
          name='password'
          value={password}
          required
        />

        <label>Confirm Password</label>
        <input
          onChange={handleChange}
          type='password'
          name='cofirmPassword'
          value={cofirmPassword}
          required
        />

        <button type='section'>Sign Up</button>
      </form>
    </section>
  );
};

export default SignUpForm;
