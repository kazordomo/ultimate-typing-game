import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'react-emotion';
import Login from './login/Login';
import Register from './login/Register';
import SocialMedia from './login/SocialMedia';
import Title from '../styles/Title';
import Wrapper from '../styles/Wrapper';
import * as actions from '../actions';

class FirstPage extends Component {
    state = { showRegister: true };

    renderAuthType() {
        const {submitAuthForm, authForm, history } = this.props;
        const AhrefButton = styled('a')({
            cursor: 'pointer',
            float: 'right'
        });

        if(this.state.showRegister) {
            return (
                <div>
                    <Register handleAuthSubmit={() => submitAuthForm(authForm.values, 'signup', history)}></Register>
                    <AhrefButton onClick={() => this.setState({showRegister: false})}>Change to login</AhrefButton>
                </div>
            );
        }
        return (
            <div>
                <Login handleAuthSubmit={() => submitAuthForm(authForm.values, 'login', history)} />
                <AhrefButton onClick={() => this.setState({showRegister: true})}>Change to register</AhrefButton>
            </div>
        );
    }

    render() {
        return(
            <Wrapper>
                <Title>Ultimate Typing Game</Title>
                <SocialMedia />
                {this.renderAuthType()}
            </Wrapper>
        );
    }
}

function mapStateToProps({ submitAuthForm, form: { authForm } }) {
    return { submitAuthForm, authForm };
}

export default connect(mapStateToProps, actions)(withRouter(FirstPage));