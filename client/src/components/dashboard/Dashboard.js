import React from 'react';
import { connect } from 'react-redux';
import PlayButtons from './PlayButtons';
import CssGrid from '../../styles/CssGrid';
import { Link } from 'react-router-dom';
import styled, { css } from 'react-emotion';

const linkStyle = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const MainTitle = styled('h1')`
    color: #FFFFFF;
    text-align: center;
    font-size: 40px;
    margin-bottom: 100px;
`;

const SectionTitle = styled('div')`
    position: absolute;
    top: ${props => props.top};
    right: ${props => props.right ? props.right : ''};
    left: ${props => props.left ? props.left : ''};
    background: #FFFFFF;
    padding: 5px 30px;
    border-radius: ${props => props.left ? '4px 0px 4px 4px' : '0px 4px 4px 4px'};
`;

const I = styled('i')`
    color: #FFFFFF;
    font-size: 50px;
`;

const { 
    GridContainer, 
    GridItem, 
    item1, 
    item2, 
    item3, 
    item4, 
    item5, 
} = CssGrid;

const Dashboard = ({ user: { data } }) => {
    return(
        <div>
            <MainTitle>Ultimate Typing Game</MainTitle>
            <GridContainer>
                <GridItem className={item1}>
                    <SectionTitle top={'3%'} left={'-10%'}>Play</SectionTitle>
                    <PlayButtons />
                </GridItem>
                <GridItem className={item2}>
                    <I className="fas fa-align-justify"></I>
                    <SectionTitle top={'5%'} right={'-10%'}>Leaderboard</SectionTitle>
                    <Link to='/leaderboard' className={linkStyle}></Link>
                </GridItem>
                <GridItem className={item3}>
                    <I className="fas fa-user"></I>
                    <SectionTitle top={'3%'} left={'-10%'}>Stats</SectionTitle>
                    <Link to={`/stats/${data._id}/false`} className={linkStyle}></Link>
                </GridItem>
                <GridItem className={item4}>
                    <I className="fas fa-cog"></I>
                    <SectionTitle top={'10%'} right={'-7%'}>Settings</SectionTitle>
                    <Link to='/settings' className={linkStyle}></Link>
                </GridItem>
                <GridItem className={item5}>
                    <I className="fas fa-align-center"></I>
                    <SectionTitle top={'19%'} left={'-5%'}>Word Lists</SectionTitle>
                    <Link to='/wordLists' className={linkStyle}></Link>
                </GridItem>
            </GridContainer>
        </div>
    );
}

function mapStatToProps({ user }) {
    return { user };
}

export default connect(mapStatToProps, null)(Dashboard);