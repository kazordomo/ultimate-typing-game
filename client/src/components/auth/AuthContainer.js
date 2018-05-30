import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import SocialMedia from './SocialMedia';
import Register from './Register';
import Login from './Login';
import DisplayError from '../basic/DisplayError';
import { submitAuthForm } from '../../actions';

class AuthContainer extends Component {

    state = { showRegister: false };

    handleAuthSubmit(authType, values) {
        this.props.submitAuthForm(values, authType, this.props.history);
    }

    toggleRegisterLogin() {
        this.setState({ showRegister: !this.state.showRegister });
    }

    render() {

        //HasTokenRoute in app.js
        if(this.props.user.isAuthenticated) {
            return <Redirect to='/dashboard' />
        }

        return(
            <div>
                { this.props.user.error ? 
                    <DisplayError errorMsg={this.props.user.error.message} /> : '' }
                { this.state.showRegister ? 
                <Register 
                    _onSubmit={this.handleAuthSubmit.bind(this)}
                    getLogin={() => this.toggleRegisterLogin.bind(this)} /> :
                <Login 
                    _onSubmit={this.handleAuthSubmit.bind(this)} 
                    getRegister={() => this.toggleRegisterLogin.bind(this)} /> }
                <SocialMedia />
            </div>
        );
    }
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps, { submitAuthForm } )(withRouter(AuthContainer));