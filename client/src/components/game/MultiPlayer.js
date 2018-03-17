import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Game from './Game';
// import WpmTracker from './WpmTracker';
import Wrapper from '../../styles/Wrapper';
import { submitScore, fetchUser } from '../../actions';
import { newPlayer, getPlayerScores, unsubscribe } from '../../player';

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
            }
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

    startMultiplayerGame() {
        // const { user: { _id, local: { username } } } = this.props;
        newPlayer(this.props.user);
    }

    countPlayerScores(wpm) {
        getPlayerScores({ user: this.props.user._id, wpm }, (err, data) => {
            if(data.user === this.props.user._id) {
                const user = this.state.user;
                user.wpm = data.wpm;
                this.setState({ user });
            } else {
                const opponent = this.state.opponent;
                opponent.wpm = data.wpm;
                this.setState({ opponent });
            }
        });
    }


    // renderWaitingForPlayer() {
    //     return this.state.gameIsReady ? '' : 'Waiting on opponent...';
    // }

    

    handleSubmitScore({ correctWords, incorrectWords, keystrokes }) {
        this.countPlayerScores(correctWords);
        // this.props.submitScore({ correctWords, incorrectWords, keystrokes });
    }

    render() {
        return(
            <div>
                <Link to='/dashboard'>Back to Dashboard</Link>
                <Wrapper>
                    {this.state.user.wpm}
                    {this.state.opponent.wpm}
                    <Game 
                        multiplayer 
                        submitScore={this.handleSubmitScore}/>
                </Wrapper>
            </div>
        );
    }
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps, { fetchUser, submitScore })(Multiplayer);