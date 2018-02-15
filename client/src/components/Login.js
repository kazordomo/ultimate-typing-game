import React from 'react';
import { reduxForm, Field } from 'redux-form';
import styled, { css } from 'react-emotion';
import Wrapper from '../styles/Wrapper';
import AuthField from './AuthField';

//TODO: use css grid to center things.

const authArea = css({
    width: '500px'
});

const loginAhref = css({
    display: 'block',
    width: '100%',
    // height: '70px',
    color: '#000000',
    fontSize: '40px',
    border: '1px solid #FFFFFF',
    borderRadius: '4px',
    textDecoration: 'none'
});

const ahrefWrapper = css({
    width: '500px',
    margin: '15px 0px',
    backgroundColor: 'pink'
});

const BrandIcon = styled('i')({
    marginRight: '10px',
    fontSize: '40px'
});

//TODO: refacto from class component.
const Login = ({ handleSubmit, handleAuthSubmit }) => {
    return(
        <Wrapper>
            <div className={authArea}>
                <div className={ahrefWrapper}>
                    <a href='/auth/google' className={loginAhref}><BrandIcon className='fab fa-google-plus-square'></BrandIcon>Login With Google</a>
                </div>
                <div className={ahrefWrapper}>
                    <a href='/auth/facebook' className={loginAhref}><BrandIcon className='fab fa-facebook-square'></BrandIcon>Login Wih Facebook</a>
                </div>
                <form onSubmit={handleSubmit(handleSubmit(handleAuthSubmit))} >
                    <Field component={AuthField} type='text' label='Username' name='username' />
                    <Field component={AuthField} type='password' label='Password' name='password' />
                    <button type='submit'>
                        Register
                    </button>
                </form>
            </div>
        </Wrapper>
    );
}

// function validate(values) {

// }

export default reduxForm({
    // validate,
    form: 'authForm'
})(Login);