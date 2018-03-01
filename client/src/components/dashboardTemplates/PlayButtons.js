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

const PlayButton = ({ mode }) => {
    //TODO: either have seperate routes for each mode, our send some indicator to tell which mode to play.
    // const href = `/game/${goTo}`;
    return <Link to='/game' className={linkStyle}>{mode}</Link>

}

const PlayButtons = () => {
    //map the buttons if we would to add more.
    return (
        <div>
            <PlayButton mode='Singleplayer' />
            <PlayButton mode='Multiplayer' />
            <PlayButton mode='Practice' />
        </div>
    );
}

export default PlayButtons;