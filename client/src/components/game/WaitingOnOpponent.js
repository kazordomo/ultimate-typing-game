import React from 'react';
import styled from 'react-emotion';
import Button from '../../styles/Button';
import FlexContainer from '../../styles/FlexContainer';

const WaitingOnOpponentWrapper = styled('div')`
    width: 100%;
    height: 150px;
    padding: 30px;
    background-color: #232C33;
    color: #B5B2C2;
    text-align: center;
`;

const I = styled('div')`
    position: absolute;
    right: 15px;
    font-size: 22px;
`;

const Counter = styled('div')`
    font-size: 22px;
`;

export default ({ counter, playerIsReady, playerIsReadyBool }) => {
    let isReadyButtonStyle = {
        position: 'relative',
        backgroundColor: playerIsReadyBool ? '#5B9B66' : '#E6861A',
    }
    let isReadyIStyle = {
        opacity: playerIsReadyBool ? '1' : '0'
    }
    return (
        <WaitingOnOpponentWrapper>
            <FlexContainer>
                <div>Waiting on opponent...</div>
                <Counter>{counter}</Counter>
                <Button onClick={() => playerIsReady()} style={isReadyButtonStyle}>
                    Ready 
                    <I style={isReadyIStyle} className="fas fa-check"></I>
                </Button>
            </FlexContainer>
        </WaitingOnOpponentWrapper>
    );
}