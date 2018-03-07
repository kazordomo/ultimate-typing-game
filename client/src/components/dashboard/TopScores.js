import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { fetchUserScores } from '../../actions';
import Loading from '../../styles/Loading';

const TopScoreRow = styled('div')`
    margin: 20px 0px;
`;

const TopScoreStatDivider = styled('span')`
    margin: 0px 50px;
`;

const TopScore = ({topScores: { correctWords, scoreDate, _id }}) => {
    return (
        <TopScoreRow>
            <span>{correctWords}</span>
            <TopScoreStatDivider>-</TopScoreStatDivider>
            <span>{scoreDate}</span>
        </TopScoreRow>
    );
};

class TopScores extends Component {

    async componentDidMount() {
        await this.props.fetchUserScores();
    }

    renderScores() {
        return this.props.scores.sort((a, b) => {
            return b.correctWords - a.correctWords;
        })
        .splice(0, 5)
        .map(score => <TopScore key={score._id} topScores={score} />);
    }

    render() {
        if(!this.props.scores) {
            return <Loading />
        }
        return (
            <div>
                TopFive
                {this.renderScores()}
            </div>
        );
    }
}

function mapStateToProps({ user, scores }) {
    return { scores };
}

export default connect(mapStateToProps, { fetchUserScores })(TopScores)