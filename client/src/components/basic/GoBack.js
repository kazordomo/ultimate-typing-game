import React from 'react';
import { css } from 'react-emotion';
import { Link } from 'react-router-dom';

const linkStyle = css`
    position: absolute;
    top: 30px;
    left: 30px;
    cursor: pointer;
    i {
        color: #DADFF7;
        font-size: 30px;
    }
`;

export default ({ goTo, goBackOne, goBackFunc }) => {
    return goBackOne ?
        <span className={linkStyle} onClick={ () => goBackFunc() }><i className="fas fa-angle-left"></i></span> : 
        <Link className={linkStyle} to={goTo}><i className="fas fa-angle-left"></i></Link>
}