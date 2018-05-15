import React, { Component } from 'react';
import { connect } from 'react-redux';
import Game from './Game';
import WaitingOnOpponent from './WaitingOnOpponent';
import WpmTracker from './WpmTracker';
import Wrapper from '../../styles/Wrapper';
import GoBack from '../basic/GoBack';
import { submitScore, fetchUserIfNeeded } from '../../actions';
import { newPlayer, updateWpm, unsubscribe } from '../../player';
import { disconnect } from 'cluster';

class Multiplayer extends Component {

    //TODO: when a player unsubscribes before the game is done,
    //we need to get a ping telling us that.
    //if the player unmounts before the timer is done, the player will "disconnect".
    //otherwise it will be a simple unsubscribed.

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
            gameIsReady: false
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
            //hax. chech if the comp is mounted before setting the state
            if(this.refs._isMounted)
                this.setState({ opponent, user, gameIsReady });
        });
    }

    updatePlayersWpm(wpm) {
        let user = this.state.user;
        user.wpm = wpm;
        updateWpm(wpm, (err, data) => {
            let opponent = this.state.opponent;
            opponent.wpm = data;
            if(this.refs._isMounted)
                this.setState({ opponent, user });
        })
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
                        gameIsReady={this.state.gameIsReady}
                    />
                    <WpmTracker player={this.state.user} />
                    <WpmTracker player={this.state.opponent} />
                </div>

            );
        }
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

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps, { fetchUserIfNeeded, submitScore })(Multiplayer);