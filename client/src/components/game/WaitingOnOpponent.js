import React from 'react';
import styled from 'react-emotion';

const Div = styled('div')`
    width: 100%;
    padding: 100px 30px;
    background-color: #232C33;
    color: #B5B2C2;
    text-align: center;
`;

export default () => {
    return <Div>Waiting on opponent</Div>;
}