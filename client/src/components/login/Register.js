import React from 'react';
import { reduxForm, Field } from 'redux-form';
import AuthField from './AuthField';
import validate from './validateForm';

const Register = ({ handleSubmit, handleAuthSubmit }) => {
    return(
        <form onSubmit={handleSubmit(handleSubmit(handleAuthSubmit))} >
            <Field component={AuthField} type='text' label='Username' name='username' />
            <Field component={AuthField} type='email' label='Email' name='email' />
            <Field component={AuthField} type='password' label='Password' name='password' />
            <Field component={AuthField} type='password' label='Retype password' name='retypepassword' />
            <button type='submit'>
                Register
            </button>
        </form>
    );
}

export default reduxForm({
    validate,
    form: 'authForm'
})(Register);