import React from 'react';
import styled, { css } from 'react-emotion';
import Wrapper from '../styles/Wrapper';
import Title from '../styles/Title';

//TODO: use css grid to center things.

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

const Login = () => {
    return(
        <Wrapper>
            <div>
                <Title>Ultimate Typing Game</Title>
            </div>
            <div className={ahrefWrapper}>
                <a href="/auth/google" className={loginAhref}><BrandIcon className="fab fa-google-plus-square"></BrandIcon>Login With Google</a>
            </div>
            <div className={ahrefWrapper}>
                <a href='/auth/facebook' className={loginAhref}><BrandIcon className="fab fa-facebook-square"></BrandIcon>Login Wih Facebook</a>
            </div>
        </Wrapper>
    );
}

export default Login;