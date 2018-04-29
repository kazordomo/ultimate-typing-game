import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchTopScoresIfNeeded } from '../../actions';
import styled from 'react-emotion';
import TopScore from './TopScore';
import Loading from '../../styles/Loading';
import Title from '../../styles/Title';
import GoBack from '../basic/GoBack';
import { Link } from 'react-router-dom';

const LeaderboardContainer = styled('div')`
    max-width: 500px;
    width: 80%;
    margin: 0 auto;
    color: #FFFFFF;
`;

const Table = styled('table')`
    width: 100%;
    tr:nth-child(odd) {
        background-color: rgba(90,125,124, 0.1);        
    }
    td {
        padding: 5px;
    }
    th {
        padding: 5px;
    }
`;

const Tr = styled('tr')`
    text-align: left;
`;

//TODO: use the base styled Button with outline and border set to none.
const TopAllButton = styled('button')`
    cursor: pointer;
    color: #FFFFFF;
    border: none;
    outline: none;
    width: 50%;
    background-color: ${props => (props.active === 'topScores') ? 'rgba(91, 155, 102, 1)' : 'rgba(91, 155, 102, 0.1)'};
`;

const TopTodayButton = styled('button')`
    cursor: pointer;
    color: #FFFFFF;
    border: none;
    outline: none;
    width: 50%;
    background-color: ${props => (props.active !== 'topScores') ? 'rgba(91, 155, 102, 1)' : 'rgba(91, 155, 102, 0.1)'};
`;

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

//TODO: might not need the state.
function mapStateTopProps({ topScores }) {
    return { topScores };
}

export default connect(mapStateTopProps, { fetchTopScoresIfNeeded })(Leaderboard);