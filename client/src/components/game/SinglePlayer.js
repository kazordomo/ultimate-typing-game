import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitScore } from '../../actions';
import Game from './Game';
import GoBack from '../basic/GoBack';

class SinglePlayer extends Component {

    handleSubmitScore(correctWords, incorrectWords, keystrokes) {
        this.props.submitScore({ correctWords, incorrectWords, keystrokes });
    }

    render() {
        return (
            <div>
                <GoBack goTo='/dashboard' />
                <Game 
                    gameModeTitle={'Singleplayer'}
                    submitScore={this.handleSubmitScore.bind(this)}/>
            </div>
        );
    }
}

function mapStateToProps({ submitScore }) {
    return { submitScore };
}

export default connect(mapStateToProps, { submitScore })(SinglePlayer);
