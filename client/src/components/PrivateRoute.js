import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = (user, { component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        false ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }}/>
        )
    )}/>
);

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps, null)(PrivateRoute);

