import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import FirstPage from './FirstPage';
import Login from './Login';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Route exact path='/' component={FirstPage} />
                    <Route path='/login' component={Login} />
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);