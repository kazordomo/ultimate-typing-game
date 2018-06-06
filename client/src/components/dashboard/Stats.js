import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStatsIfNeeded } from '../../actions';
import Stat from './Stat';
import Title from '../../styles/Title';
import Loading from '../../styles/Loading';
import GoBack from '../basic/GoBack';
import styled from 'react-emotion';
import UserTopScores from './UserTopScores';
import Chart from './Chart';

const StatsContainer = styled('div')`
    width: 600px;
    margin: 0 auto;
    color: #FFFFFF;
    font-size: 20px;
`;

const Wrapper = styled('div')`
    width: 100%;
`;

const GeneralStats = styled('div')`
    display: grid;
    grid-gap: 10px;
    grid-template: repeat(4, 1fr) / repeat(2, 1fr);
    grid-auto-flow: row;
`;

class Stats extends Component {

    async componentDidMount() {
        const { match, fetchStatsIfNeeded } = this.props;
        const isExternalBool = (match.params.isExternal === 'true') ? true : false;
        await fetchStatsIfNeeded(match.params.id, isExternalBool);
    }

    sortChartData() {
        return this.props.stats.scores
            .sort((a, b) => new Date(a['scoreDate']) - new Date(b['scoreDate']))
            .slice(-20).map(score => { return { wpm: score.correctWords } });
    }

    render() {
        if(!this.props.stats.isFetched)
            return <Loading />
        let { stats: { data } } = this.props;
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
                    <Chart width={600} height={200} data={this.sortChartData()} />   
                    <UserTopScores topFive={this.props.stats.data.topFive} />
                </Wrapper>
            </StatsContainer>
        )
    }
}

function mapStateToProps({ stats }) {
    return { stats };
}

export default connect(mapStateToProps, { fetchStatsIfNeeded })(Stats);