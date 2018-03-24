import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchLeaderboardScores } from '../../actions';
import TopScore from './TopScore';
import Loading from '../../styles/Loading';
import { Link } from 'react-router-dom';

class Leaderboard extends Component {

    async componentDidMount() {
        await this.props.fetchLeaderboardScores();
    }

    renderScores() {
        return this.props.scores.map(score => <TopScore key={score._id} topScore={score} />)
    }

    render() {
        if(!this.props.scores) {
            return <Loading />
        }
        return (
            <div>
                <Link to='/dashboard'>Back to Dashboard</Link>
                {this.renderScores()}
            </div>
        );
    }
}

//TODO: might not need the state.
function mapStateTopProps({ scores }) {
    return { scores };
}

export default connect(mapStateTopProps, { fetchLeaderboardScores })(Leaderboard);