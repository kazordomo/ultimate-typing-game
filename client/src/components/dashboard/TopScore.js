import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

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

const TopScore = ({topScore: { correctWords, scoreDate, username, position, _user }}) => {
    return (
        <TopScoreRow>
            <Link to={`/stats/${_user}/true`}>JA</Link>
            <span>{position}</span>
            <TopScoreStatDivider>-</TopScoreStatDivider>
            <span>{username}</span>
            <TopScoreStatDivider>-</TopScoreStatDivider>
            <span>{correctWords}</span>
            <Date>{scoreDate}</Date>
        </TopScoreRow>
    );
};

export default TopScore;