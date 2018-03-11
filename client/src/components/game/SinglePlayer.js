import React from 'react';
import Game from './Game';
import { Link } from 'react-router-dom';

const SinglePlayer = () => {
    return (
        <div>
            <Link to='/dashboard'>Back to Dashboard</Link>
            <Game gameOverMessage='SingplePlayer gameover' />
        </div>
    );
}

export default SinglePlayer;
