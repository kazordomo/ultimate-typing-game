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

const TopScore = ({topScore: { correctWords, scoreDate, username, position, _user }}) => {
    return (
        <Tr>
            <td>{position}</td>
            <td><Link className={linkStyle} to={`/stats/${_user}/true`}>{username}</Link></td>
            <td>{correctWords}</td>
            <td>{formatDate(scoreDate)}</td>
        </Tr>
    );
};

export default TopScore;