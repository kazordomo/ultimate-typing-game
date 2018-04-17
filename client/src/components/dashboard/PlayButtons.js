import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'react-emotion';

const PlayButtonsWrapper = styled('div')`
    width: 100%;
`;

const linkStyle = css`
    display: block;
    margin: 50px 0px;
    color: #FFFFFF;
    border: none;
    border-radius: 2px;
    text-decoration: none;
    text-align: center;
    &:hover {
        color: #5B9B66;
    }
`;

const PlayButton = ({ goTo, mode }) => {
    const href = `/game/${goTo}`;
    return <Link to={href} className={linkStyle}>{mode}</Link>;

}

const PlayButtons = () => {
    return (
        <PlayButtonsWrapper>
            <PlayButton goTo='singleplayer' mode='Singleplayer' />
            <PlayButton goTo='multiplayer' mode='Multiplayer' />
            <PlayButton goTo='practice' mode='Practice' />
        </PlayButtonsWrapper>
    );
}

export default PlayButtons;