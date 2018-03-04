import React from 'react';
import { reduxForm, Field } from 'redux-form';
import AuthField from './AuthField';
import Button from '../../styles/Button';
import validate from './validateForm';

const LocalRegister = ({ handleSubmit, handleAuthSubmit }) => {
    return(
        <form onSubmit={handleSubmit(handleSubmit(handleAuthSubmit))} >
            <Field component={AuthField} type='text' label='Username' name='username' />
            <Field component={AuthField} type='email' label='Email' name='email' />
            <Field component={AuthField} type='password' label='Password' name='password' />
            <Field component={AuthField} type='password' label='Retype password' name='retypepassword' />
            <Button auth type='submit'>Register</Button>
        </form>
    );
}

export default reduxForm({
    validate,
    form: 'authForm'
})(LocalRegister);