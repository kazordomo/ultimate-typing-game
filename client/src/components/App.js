import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styled, { injectGlobal } from 'react-emotion';

import Header from './Header';
import FirstPage from './FirstPage';
import Dashboard from './Dashboard';
import Single from './gameModes/Single';
import Versus from './gameModes/Versus';
import Practice from './gameModes/Practice';

injectGlobal`
    * {
        box-sizing: border-box;
    }
    @font-face {
        font-family: 'kongtext';
        src: local('kongtext'),
          local('kongtext'),
          url(../styles/fonts/kongtext.ttf)
            format('ttf');
      }
`;

const Container = styled('div')`
    width: 2000px;
    max-width: 90%;
    margin: 0 auto;
`;

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <BrowserRouter>
                <Container>
                    <Header />
                    <Route exact path='/' component={FirstPage} />
                    <Route path='/dashboard' component={Dashboard} />
                    <Route exact path='/game/single' component={Single} />
                    <Route exact path='/game/versus' component={Versus} />
                    <Route exact path='/game/practice' component={Practice} />
                    <Route path='/error' component={Error} />
                </Container>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);