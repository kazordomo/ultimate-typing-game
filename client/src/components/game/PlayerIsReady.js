import React from 'react';
import styled from 'react-emotion';
import Button from '../../styles/Button';

const I = styled('div')`
    position: absolute;
    right: 15px;
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
        <Button onClick={() => playerIsReady()} style={isReadyButtonStyle}>
            Ready 
            <I style={isReadyIStyle} className="fas fa-check"></I>
        </Button>
    );
}