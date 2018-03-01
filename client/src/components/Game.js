import React from 'react';
// import Single from './gameModes/Single';
// import Versus from './gameModes/Versus';
// import Practice from './gameModes/Practice';
import ActiveWords from './gameModes/templates/ActiveWords';
import wordList from '../utils/words';

//TODO: render right game mode dynamically.
const Game = () => {
    return (
        <div>
            <div>Game</div>
            <ActiveWords words={wordList} />
        </div>
    );
}

export default Game;
