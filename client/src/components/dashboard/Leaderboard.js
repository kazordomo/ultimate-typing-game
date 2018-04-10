import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchTopScores } from '../../actions';
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
        await this.props.fetchTopScores();
        console.log(this.props);
    }

    renderScores() {
        const { topScores: { leaderboards } } = this.props; //TODO: add leaderboards as items on leaderboard object.
        let position = 0;
        return leaderboards[this.state.currentLeaderboard].map(score => { position++; return <TopScore key={score._id} topScore={score} />; });
    }

    handleChangeLeaderboard(leaderboard) {
        console.log(leaderboard);
    }

    render() {
        if(!this.props.topScores.isFetched) {
            return <Loading />
        }
        return (
            <div>
                <GoBack goTo='/dashboard' />
                <Title>Leaderboard</Title>
                <LeaderboardContainer>
                    <div>
                        <button>TopScores</button>
                        <button>TopToday</button>
                    </div>
                    {this.renderScores()}
                </LeaderboardContainer>
            </div>
        );
    }
}

//TODO: might not need the state.
function mapStateTopProps({ topScores }) {
    return { topScores };
}

export default connect(mapStateTopProps, { fetchTopScores })(Leaderboard);