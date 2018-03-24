import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserScores } from '../../actions';
import StatsOverview from './StatsOverview';
import PlayButtons from './PlayButtons';
import TopScores from './TopScores';
import Loading from '../../styles/Loading';
import CssGrid from '../../styles/CssGrid';
import { Link } from 'react-router-dom';

const { 
    GridContainer, 
    GridItem, 
    item1, 
    item2, 
    item3, 
    item4, 
    item5, 
    item6
} = CssGrid;

class Dashboard extends Component {

    async componentDidMount() {
        await this.props.fetchUserScores();
    }

    render() {
        if(!this.props.user || !this.props.scores) {
            return <Loading />;
        }
        return(
            <GridContainer>
                <GridItem className={item1}>
                    <StatsOverview />
                </GridItem>
                <GridItem className={item2}>
                    <PlayButtons />
                </GridItem>
                <GridItem className={item3}>
                    <Link to='/leaderboard' >Leaderboard</Link>
                </GridItem>
                <GridItem className={item4}>
                    
                </GridItem>
                <GridItem className={item5}>
                    
                </GridItem>
                <GridItem className={item6}>
                    <TopScores scores={this.props.scores} />
                </GridItem>
            </GridContainer>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { fetchUserScores })(Dashboard);