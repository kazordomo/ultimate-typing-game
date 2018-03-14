import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Game from './Game';
import WpmTracker from './WpmTracker';
import Wrapper from '../../styles/Wrapper';

class Multiplayer extends Component {

    constructor(props) {
        super(props);

        this.state = { playerWpm: 0, opponentWpm: 0 };
    }

    handleSetUserWpm(playerWpm) {
        this.setState({ playerWpm });
    }

    handleSetOpponentWpm(opponentWpm) {
        this.setState({ opponentWpm });
    }

    render() {
        return(
            <div>
                <Link to='/dashboard'>Back to Dashboard</Link>
                <Wrapper>
                    <Game multiplayer userWpm={this.handleSetUserWpm.bind(this)} opponentWpm={this.handleSetOpponentWpm.bind(this)} />
                    <WpmTracker wpm={this.state.playerWpm} />
                    <WpmTracker wpm={this.state.opponentWpm} />
                </Wrapper>
            </div>
        );
    }
}

export default Multiplayer;