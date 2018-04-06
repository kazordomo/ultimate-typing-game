import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchLeaderboards } from '../../actions';
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

    state = {
        currentLeaderboard: 'topScores'
    }

    async componentDidMount() {
        await this.props.fetchLeaderboards();
        console.log(this.props);
    }

    renderScores() {
        const { leaderboards: { leaderboards } } = this.props; //TODO: add leaderboards as items on leaderboard object.
        console.log(leaderboards);
        let position = 0;
        return leaderboards[this.state.currentLeaderboard].map(score => { position++; return <TopScore key={score._id} topScore={score} />; });
    }

    // handleChangeLeaderboard(leaderboard) {
    //     this.props.selectLeaderboard(leaderboard);
    // }

    render() {
        if(this.props.leaderboards.isFetching) {
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
function mapStateTopProps({ leaderboards }) {
    return { leaderboards };
}

export default connect(mapStateTopProps, { fetchLeaderboards })(Leaderboard);