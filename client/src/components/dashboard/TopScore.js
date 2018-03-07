import React from 'react';
import styled from 'react-emotion';

const TopScoreRow = styled('div')`
    margin: 20px 0px;
`;

const TopScoreStatDivider = styled('span')`
    margin: 0px 50px;
`;

const TopScore = ({topScore: { correctWords, scoreDate, _id }}) => {
    return (
        <TopScoreRow>
            <span>{correctWords}</span>
            <TopScoreStatDivider>-</TopScoreStatDivider>
            <span>{scoreDate}</span>
        </TopScoreRow>
    );
};

export default TopScore;