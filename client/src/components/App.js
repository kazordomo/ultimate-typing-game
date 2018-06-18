import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styled, { injectGlobal } from 'react-emotion';
// import PrivateRoute from './PrivateRoute';
import Background from '../styles/Background';
import FirstPage from './FirstPage';
import Dashboard from './dashboard/Dashboard';
import SinglePlayer from './game/SinglePlayer';
import MultiPlayer from './game/MultiPlayer';
import Practice from './game/Practice';
import Leaderboard from './dashboard/Leaderboard';
import AddWordList from './game/AddWordList';
import EditWordList from './game/EditWordList';
import GlobalWordLists from './dashboard/GlobalWordLists';
import GlobalWordListPreview from './dashboard/GlobalWordListPreview';
import Loading from '../styles/Loading';

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

class App extends Component {
    async componentDidMount() {
        await this.props.fetchUserIfNeeded();
    }

    render() {
        //TODO: user JWT
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={props => (
                this.props.user.isAuthenticated ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to={{
                        pathname: '/',
                        state: { from: props.location }
                    }}/>
                )
            )}/>
        );

        return (
            <BrowserRouter>
                <Container>
                    <Background />
                    <Route exact path='/' component={FirstPage} />
                    <PrivateRoute path='/dashboard' component={Dashboard} />
                    <PrivateRoute exact path='/stats/:id/:isExternal' component={Stats} />
                    <PrivateRoute exact path='/settings' component={Settings} />
                    <PrivateRoute exact path='/leaderboard' component={Leaderboard} />
                    <PrivateRoute exact path='/game/singleplayer' component={SinglePlayer} />
                    <PrivateRoute exact path='/game/multiplayer' component={MultiPlayer} />
                    <PrivateRoute exact path='/game/practice' component={Practice} />
                    <PrivateRoute exact path='/game/wordlist/new' component={AddWordList} />
                    <PrivateRoute exact path='/game/wordlist/edit/:id' component={EditWordList} />
                    <PrivateRoute exact path='/wordlists' component={GlobalWordLists} />
                    <PrivateRoute exact path='/wordlist/preview/:id' component={GlobalWordListPreview} />
                </Container>
            </BrowserRouter>
        );
    }
}

function mapStateToProps({ user }) {
    return { user }
}

export default connect(mapStateToProps, actions)(App);