import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Game from './Game';
import WpmTracker from './WpmTracker';
import Wrapper from '../../styles/Wrapper';
import { fetchUser } from '../../actions';

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
    }

    //TODO: we can remove connect and actions if we can get the setState of the username async...
    async componentDidMount() {
        await this.props.fetchUser();
        let user = this.props.user;
        user.name = this.props.user.local.username;
        user.wpm = 0;
        this.setState({ user });
    }

    //TODO: refactor these functions.
    handleSetUserWpm(wpm) {
        let user = this.state.user;
        user.wpm = wpm;
        this.setState({ user });
    }

    handleSetOpponentWpm(wpm) {
        let opponent = this.state.opponent;
        opponent.wpm = wpm;
        this.setState({ opponent });
    }

    handleSetOpponentName(name) {
        console.log(name);
        let opponent = this.state.opponent;
        opponent.name = name;
        this.setState({ opponent });
    }

    render() {
        return(
            <div>
                <Link to='/dashboard'>Back to Dashboard</Link>
                <Wrapper>
                    <Game 
                        multiplayer 
                        userWpm={this.handleSetUserWpm.bind(this)} 
                        opponentWpm={this.handleSetOpponentWpm.bind(this)} 
                        opponentName={this.handleSetOpponentName.bind(this)}/>
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

export default connect(mapStateToProps, { fetchUser })(Multiplayer);