import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchLeaderboardScores } from '../../actions';
import styled from 'react-emotion';
import TopScore from './TopScore';
import Loading from '../../styles/Loading';
import Title from '../../styles/Title';
import GoBack from '../utils/GoBack';
import { Link } from 'react-router-dom';

const LeaderboardContainer = styled('div')`
    max-width: 500px;
    width: 80%;
    margin: 0 auto;
    color: #FFFFFF;
`;

class Leaderboard extends Component {

    async componentDidMount() {
        await this.props.fetchLeaderboardScores();
    }

    renderScores() {
        let position = 0;
        return this.props.scores.map(score => { position++; return <TopScore key={score._id} topScore={score} />; });
    }

    render() {
        if(!this.props.scores) {
            return <Loading />
        }
        return (
            <div>
                <GoBack goTo='/dashboard' />
                <Title>Leaderboard</Title>
                <LeaderboardContainer>
                    {this.renderScores()}
                </LeaderboardContainer>
            </div>
        );
    }
}

//TODO: might not need the state.
function mapStateTopProps({ scores }) {
    return { scores };
}

export default connect(mapStateTopProps, { fetchLeaderboardScores })(Leaderboard);