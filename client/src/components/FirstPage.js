import React from 'react';
import Login from './Login';
import Wrapper from '../styles/Wrapper';
import Title from '../styles/Title';

const FirstPage = () => {
    return(
        <Wrapper>
            <Title>Ultimate Typing Game</Title>
            <Login />
        </Wrapper>
    );
}

export default FirstPage;