import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'react-emotion';

const List = styled('div')`
    margin-bottom: 10px;
    color: #FFFFFF;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
`;

const linkStyle = css`
    margin-bottom: 10px;
    color: #FFFFFF;
    text-decoration: none;
    text-align: center;
`;

export default ({ wordListObj: { name, _id }, chooseWordList }) => {
    const href = `/game/wordList/edit/${_id}`;
    return(
        <div>
            <List onClick={ () => chooseWordList() }>
                {name} <Link className={linkStyle} to={href} >x</Link>
            </List>
        </div>
    );
}