import React, { Component } from 'react';
import { connect } from 'react-redux';
import Game from './Game';
import WaitingOnOpponent from './WaitingOnOpponent';
import WpmTracker from './WpmTracker';
import Wrapper from '../../styles/Wrapper';
import GoBack from '../utils/GoBack';
import styled from 'react-emotion';
import { submitScore, fetchUser } from '../../actions';
import { newPlayer, playerIsReady, updateWpm, unsubscribe } from '../../player';

const WaitingOnOpponentDiv = styled('div')`
    width: 100%;
    padding: 30px;
    background-color: #232C33;
    color: #B5B2C2;
    text-align: center;
`;

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
        await this.props.fetchUser();
        newPlayer(this.props.user, (err, players) => {
            let opponent = this.state.opponent;
            let user = this.state.user;
            opponent.name = players['opponent'];
            user.name = players['user'];
            let gameIsReady = (players['user'] && players['opponent']) ? true : false;
            this.setState({ opponent, user, gameIsReady });
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

    updatePlayersWpm(wpm) {
        let user = this.state.user;
        user.wpm = wpm;
        updateWpm(wpm, (err, data) => {
            let opponent = this.state.opponent;
            opponent.wpm = data;
            this.setState({ opponent, user });
        })
    }

    renderGameField() {
        if(!this.state.gameIsReady) {
            return <WaitingOnOpponentDiv>Waiting on opponent...</WaitingOnOpponentDiv>;
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

    handleSubmitScore(correctWords, incorrectWords, keystrokes) {
        const { user, opponent } = this.state;
        let win = (user.wpm > opponent.wpm) ? 1 : 0;
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