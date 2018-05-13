import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'react-emotion';

const PlayButtonsWrapper = styled('div')`
    width: 100%;
`;

const linkStyle = css`
    display: block;
    width: 80%;
    margin: 40px auto;
    padding: 5px;
    background-color: #5B9B66;
    color: #FFFFFF;
    text-align: center;
    text-decoration: none;
    border-radius: 2px;
    transition: all .1s ease-in-out;
    box-shadow: 2px 4px 13px 0px rgba(0,0,0,0.75);
    :hover {
        box-shadow: 1px 2px 10px 0px rgba(0,0,0,0.75);
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