import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'react-emotion';
import styled from 'react-emotion';

const header = css`
    width: 100%;
    padding: 20px;
    color: #20C20E;
    box-sizing: border-box;
`;

const Ahref = styled('a')`
    float: right;
    text-decoration: none;
    color: #20C20E;
`;

class Header extends Component {

    render() {
        let logout = this.props.auth ? <Ahref href='/api/logout'>Logout</Ahref> : '';

        return (
            <div className={header}>This is our header!{logout}</div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);