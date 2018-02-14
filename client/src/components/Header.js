import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'react-emotion';

const header = css({
    width: '100%',
    padding: '20px',
    background: 'pink'
})

class Header extends Component {

    render() {
        let logout = this.props.auth ? <a href='/api/logout'>Logout</a> : '';

        return (
            <div className={header}>This is our header!{logout}</div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);