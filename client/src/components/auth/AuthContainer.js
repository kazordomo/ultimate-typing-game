import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SocialMedia from './SocialMedia';
import Register from './Register';
import Login from './Login';
import ErrorMessage from '../../styles/ErrorMessage';
import Row from '../../styles/Row';
import * as actions from '../../actions';
import styled from 'react-emotion';

const localStyles = {
    I: styled('div')`
        color: #5A7D7C;
    `,
    TextInput: styled('div')`
        display: flex;
        margin-top: 20px;
        align-items: baseline;
        border-bottom: 1px solid #5A7D7C;
    `,
    FlexItemLong: styled('div')`
        font-size: 25px;
        flex-basis: 90%;
    `,
    FlexItemShort: styled('div')`
        flex-basis: 10%;
    `,
    Row,
    FlexRow: styled('div')`
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    `,
    FlexRowItem: styled('div')`
        padding: ${ props => props.white ? '0px 5px' : '0px' };
        color: ${props => props.white ? '#FFFFFF' : '#5A7D7C'};
        border-bottom: ${props => props.white ? '2px solid #FFFFFF' : 'none'};
        cursor: pointer;
    `
};

class Login extends Component {

    constructor() {
        super();

        this.state = { showRegister: false };
    }

    renderAuthType() {
        const {submitAuthForm, authForm, history } = this.props;
        return (
            //PREVENT DEFAULT
            this.state.showRegister ? 
                <Register 
                    handleAuthSubmit={() => submitAuthForm(authForm.values, 'signup', history)}
                    getLogin={() => this.toggleRegisterLogin.bind(this)} 
                    styles={localStyles} /> :
                <Login 
                    handleAuthSubmit={() => submitAuthForm(authForm.values, 'login', history)} 
                    getRegister={() => this.toggleRegisterLogin.bind(this)} 
                    styles={localStyles} />
        );
    }

    renderErrorMsg() {
        const { error } = this.props.user;
        if(error) {
            return <ErrorMessage>{error.message}</ErrorMessage>;
        }
        return '';
    }

    toggleRegisterLogin() {
        this.setState({ showRegister: !this.state.showRegister });
    }

    render() {
        return(
            <div>
                {this.renderErrorMsg()}
                {this.renderAuthType()}
                <SocialMedia />
            </div>
        );
    }
}

function mapStateToProps({ submitAuthForm, form: { authForm }, user }) {
    return { submitAuthForm, authForm, user };
}

export default connect(mapStateToProps, actions)(withRouter(Login));