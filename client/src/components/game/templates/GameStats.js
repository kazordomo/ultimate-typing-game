import React from 'react';
import styled from 'react-emotion';

const StatRow = styled('div')`
    margin: 15px 0px;
    padding: 7px;
    border-radius: 4px;
    background: rgba(112, 244, 222, 0.2);
`;

export default ({ stats: { gameOver, correctWords, incorrectWords, keystrokes } }) => {
    if(!gameOver) {
        return null;
    }
    return (
        <div>
            <StatRow>Correct Words: {correctWords}</StatRow>
            <StatRow>Incorrect Words: {incorrectWords}</StatRow>
            <StatRow>Total Keystrokes: {keystrokes}</StatRow>
        </div>
    );
}