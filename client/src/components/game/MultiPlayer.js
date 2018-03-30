import React, { Component } from 'react';
import { connect } from 'react-redux';
import Game from './Game';
import WaitingOnOpponent from './WaitingOnOpponent';
import WpmTracker from './WpmTracker';
import Wrapper from '../../styles/Wrapper';
import GoBack from '../utils/GoBack';
import { submitScore, fetchUser } from '../../actions';
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
                name: 'Opponent',
                wpm: 0
            },
            playerIsReady: false,
            gameIsReady: false,
            waitingOnOpponentText: '-'

        };
        this.handleSubmitScore = this.handleSubmitScore.bind(this);
        this.handlePlayerIsReady = this.handlePlayerIsReady.bind(this);
        this.updatePlayersWpm = this.updatePlayersWpm.bind(this);
    }

    async componentDidMount() {
        await this.props.fetchUser();
        let user = {};
        user.name = this.props.user.local.username;
        user.wpm = 0;
        newPlayer(this.props.user, (err, player) => {
            let opponent = this.state.opponent;
            opponent.name = player.name;
            this.setState({ opponent, user });
        });
    }

    componentWillUnmount() {
        unsubscribe();
    }

    startMultiplayerGame() {
        let timer = 3;
        let countDown = setInterval(() => {
            this.setState({ waitingOnOpponentText: timer })
            if(timer === 0) {
                this.setState({ gameIsReady: true }, () => {
                    return clearInterval(countDown);
                })
            }
            timer--;
        }, 1000)
    }

    handlePlayerIsReady() {
        if(!this.state.playerIsReady) {
            this.setState({ playerIsReady: true });
        }
        playerIsReady((err, players) => {
            const playersReady = Object.keys(players).map(playerId => {
                return players[playerId].isReady;
            }).filter(value => value);
            
            if(playersReady.length === 2) {
                this.startMultiplayerGame();
            }
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

    renderWaitingForPlayer() {
        return this.state.gameIsReady ? '' : 'Waiting on opponent...';
    }

    renderGameField() {
        if(!this.state.gameIsReady) {
            return <WaitingOnOpponent counter={this.state.waitingOnOpponentText} playerIsReady={this.handlePlayerIsReady} playerIsReadyBool={this.state.playerIsReady} />;
        } else {
            //Game opponent will be in charge of setting the Multiplayer local/component state.
            //no need for dispatching
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

    handleSubmitScore(correctWords, incorrectWords, keystrokes) {
        const { user, opponent } = this.state;
        let win = 0;
        if(user.wpm > opponent.wpm) {
            win = 1;
        }
        this.props.submitScore({ correctWords, incorrectWords, keystrokes, win });
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

export default connect(mapStateToProps, { fetchUser, submitScore })(Multiplayer);