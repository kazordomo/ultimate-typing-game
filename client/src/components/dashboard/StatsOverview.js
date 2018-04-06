import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stat from './Stat';
import { fetchUserScores, fetchUserIfNeeded } from '../../actions';

class StatsOverview extends Component {

    render() {
        return (
            <div>
                <Stat />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { fetchUserScores, fetchUserIfNeeded })(StatsOverview)