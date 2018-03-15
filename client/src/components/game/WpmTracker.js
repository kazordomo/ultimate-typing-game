import React from 'react';
import styled from 'react-emotion';

const TrackerWrapper = styled('div')`
    width: 100;
    margin-bottom: 15px;
`;

const Percent = styled('div')`
    width: ${props => props.width}%;
    padding: 5px;
    background-color: #20C20E;
`;

export default ({ player: { name, wpm } }) => {
    return (
        <TrackerWrapper>
            <div>{name}</div>
            <Percent width={wpm} />
        </TrackerWrapper>
    );
}