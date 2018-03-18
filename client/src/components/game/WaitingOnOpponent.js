import React from 'react';
import styled from 'react-emotion';

const WaitingOnOpponentWrapper = styled('div')`
    width: 500px;
    padding: 30px;
    background: pink;
`;

export default ({ text }) => {
    console.log(text);
    return (
        <WaitingOnOpponentWrapper>
            <div>Waiting on opponent...</div>
            <div>{text}</div>
        </WaitingOnOpponentWrapper>
    );
}