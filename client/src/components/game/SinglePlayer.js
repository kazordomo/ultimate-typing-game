import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitScore, gameTimer } from '../../actions';
import Game from './Game';
import GoBack from '../basic/GoBack';

class SinglePlayer extends Component {

    handleSubmitScore() {
        const { currentGame: { 
            correctWords, 
            incorrectWords, 
            keystrokes } 
        } = this.props;
        this.props.submitScore({ correctWords, incorrectWords, keystrokes });
    }

    timer() {
        console.log(this.props.currentGame, this.props.gameTimer);
        let start = setInterval(() => {
            const { currentGame, gameTimer } = this.props;
            gameTimer(currentGame.time - 1);
            if(currentGame.time === 1) {
                this.handleSubmitScore();
                clearInterval(start);
            }
        }, 1000);
    }

    render() {
        return (
            <div>
                <GoBack goTo='/dashboard' />
                <Game 
                    gameModeTitle={'Singleplayer'}
                    timer={this.timer.bind(this)}
                />
            </div>
        );
    }
}

function mapStateToProps({ submitScore, currentGame }) {
    return { submitScore, currentGame };
}

export default connect(mapStateToProps, { submitScore, gameTimer })(SinglePlayer);
