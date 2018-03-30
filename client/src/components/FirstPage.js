import React from 'react';
import Login from './login/Login';
import styled from 'react-emotion';
import Wrapper from '../styles/Wrapper';

const TitleWrapper = styled('div')`
    width: 220px;
    margin: 0 auto;
    color: #FFFFFF;
`;

const TitleRow = styled('div')`
    text-align: center;
`;

const Span = styled('span')`
    font-size: 35px;
    opacity: ${props => props.opacity};
`;

const FirstPage = () => {
    return(
        <div>
            <TitleWrapper>
                <TitleRow>
                    <Span opacity={1}>ULTIMATE </Span>
                    <Span opacity={.85}>TYPING</Span>
                </TitleRow>
                <TitleRow>
                    <Span opacity={.70}>GAME</Span>
                </TitleRow>
            </TitleWrapper>
            <Wrapper>
                <Login />
            </Wrapper>
        </div>
    );
}

export default FirstPage;