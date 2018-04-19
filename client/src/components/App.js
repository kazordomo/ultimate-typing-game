import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styled, { injectGlobal } from 'react-emotion';
import PrivateRoute from './PrivateRoute';
import Background from '../styles/Background';
import FirstPage from './FirstPage';
import Dashboard from './dashboard/Dashboard';
import SinglePlayer from './game/SinglePlayer';
import MultiPlayer from './game/MultiPlayer';
import Practice from './game/Practice';
import Game from './game/Game';
import Leaderboard from './dashboard/Leaderboard';
import AddWordList from './game/AddWordList';
import EditWordList from './game/EditWordList';
import Stats from './dashboard/Stats';
import Settings from './dashboard/Settings';

//RENDERS 100 TIMES?!
injectGlobal`
    * {
        // box-sizing: border-box;
        // color: #FFFFF;
        font-family: 'Anton', sans-serif;
        font-size: 18px;
    }
`;

const Container = styled('div')`
    width: 800px;
    max-width: 90%;
    margin: 0 auto;
    margin-top: 50px;
`;

//TODO: FIX THE FRIKKING LOGIN PAGE

class App extends Component {
    componentDidMount() {
        this.props.fetchUserIfNeeded();
    }

    render() {
        return (
            <BrowserRouter>
                <Container>
                    <Background />
                    <Route exact path='/' component={FirstPage} />
                    <Route path='/dashboard' component={Dashboard} />
                    <Route exact path='/stats/:id' component={Stats} />
                    <Route exact path='/settings' component={Settings} />
                    <Route exact path='/leaderboard' component={Leaderboard} />
                    <Route exact path='/game' component={Game} />
                    <Route exact path='/game/singleplayer' component={SinglePlayer} />
                    <Route exact path='/game/multiplayer' component={MultiPlayer} />
                    <Route exact path='/game/practice' component={Practice} />
                    <Route exact path='/game/wordlist/new' component={AddWordList} />
                    <Route exact path='/game/wordlist/edit/:id' component={EditWordList} />
                    {/* <Route path='/error' component={Error} /> */}
                </Container>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);