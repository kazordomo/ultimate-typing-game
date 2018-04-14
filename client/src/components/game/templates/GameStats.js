import React from 'react';
import styled from 'react-emotion';

const StatRow = styled('div')`
    margin: 15px 0px;
    padding: 10px;
    border-radius: 4px 12px 12px 4px;
    background: rgba(112, 244, 222, 0.2);
    color: #FFFFFF;
`;

const Span = styled('span')`
    color: #FFFFFF;
`;

export default ({ stats: { correctWords, incorrectWords, keystrokes } }) => {
    return (
        <div>
            <StatRow>Correct Words: {correctWords}</StatRow>
            <StatRow>Incorrect Words: {incorrectWords}</StatRow>
            <StatRow>Total Keystrokes: {keystrokes}</StatRow>
            <Span>Press ENTER to play again</Span>
        </div>
    );
}