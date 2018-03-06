import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserScores, fetchUser } from '../../actions';

const TopScore = (score) => {
    return <div>{score.correctWords}</div>
};

class TopScores extends Component {

    async componentDidMount() {
        // await this.props.fetchUserScores(this.props.user._id);
    }

    // renderScores() {
    //     if(!this.props.user)
    //         return null;
    //     //could do this on the server.
    //     let topFive = this.props.scores.sort((a, b) => {
    //         return a.correctWords - b.correctWords;
    //     }).splice(0, 5);

    //     console.log(topFive);
    //     return topFive.map(score => <TopScore score={score} />);
    // }

    render() {
        return (
            <div>
                TopFive
            </div>
        );
    }
}

function mapStateToProps({ user, scores }) {
    return {user, scores};
}

export default connect(mapStateToProps, { fetchUserScores, fetchUser })(TopScores)