import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styled, { injectGlobal } from 'react-emotion';
import Background from '../styles/Background';
import Header from './Header';
import FirstPage from './FirstPage';
import Dashboard from './Dashboard';
import Game from './Game';

injectGlobal`
    * {
        box-sizing: border-box;
        color: #20C20E;
        font-family: 'Press Start 2P', cursive;
        font-size: 18px;
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
                    <Background />
                    <Header />
                    <Route exact path='/' component={FirstPage} />
                    <Route path='/dashboard' component={Dashboard} />
                    <Route exact path='/game' component={Game} />
                    {/* <Route path='/error' component={Error} /> */}
                </Container>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);