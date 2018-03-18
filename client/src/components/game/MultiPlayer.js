import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Game from './Game';
import WaitingOnOpponent from './WaitingOnOpponent';
// import WpmTracker from './WpmTracker';
import Wrapper from '../../styles/Wrapper';
import { submitScore, fetchUser } from '../../actions';
import { newPlayer, updatePlayerScores, unsubscribe } from '../../player';

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
    }

    async componentDidMount() {
        await this.props.fetchUser();
        let user = {};
        user.name = this.props.user.local.username;
        user.wpm = 0;
        this.setState({ user });
        this.startMultiplayerGame();
    }

    componentWillUnmount() {
        unsubscribe();
    }

    //TODO: get the counter from server and send it to the game component.

    startMultiplayerGame() {
        // const { user: { _id, local: { username } } } = this.props;
        newPlayer(this.props.user, (err, gameIsReady) => {
            if(gameIsReady) {
                let timer = 3;
                let countDown = setInterval(() => {
                    this.setState({ waitingOnOpponentText: timer })
                    if(timer === 0) {
                        this.setState({ gameIsReady }, () => {
                            return clearInterval(countDown);
                        })
                    }
                    timer--;
                }, 1000)
            }
        });
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
            return <Game 
                        multiplayer={true}
                        submitScore={this.handleSubmitScore}
                        updateScore={() => updatePlayerScores()}
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
                    {this.state.user.wpm}
                    {this.state.opponent.wpm}
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