import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserStatsIfNeeded } from '../../actions';
import Stat from './Stat';
import Loading from '../../styles/Loading';
import GoBack from '../utils/GoBack';
import styled from 'react-emotion';
import { LineChart, Line, Tooltip } from 'recharts';

const StatsContainer = styled('div')`
    color: #FFFFFF;
    font-size: 20px;
`;

class UserStats extends Component {

    async componentDidMount() {
        await this.props.fetchUserStatsIfNeeded();
    }

    sortChartData() {
        return this.props.userStats.scores.map(score => {
            return { wpm: score.correctWords };
        });

    }

    render() {
        if(!this.props.userStats.isFetched)
            return <Loading />
        let { userStats: { stats } } = this.props;
        return (
            <StatsContainer>
                <GoBack goTo='/dashboard' />
                <Stat label={'Average WPM'} stat={stats.wpm} />
                <Stat label={'Total Games'} stat={stats.totalGames} />
                <Stat label={'Total Correct Words'} stat={stats.totalCorrectWords} />
                <Stat label={'Total Incorrect Words'} stat={stats.totalIncorrectWords} />
                <Stat label={'Total Keystrokes'} stat={stats.keystrokes} />
                <Stat label={'Total Multiplayer Games'} stat={stats.totalMultiplayerGames} />
                <Stat label={'Total Multiplayer Wins'} stat={stats.totalMultiplayerWins} />
                <LineChart width={400} height={400} data={this.sortChartData()}>
                    <Tooltip/>
                    <Line type="monotone" dataKey="wpm" stroke="#8884d8" />
                </LineChart>
            </StatsContainer>
        )
    }
}

function mapStateToProps({ userStats }) {
    return { userStats };
}

export default connect(mapStateToProps, { fetchUserStatsIfNeeded })(UserStats);