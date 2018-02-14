import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import FirstPage from './FirstPage';
import Dashboard from './Dashboard';
import Single from './gameModes/Single';
import Versus from './gameModes/Versus';
import Practice from './gameModes/Practice';
import Login from './Login';
import Error from './Error';

//TODO: use css grid and eventually emotion for inline js styling.

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
                    <Route path='/dashboard' component={Dashboard} />
                    <Route exact path='/game/single' component={Single} />
                    <Route exact path='/game/versus' component={Versus} />
                    <Route exact path='/game/practice' component={Practice} />
                    <Route path='/error' component={Error} />
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);