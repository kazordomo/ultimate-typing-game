import React from 'react';
import styled, { css } from 'react-emotion';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils';

const Tr = styled('tr')`
    text-align: left;
`;

const linkStyle = css`
    text-decoration: none;
    color: #ffffff;
`;

const TopScore = ({topScore, isUserTopScores}) => {
    return (
        <Tr>
            <td>{topScore.position}</td>
            {   
                isUserTopScores ? null :
                <td>
                    <Link className={linkStyle} to={`/stats/${topScore._user}/true`}>
                    {topScore.username}</Link>
                </td>
            }
            <td>{topScore.correctWords}</td>
            <td>{formatDate(topScore.scoreDate)}</td>
        </Tr>
    );
};

export default TopScore;