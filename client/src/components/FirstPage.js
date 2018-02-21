import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'react-emotion';
import Login from './login/Login';
import Register from './login/Register';
import SocialMedia from './login/SocialMedia';
import Title from '../styles/Title';
import * as actions from '../actions';

const Wrapper = styled('div')`
    width: 500px;
    margin: 150px auto
`;

const AhrefButton = styled('a')`
    cursor: pointer;
    float: right;
    color: #FFFFFF;
    font-size: 12px;
`;

const ErrorMessage = styled('div')`
    color: red;
    font-size: 20px;
`;

class FirstPage extends Component {
    state = { showRegister: true };

    renderAuthType() {
        const {submitAuthForm, authForm, history } = this.props;

        if(this.state.showRegister) {
            return (
                <div>
                    <Register handleAuthSubmit={() => submitAuthForm(authForm.values, 'signup', history)}></Register>
                    <AhrefButton onClick={() => this.setState({showRegister: false})}>Already a member?</AhrefButton>
                </div>
            );
        }
        return (
            <div>
                <Login handleAuthSubmit={() => submitAuthForm(authForm.values, 'login', history)} />
                <AhrefButton onClick={() => this.setState({showRegister: true})}>New? Register here!</AhrefButton>
            </div>
        );
    }

    renderErrorMsg() {
        const { error, clearError } = this.props;
        if(error) {
            //TODO: lol. for now. redo later please.
            setTimeout(() => {
                clearError();
            },5000);
            return <ErrorMessage>{error.message}</ErrorMessage>;
        }
        return '';
    }

    render() {
        return(
            <div>
                <Title>Ultimate Typing Game</Title>
                <Wrapper>
                    <SocialMedia />
                    {this.renderErrorMsg()}
                    {this.renderAuthType()}
                </Wrapper>
            </div>
        );
    }
}

function mapStateToProps({ submitAuthForm, form: { authForm }, error }) {
    return { submitAuthForm, authForm, error };
}

export default connect(mapStateToProps, actions)(withRouter(FirstPage));