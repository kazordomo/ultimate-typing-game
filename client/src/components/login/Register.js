import React from 'react';
import { reduxForm, Field } from 'redux-form';
import AuthField from './AuthField';

const Register = ({ handleSubmit, handleAuthSubmit }) => {

    // const { handleSubmit, handleAuthSubmit } = this.props;

    return(
        <form onSubmit={handleSubmit(handleSubmit(handleAuthSubmit))} >
            <Field component={AuthField} type='text' label='Username' name='username' />
            <Field component={AuthField} type='password' label='Password' name='password' />
            <button type='submit'>
                Register
            </button>
        </form>
    );
}

export default reduxForm({
    // validate,
    form: 'authForm'
})(Register);