import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Game from './Game';
import WaitingOnOpponent from './WaitingOnOpponent';
import WpmTracker from './WpmTracker';
import Wrapper from '../../styles/Wrapper';
import GoBack from '../basic/GoBack';
import { 
    submitScore, 
    fetchUserIfNeeded,
    multiplayerCountDown,
    multiplayerStart,
    initMultiplayerGamePlayers,
    updateStat,
    gameTimer
} from '../../actions';
import { 
    newPlayer, 
    updateWpm, 
    updateTime, 
    unsubscribe 
} from '../../player';

const CountDown = styled('div')`
    font-size: 64px;
    color: red;
    text-align: center;
`;

class Multiplayer extends Component {

    async componentDidMount() {
        await this.props.fetchUserIfNeeded();
        this.initPlayer();
    }

    componentWillUnmount() {
        unsubscribe();
    }

    initPlayer() {
        newPlayer(this.props.user, (err, players) => {
            const user = {
                name: players['user'],
                wpm: 0
            };
            const opponent = {
                name: players['opponent'],
                wpm: 0
            };
            console.log(players);
            let gameIsReady = (players['user'] && players['opponent']) ? true : false;
            //hax. chech if the comp is mounted before setting the state
            if(this.refs._isMounted) {
                if(gameIsReady)
                    this.multiplayerCountDown();
                this.props.initMultiplayerGamePlayers({ user, opponent, gameIsReady });
            }
        });
    }

    updatePlayersWpm(wpm) {
        let user = this.props.currentGame.user;
        user.wpm = wpm;
        updateWpm(wpm, (err, data) => {
            let opponent = this.props.currentGame.opponent;
            opponent.wpm = data;
            if(this.refs._isMounted) {
                this.props.updateStat({ user });                
                this.props.updateStat({ opponent });
            }
        })
    }

    multiplayerCountDown() {
        let countDown = setInterval(() => {
            let { multiPlayerCountDown } = this.props;
            this.props.multiplayerCountDown(this.props.currentGame.multiPlayerCountDown - 1);
            if(this.props.currentGame.multiPlayerCountDown === 0) {
                clearInterval(countDown);
            }
        }, 1000);
    }

    timer() {
        let start = setInterval(() => {
            const { currentGame, gameTimer } = this.props;
            //TODO: nahhh
            this.updatePlayersWpm(currentGame.correctWords);
            gameTimer(currentGame.time - 1);
            //TODO: updateTime will keep going. we need to kill (removeAllListeers) from the socket.
            updateTime(true, (err, time) => {
                if(this.refs._isMounted) {
                    if(currentGame.time === 1)
                        clearInterval(start);
                }
            });
        }, 1000);
    }

    handleSubmitScore(correctWords, incorrectWords, keystrokes) {
        const { user, opponent } = this.state;
        let checkWinOrLoss = (user.wpm > opponent.wpm) ? true : false;
        this.setState({ gameIsReady: false });
        this.props.submitScore({ 
            correctWords, 
            incorrectWords, 
            keystrokes, 
            multiplayerGame: true, 
            multiplayerWin: checkWinOrLoss
        });
    }

    renderGameField() {
        if(!this.props.currentGame.gameIsReady) {
            return <WaitingOnOpponent />;
        }
        if(this.props.currentGame.multiPlayerCountDown) {
            return <CountDown>{this.props.currentGame.multiPlayerCountDown}</CountDown>;
        }
        return (
            <div>
                <Game 
                    multiplayer
                    gameModeTitle={'Multiplayer'}
                    submitScore={this.handleSubmitScore.bind(this)}
                    gameIsReady={this.props.currentGame.gameIsReady}
                    timer={this.timer.bind(this)}
                />
                <WpmTracker player={this.props.currentGame.user} />
                <WpmTracker player={this.props.currentGame.opponent} />
            </div>

        );
    }
    // handleGiveUp() {

    // }

    render() {
        return(
            <div ref='_isMounted'>
                <GoBack goTo='/dashboard' />
                <div>
                    <Wrapper>
                        {this.renderGameField()}
                    </Wrapper>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ user, currentGame }) {
    return { user, currentGame };
}

export default connect(mapStateToProps, 
    { 
        fetchUserIfNeeded, 
        submitScore,
        multiplayerCountDown,
        multiplayerStart,
        initMultiplayerGamePlayers,
        updateStat,
        gameTimer
    }
)(Multiplayer);