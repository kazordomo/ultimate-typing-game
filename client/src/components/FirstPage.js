import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Title from '../styles/Title';
import * as actions from '../actions';

class FirstPage extends Component {
    render() {
        return(
            <div>
                <Title>Ultimate Typing Game</Title>
                <Login handleAuthSubmit={() => this.props.submitAuthForm(this.props.authForm.values)} />
            </div>
        );
    }

}

function mapStateToProps({ submitAuthForm, form: { authForm } }) {
    return { submitAuthForm, authForm };
}

export default connect(mapStateToProps, actions)(FirstPage);