import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'react-emotion';

const linkStyle = css`
    display: block;
    margin-bottom: 15px;
    padding: 15px 5px;
    font-weight: 700;
    background-color: #2b2b2b;
    border-radius: 4px;
    text-decoration: none;
    text-align: center;
`;

const PlayButton = ({ goTo, mode }) => {
    const href = `/game/${goTo}`;
    return <Link to={href} className={linkStyle}>{mode}</Link>

}

const PlayButtons = () => {
    //map the buttons if we would to add more.
    return (
        <div>
            <PlayButton goTo='singleplayer' mode='Singleplayer' />
            <PlayButton goTo='multiplayer' mode='Multiplayer' />
            <PlayButton goTo='pracitce' mode='Practice' />
        </div>
    );
}

export default PlayButtons;