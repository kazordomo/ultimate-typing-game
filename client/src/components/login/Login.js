import React from 'react';
import { reduxForm, Field } from 'redux-form';
import AuthField from './AuthField';
import Button from '../../styles/Button';

const Login = ({ handleSubmit, handleAuthSubmit }) => {
    return(
        <form onSubmit={handleSubmit(handleSubmit(handleAuthSubmit))} >
            <Field component={AuthField} type='text' label='Username' name='username' />
            <Field component={AuthField} type='password' label='Password' name='password' />
            <Button auth type='submit'>Login</Button>
        </form>
    );
}

export default reduxForm({
    form: 'authForm'
})(Login);