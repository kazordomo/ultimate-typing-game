import React from 'react';
import styled from 'react-emotion';
import Row from '../../styles/Row';

const TrackerWrapper = styled('div')`
    width: 100;
    margin-bottom: 15px;
`;

const Percent = styled('div')`
    width: ${props => props.width}%;
    padding: 5px;
    background-color: #5B9B66;
`;

const PlayerName = styled('div')`
    color: #FFFFFF;
`;

export default ({ player: { name, wpm } }) => {
    return (
        <TrackerWrapper>
            {/* <div>{name}</div> */}
            <Row>
                <PlayerName>Karizmatisk</PlayerName>
                <Percent width={wpm} />
            </Row>
        </TrackerWrapper>
    );
}