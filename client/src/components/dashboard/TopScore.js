import React from 'react';
import styled from 'react-emotion';

const TopScoreRow = styled('div')`
    margin: 20px 0px;
    border-bottom: 1px solid #FFFFFF;
`;

const TopScoreStatDivider = styled('span')`
    margin: 0px 50px;
`;

const Date = styled('span')`
    float: right;
`;

const TopScore = ({topScore: { correctWords, scoreDate, _id }}) => {
    return (
        <TopScoreRow>
            <span>1</span>
            <TopScoreStatDivider>-</TopScoreStatDivider>
            <span>{correctWords}</span>
            <TopScoreStatDivider>-</TopScoreStatDivider>
            <Date>{scoreDate}</Date>
        </TopScoreRow>
    );
};

export default TopScore;