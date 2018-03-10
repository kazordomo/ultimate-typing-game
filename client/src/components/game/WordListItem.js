import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'react-emotion';

const linkStyle = css`
    display: block;
    margin-bottom: 15px;
    padding: 15px 5px;
    font-weight: 700;
    background-color: #2b2b2b;
    border-radius: 4px;
    text-decoration: none;
    text-align: center;
`;

export default ({ wordListObj: { name, _id } }) => {
    const href = `/game/wordList/edit/${_id}`;
    return(
        <div>
            <Link className={linkStyle} to={href} >{name}</Link>
            <button>Choose List</button>
        </div>
    );
}