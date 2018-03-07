import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'react-emotion';

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
        let logout = this.props.user ? <Ahref href='/api/logout'>Logout</Ahref> : '';

        return (
            <div className={header}>Ultimate Typing Game!{logout}</div>
        )
    }
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps)(Header);