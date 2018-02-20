import React from 'react';
import styled, { css } from 'react-emotion';
import Button from '../styles/Button';
import Background from '../styles/Background';

const GridContainer = styled('div')`
    display: grid;
    grid-template-areas: 'a a a b'
                         'c c d d'
                         'e e e f';
    grid-auto-rows: minmax(30vh, auto);
    grid-gap: 5px;
    padding: 5px;
`;

const GridItem = styled('div')`
    background-color: rgba(26, 27, 28, 0.6);
    padding: 20px;
    border-radius: 4px;
`;

const playerStats = css`
    grid-area: a;
`;

const versusStats = css`
    grid-area: a;
`;

const playButtons = css`
    grid-area: b;
`;

const randomStuff2 = css`
    grid-area: c;
`;

const topFiveGames = css`
    grid-area: d;
`;

const randomStuff = css`
    grid-area: e;
`;

const randomStuff3 = css`
    grid-area: f;
`;

const NestedGrid = styled('div')`
    display: grid;
    grid-template-columns: 1fr;
    // grid-gap: 40px;
    align-items: center;
`;


const Dashboard = () => {
    return(
        <GridContainer>
            <Background />
            <GridItem className={playerStats}></GridItem>
            <GridItem className={playButtons}>
                <NestedGrid>
                    <Button>Singleplayer</Button>
                    <Button>Multiplayer</Button>
                    <Button>Practice</Button>   
                </NestedGrid>                
            </GridItem>
            <GridItem className={versusStats}></GridItem>
            <GridItem className={randomStuff2}></GridItem>
            <GridItem className={topFiveGames}></GridItem>
            <GridItem className={randomStuff}></GridItem>
            <GridItem className={randomStuff3}></GridItem>
        </GridContainer>
    );
}

export default Dashboard;