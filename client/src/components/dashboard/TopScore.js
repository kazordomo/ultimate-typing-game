import React from 'react';
import styled, { css } from 'react-emotion';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils';

const Tr = styled('tr')`
    text-align: left;
`;

const linkStyle = css`
    display: block;
    width: 100%;
    text-decoration: none;
    color: #ffffff;
`;

//TODO: should not use a table. the Link can not wrap the entire row.

const TopScore = ({topScore, isUserTopScores}) => {
    return (
        isUserTopScores ?
            <Tr>
                <td>{topScore.position}</td>
                <td>{topScore.correctWords}</td>
                <td>{formatDate(topScore.scoreDate)}</td>
            </Tr> :
            <Tr>
                <td>
                    <Link className={linkStyle} to={`/stats/${topScore._user}/true`}>
                        {topScore.position}</Link>
                </td>
                <td>
                    <Link className={linkStyle} to={`/stats/${topScore._user}/true`}>
                        {topScore.username}</Link>
                </td>
                <td>
                    <Link className={linkStyle} to={`/stats/${topScore._user}/true`}>
                        {topScore.correctWords}</Link>
                </td>
                <td>
                    <Link className={linkStyle} to={`/stats/${topScore._user}/true`}>
                        {formatDate(topScore.scoreDate)}</Link>
                </td>
            </Tr>
    );
};

export default TopScore;