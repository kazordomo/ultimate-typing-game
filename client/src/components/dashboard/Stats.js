import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStatsIfNeeded } from '../../actions';
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
        const { match, fetchStatsIfNeeded } = this.props;
        const isExternalBool = (match.params.isExternal === 'true') ? true : false;
        await fetchStatsIfNeeded(match.params.id, isExternalBool);
    }

    sortChartData() {
        return this.props.stats.scores.map(score => {
            return { wpm: score.correctWords };
        });
    }

    render() {
        if(!this.props.stats.isFetched)
            return <Loading />
        let { stats: { data } } = this.props;
        return (
            <StatsContainer>
                <Title>Statistics</Title>
                <GoBack goBackOne goBackFunc={() => this.props.history.goBack()} />                
                <Stat label={'Average WPM'} stat={data.wpm} />
                <Stat label={'Total Games'} stat={data.totalGames} />
                <Stat label={'Total Correct Words'} stat={data.correctWords} />
                <Stat label={'Total Incorrect Words'} stat={data.incorrectWords} />
                <Stat label={'Total Keystrokes'} stat={data.keystrokes} />
                <Stat label={'Total Perfect Games'} stat={data.totalPerfectGames} />
                <Stat label={'Total Multiplayer Games'} stat={data.totalMultiplayerGames} />
                <Stat label={'Total Multiplayer Wins'} stat={data.totalMultiplayerWins} />
                <LineChart width={400} height={200} data={this.sortChartData()}>
                    <Tooltip/>
                    <Line type="monotone" dataKey="wpm" stroke="#8884d8" />
                </LineChart>
            </StatsContainer>
        )
    }
}

function mapStateToProps({ stats }) {
    return { stats };
}

export default connect(mapStateToProps, { fetchStatsIfNeeded })(Stats);