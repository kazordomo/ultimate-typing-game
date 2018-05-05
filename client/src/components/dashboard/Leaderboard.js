import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchTopScoresIfNeeded } from '../../actions';
import TopScore from './TopScore';
import Loading from '../../styles/Loading';
import Title from '../../styles/Title';
import GoBack from '../basic/GoBack';
import LeaderboardStyles from '../../styles/LeaderboardStyles';

class Leaderboard extends Component {

    state = {
        currentLeaderboard: 'topScores'
    }

    componentDidMount() {
        this.props.fetchTopScoresIfNeeded();
    }

    renderScores() {
        const { topScores: { leaderboards } } = this.props;
        let position = 1;
        return leaderboards[this.state.currentLeaderboard].map(score => { 
            score.position = position++; 
            return <TopScore 
                key={score._id} 
                topScore={score} />; 
        });
    }

    handleChangeLeaderboard(leaderboard) {
        this.setState({ currentLeaderboard: leaderboard });
    }

    render() {
        if(!this.props.topScores.isFetched) {
            return <Loading />
        }

        const { 
            Table, 
            Tr, 
            LeaderboardContainer,
            TopTodayButton,
            TopAllButton 
        } = LeaderboardStyles;
        return (
            <div>
                <GoBack goTo='/dashboard' />
                <Title>Leaderboard</Title>
                <LeaderboardContainer>
                    <div>
                        <TopAllButton active={this.state.currentLeaderboard} onClick={() => this.handleChangeLeaderboard('topScores')}>Top All</TopAllButton>
                        <TopTodayButton active={this.state.currentLeaderboard} onClick={() => this.handleChangeLeaderboard('topScoresToday')}>Top Today</TopTodayButton>
                    </div>
                    <Table>
                        <tbody>
                            <Tr>
                                <th>Pos.</th>
                                <th>Player</th>
                                <th>WPM</th>
                                <th>Date.</th>
                            </Tr>
                            {this.renderScores()}
                        </tbody>
                    </Table>
                </LeaderboardContainer>
            </div>
        );
    }
}

function mapStateTopProps({ topScores }) {
    return { topScores };
}

export default connect(mapStateTopProps, { fetchTopScoresIfNeeded })(Leaderboard);