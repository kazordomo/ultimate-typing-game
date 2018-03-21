import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Game from './Game';
import WaitingOnOpponent from './WaitingOnOpponent';
import WpmTracker from './WpmTracker';
import Wrapper from '../../styles/Wrapper';
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
            this.setState({ opponent, user }, () => console.log(this.state));
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
        playerIsReady((err, players) => {
            const playersReady = Object.keys(players).map(playerId => {
                return players[playerId].isReady;
            }).filter(value => value);
            
            console.log(playersReady);
            if(playersReady.length === 2) {
                console.log("LETS GO!");
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
        //return game directly to not see the countdown each time..
        // return <Game 
        //             multiplayer={true}
        //             submitScore={this.handleSubmitScore}
        //             gameIsReady={this.state.gameIsReady}/>
        if(!this.state.gameIsReady) {
            return <WaitingOnOpponent text={this.state.waitingOnOpponentText} />;
        } else {
            //Game opponent will be in charge of setting the Multiplayer local/component state.
            //no need for dispatching
            return <Game 
                        multiplayer={true}
                        submitScore={this.handleSubmitScore}
                        updatePlayersWpm={this.updatePlayersWpm}
                        gameIsReady={this.state.gameIsReady}/>
        }
    }

    handleSubmitScore({ correctWords, incorrectWords, keystrokes }) {
        // this.props.submitScore({ correctWords, incorrectWords, keystrokes });
    }

    render() {
        return(
            <div>
                <Link to='/dashboard'>Back to Dashboard</Link>
                <Wrapper>
                    <button onClick={this.handlePlayerIsReady}>Ready?</button>
                    {this.state.user.wpm}
                    {this.state.opponent.wpm}
                    {this.renderGameField()}
                    <WpmTracker player={this.state.user} />
                    <WpmTracker player={this.state.opponent} />
                </Wrapper>
            </div>
        );
    }
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps, { fetchUser, submitScore })(Multiplayer);