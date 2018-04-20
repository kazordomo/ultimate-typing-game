import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SocialMedia from './SocialMedia';
import Register from './Register';
import Login from './Login';
import ErrorMessage from '../../styles/ErrorMessage';
import Row from '../../styles/Row';
import { submitAuthForm  } from '../../actions';

class AuthContainer extends Component {

    state = { showRegister: false };

    //TODO: preventDefault. What.
    handleAuthSubmit(authType) {
        const {submitAuthForm, authForm, history } = this.props;
        submitAuthForm(authForm.values, authType, history);
    }

    toggleRegisterLogin() {
        this.setState({ showRegister: !this.state.showRegister });
    }

    renderErrorMsg() {
        const { error } = this.props.user;
        if(error) {
            return <ErrorMessage>{error.message}</ErrorMessage>;
        }
        return '';
    }

    render() {
        return(
            <div>
                { this.renderErrorMsg() }
                { this.state.showRegister ? 
                <Register 
                    _onSubmit={() => this.handleAuthSubmit('signup')}
                    getLogin={() => this.toggleRegisterLogin.bind(this)} /> :
                <Login 
                    _onSubmit={() => this.handleAuthSubmit('login')} 
                    getRegister={() => this.toggleRegisterLogin.bind(this)} /> }
                <SocialMedia />
            </div>
        );
    }
}

function mapStateToProps({ form: { authForm }, user }) {
    return { authForm, user };
}

export default connect(mapStateToProps, { submitAuthForm } )(withRouter(AuthContainer));