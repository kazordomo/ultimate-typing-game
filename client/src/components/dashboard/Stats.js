import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStatsIfNeeded } from '../../actions';
import Stat from './Stat';
import Title from '../../styles/Title';
import Loading from '../../styles/Loading';
import GoBack from '../basic/GoBack';
import styled from 'react-emotion';
import LeaderboardStyles from '../../styles/LeaderboardStyles';
import TopScore from './TopScore';
import { LineChart, Line, Tooltip } from 'recharts';

const StatsContainer = styled('div')`
    color: #FFFFFF;
    font-size: 20px;
`;

const Wrapper = styled('div')`
    width: 100%;
`;

const GeneralStats = styled('div')`
    width: 30%;
    float: left;
`;

const ChartWrapper = styled('div')`
    width: 70%;
    float: right;
    // background: rgba(0, 0, 0, 0.1);
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

    renderScores() {
        let position = 1;
        return this.props.stats.data.topFive.map(score => { 
            score.position = position++; 
            return <TopScore 
                isUserTopScores
                key={score._id} 
                topScore={score} />; 
        });
    }

    render() {
        if(!this.props.stats.isFetched)
            return <Loading />
        let { stats: { data } } = this.props;
        const { Table, Tr } = LeaderboardStyles;
        return (
            <StatsContainer>
                <Title>Statistics</Title>
                <GoBack goBackOne goBackFunc={() => this.props.history.goBack()} />
                <Wrapper>
                    <GeneralStats>    
                        <Stat label={'Average WPM'} stat={data.wpm} />
                        <Stat label={'Games'} stat={data.totalGames} />
                        <Stat label={'Correct Words'} stat={data.correctWords} />
                        <Stat label={'Incorrect Words'} stat={data.incorrectWords} />
                        <Stat label={'Keystrokes'} stat={data.keystrokes} />
                        <Stat label={'Perfect Games'} stat={data.totalPerfectGames} />
                        <Stat label={'Multiplayer Games'} stat={data.totalMultiplayerGames} />
                        <Stat label={'Multiplayer Wins'} stat={data.totalMultiplayerWins} />
                    </GeneralStats>   
                    <ChartWrapper>
                        <LineChart width={400} height={300} data={this.sortChartData()}>
                            <Tooltip/>
                            <Line type="monotone" dataKey="wpm" stroke="#8884d8" />
                        </LineChart>
                    </ChartWrapper>
                </Wrapper>
                <Table>
                    <tbody>
                        <Tr>
                            <th>Pos.</th>
                            <th>WPM</th>
                            <th>Date.</th>
                        </Tr>
                        {this.renderScores()}
                    </tbody>
                </Table>
            </StatsContainer>
        )
    }
}

function mapStateToProps({ stats }) {
    return { stats };
}

export default connect(mapStateToProps, { fetchStatsIfNeeded })(Stats);