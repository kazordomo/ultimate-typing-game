import React, { Component } from 'react';
import { connect } from 'react-redux';
import Game from './Game';
import WaitingOnOpponent from './WaitingOnOpponent';
import WpmTracker from './WpmTracker';
import Wrapper from '../../styles/Wrapper';
import GoBack from '../utils/GoBack';
import styled from 'react-emotion';
import { submitScore, fetchUserIfNeeded } from '../../actions';
import { newPlayer, playerIsReady, updateWpm, unsubscribe } from '../../player';

class Multiplayer extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            user: {
                name: '',
                wpm: 0
            },
            opponent: {
                name: '',
                wpm: 0
            },
            gameIsReady: false,

        };
        this.handleSubmitScore = this.handleSubmitScore.bind(this);
        this.updatePlayersWpm = this.updatePlayersWpm.bind(this);
    }

    async componentDidMount() {
        await this.props.fetchUserIfNeeded();
        this.initPlayer();
    }

    componentWillUnmount() {
        unsubscribe();
    }

    initPlayer() {
        newPlayer(this.props.user, (err, players) => {
            let opponent = this.state.opponent;
            let user = this.state.user;
            opponent.name = players['opponent'];
            user.name = players['user'];
            let gameIsReady = (players['user'] && players['opponent']) ? true : false;
            this.setState({ opponent, user, gameIsReady });
        });
    }

    updatePlayersWpm(wpm) {
        let user = this.state.user;
        user.wpm = wpm;
        updateWpm(wpm, (err, data) => {
            let opponent = this.state.opponent;
            opponent.wpm = data;
            this.setState({ opponent, user });
        })
    }

    handleSubmitScore(correctWords, incorrectWords, keystrokes) {
        const { user, opponent } = this.state;
        let checkWinOrLoss = (user.wpm > opponent.wpm) ? true : false;
        this.props.submitScore({ 
            correctWords, 
            incorrectWords, 
            keystrokes, 
            multiplayerGame: true, 
            multiplayerWin: checkWinOrLoss 
        });
    }

    renderGameField() {
        if(!this.state.gameIsReady) {
            return <WaitingOnOpponent />;
        } else {
            return (
                <div>
                    <Game 
                            multiplayer
                            gameModeTitle={'Multiplayer'}
                            submitScore={this.handleSubmitScore}
                            updatePlayersWpm={this.updatePlayersWpm}
                            gameIsReady={this.state.gameIsReady}/>
                    <WpmTracker player={this.state.user} />
                    <WpmTracker player={this.state.opponent} />
                </div>

            );
        }
    }

    render() {
        return(
            <div>
                <GoBack goTo='/dashboard' />
                <Wrapper>
                    {this.renderGameField()}
                </Wrapper>
            </div>
        );
    }
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps, { fetchUserIfNeeded, submitScore })(Multiplayer);