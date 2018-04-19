import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStatsIfNeeded, fetchUserIfNeeded } from '../../actions';
import Stat from './Stat';
import Title from '../../styles/Title';
import Loading from '../../styles/Loading';
import GoBack from '../basic/GoBack';
import styled from 'react-emotion';
import { LineChart, Line, Tooltip } from 'recharts';

const StatsContainer = styled('div')`
    color: #FFFFFF;
    font-size: 20px;
`;

class Stats extends Component {

    async componentDidMount() {
        await this.props.fetchStatsIfNeeded(this.props.match.params.id);
    }

    sortChartData() {
        return this.props.stats.scores.map(score => {
            return { wpm: score.correctWords };
        });

    }

    render() {
        if(!this.props.stats.isFetched)
            return <Loading />
        let { stats: { stats } } = this.props;
        return (
            <StatsContainer>
                <Title>Statistics</Title>
                <GoBack goTo='/dashboard' />
                <Stat label={'Average WPM'} stat={stats.wpm} />
                <Stat label={'Total Games'} stat={stats.totalGames} />
                <Stat label={'Total Correct Words'} stat={stats.correctWords} />
                <Stat label={'Total Incorrect Words'} stat={stats.incorrectWords} />
                <Stat label={'Total Keystrokes'} stat={stats.keystrokes} />
                <Stat label={'Total Perfect Games'} stat={stats.totalPerfectGames} />
                <Stat label={'Total Multiplayer Games'} stat={stats.totalMultiplayerGames} />
                <Stat label={'Total Multiplayer Wins'} stat={stats.totalMultiplayerWins} />
                <LineChart width={400} height={200} data={this.sortChartData()}>
                    <Tooltip/>
                    <Line type="monotone" dataKey="wpm" stroke="#8884d8" />
                </LineChart>
            </StatsContainer>
        )
    }
}

function mapStateToProps({ user, stats }) {
    return { user, stats };
}

export default connect(mapStateToProps, { fetchStatsIfNeeded, fetchUserIfNeeded })(Stats);