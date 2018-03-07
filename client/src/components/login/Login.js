import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SocialMediaLogin from './SocialMediaLogin';
import LocalRegister from './LocalRegister';
import LocalLogin from './LocalLogin';
import Ahref from '../../styles/Ahref';
import ErrorMessage from '../../styles/ErrorMessage';
import * as actions from '../../actions';

class Login extends Component {
    state = { showRegister: true };

    renderAuthType() {
        const {submitAuthForm, authForm, history } = this.props;

        if(this.state.showRegister) {
            return (
                <div>
                    <LocalRegister handleAuthSubmit={() => submitAuthForm(authForm.values, 'signup', history)}></LocalRegister>
                    <Ahref onClick={() => this.setState({showRegister: false})}>Already a member?</Ahref>
                </div>
            );
        }
        return (
            <div>
                <LocalLogin handleAuthSubmit={() => submitAuthForm(authForm.values, 'login', history)} />
                <Ahref onClick={() => this.setState({showRegister: true})}>Back to register</Ahref>
            </div>
        );
    }

    renderErrorMsg() {
        const { error, clearError } = this.props;
        if(error) {
            return <ErrorMessage>{error.message}</ErrorMessage>;
        }
        return '';
    }

    render() {
        return(
            <div>
                <SocialMediaLogin />
                {this.renderErrorMsg()}
                {this.renderAuthType()}
            </div>
        );
    }
}

function mapStateToProps({ submitAuthForm, form: { authForm }, error }) {
    return { submitAuthForm, authForm, error };
}

export default connect(mapStateToProps, actions)(withRouter(Login));