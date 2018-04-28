import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'react-emotion';

const List = styled('div')`
    margin-bottom: 10px;
    color: #FFFFFF;
    background-color: rgba(0,0,0,0.1);
    text-decoration: none;
    text-align: center;
    cursor: pointer;
`;

const linkStyle = css`
    float: right;
    margin-bottom: 10px;
    color: #FFFFFF;
    text-decoration: none;
    text-align: center;
`;

const I = styled('i')`
    float: right;
    color: yellow;
`;

export default ({ wordListObj: { name, _id }, chooseWordList, isGlobalBoolean }) => {
    const href = `/game/wordList/edit/${_id}`;
    return(
        <div>
            <List onClick={ () => chooseWordList() }>
                {name}
                {isGlobalBoolean ? <I className="fas fa-star"></I> : 
                    <Link className={linkStyle} to={href} ><i className="fas fa-edit"></i></Link>}
            </List>
        </div>
    );
}