import React from 'react';
import { connect } from 'react-redux';
import StatsOverview from './StatsOverview';
import PlayButtons from './PlayButtons';
import TopScores from './TopScores';
import Loading from '../../styles/Loading';
import CssGrid from '../../styles/CssGrid';

//TODO: This should be the container connected to redux.
//all of the child comps will use the same schemas anyway.

const Dashboard = ({ user }) => {

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

    return(
        <GridContainer>
            {!user && <Loading />}
            <GridItem className={item1}>
                <StatsOverview />
            </GridItem>
            <GridItem className={item2}>
                <PlayButtons />
            </GridItem>
            <GridItem className={item3}>
                
            </GridItem>
            <GridItem className={item4}>
                
            </GridItem>
            <GridItem className={item5}>
                
            </GridItem>
            <GridItem className={item6}>
                <TopScores />
            </GridItem>
        </GridContainer>
    );
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps)(Dashboard);