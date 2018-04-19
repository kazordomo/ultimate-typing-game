import React from 'react';
import { css } from 'react-emotion';
import { Link } from 'react-router-dom';

const linkStyle = css`
    position: absolute;
    top: 30px;
    left: 30px;
    i {
        color: #DADFF7;
        font-size: 30px;
    }
`;

export default ({ goTo }) => {
    return <Link className={linkStyle} to={goTo}><i className="fas fa-angle-left"></i></Link>
}