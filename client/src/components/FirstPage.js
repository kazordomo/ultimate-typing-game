import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'react-emotion';
import Login from './login/Login';
import Register from './login/Register';
import SocialMedia from './login/SocialMedia';
import Title from '../styles/Title';
import * as actions from '../actions';

const Wrapper = styled('div')({
    width: '500px' ,
    margin: '0 auto'
});

const AhrefButton = styled('a')({
    cursor: 'pointer',
    float: 'right',
    color: 'purple'
});

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

    render() {
        return(
            <div>
                <Title>Ultimate Typing Game</Title>
                <Wrapper>
                    <SocialMedia />
                    {this.renderAuthType()}
                </Wrapper>
            </div>
        );
    }
}

function mapStateToProps({ submitAuthForm, form: { authForm } }) {
    return { submitAuthForm, authForm };
}

export default connect(mapStateToProps, actions)(withRouter(FirstPage));