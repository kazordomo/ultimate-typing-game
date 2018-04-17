import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserStatsIfNeeded } from '../../actions';
import Loading from '../../styles/Loading';
import GoBack from '../utils/GoBack';
import styled from 'react-emotion';
import Row from '../../styles/Row';

const StatsContainer = styled('div')`
    color: #FFFFFF;
    font-size: 20px;
`;

const StatTitle = styled('span')`
    margin-right: 20px;
`;

class UserStats extends Component {

    async componentDidMount() {
        await this.props.fetchUserStatsIfNeeded();
    }

    render() {
        if(!this.props.userStats.isFetched)
            return <Loading />
        let { userStats: { stats } } = this.props;
        return (
            <StatsContainer>
                <GoBack goTo='/dashboard' />
                <Row><StatTitle>Average WPM:</StatTitle>{stats.wpm}</Row>
                <Row><StatTitle>Total Correct Words: </StatTitle>{stats.correctWords}</Row>
                <Row><StatTitle>Total Incorrect Words: </StatTitle>{stats.incorrectWords}</Row>
                <Row><StatTitle>Total Keystrokes: </StatTitle>{stats.keystrokes}</Row>
                <Row><StatTitle>Total Multiplayer Games: </StatTitle>{stats.totalMultiplayerGames}</Row>
                <Row><StatTitle>Total Multiplayer Wins: </StatTitle>{stats.totalMultiplayerWins}</Row>
            </StatsContainer>
        )
    }
}

function mapStateToProps({ userStats }) {
    return { userStats };
}

export default connect(mapStateToProps, { fetchUserStatsIfNeeded })(UserStats);