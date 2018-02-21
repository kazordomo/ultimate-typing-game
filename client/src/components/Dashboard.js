import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'react-emotion';
import Loading from '../styles/Loading';
import { Link } from 'react-router-dom';

//TODO: refactor all of this yo.
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
    background-color: rgba(26, 27, 28, 0.9);
`;

const playButtons = css`
    grid-area: b;
`;

const randomStuff2 = css`
    grid-area: c;
    background-color: rgba(26, 27, 28, 0.9);    
`;

const topFiveGames = css`
    grid-area: d;
`;

const randomStuff = css`
    grid-area: e;
    background-color: rgba(26, 27, 28, 0.9); 
`;

const randomStuff3 = css`
    grid-area: f;
`;

const ButtonGrid = styled('div')`
    display: grid;
    grid-template-columns: 1fr;
    // grid-gap: 40px;
    align-items: center;
`;

const Table = styled('table')`
    width: 100%;
    text-align: left;
    tr {
        height: 20px;
    }
    tr:nth-child(even) {
        background-color: ${props => props.top5 ? '#2b2b2b' : ''};
    }
    th {
        width: 100%;
        padding: 0px 10px 50px 10px;
    }
    td {
        padding: 15px 10px;
    }
`;

const LinkStyle = css`
    margin-bottom: 15px;
    padding: 15px 5px;
    font-weight: 700;
    background-color: #2b2b2b;
    border-radius: 4px;
    text-decoration: none;
    text-align: center;
`;


const Dashboard = ({ user }) => {

    if(!user) {
        return (
            <Loading />
        );
    }

    return(
        <GridContainer>
            <GridItem className={playerStats}>
                <Table>
                    <tbody>
                        <tr>
                            <th>STATS</th>
                        </tr>
                        <tr>
                            <td>LEVEL: {user.level}</td>
                        </tr>
                        <tr>
                            <td>WPM: {user.wpm}</td>
                        </tr>
                        <tr>
                            <td>CORRECT WORDS: {user.correctWords}</td>
                        </tr>
                        <tr>
                            <td>INCORRECT WORDS: {user.wrongWords}</td>
                        </tr>
                        <tr>
                            <td>MULTIPLAYER WINS: {user.multiplayerWins}</td>
                        </tr>
                        <tr>
                            <td>PERFECT GAMES: {user.perfectGames}</td>
                        </tr>
                    </tbody>
                </Table>
            </GridItem>
            <GridItem className={playButtons}>
                <ButtonGrid>
                    <Link to="/game/single" className={LinkStyle}>Singleplayer</Link>   
                    <Link to="/game/versus" className={LinkStyle}>Multiplayer</Link>   
                    <Link to="/game/practice" className={LinkStyle}>Practice</Link>   
                </ButtonGrid>                
            </GridItem>
            <GridItem className={randomStuff2}></GridItem>
            <GridItem className={topFiveGames}></GridItem>
            <GridItem className={randomStuff}></GridItem>
            <GridItem className={randomStuff3}>
                <Table top5>
                    <tbody>
                        <tr>
                            <th>Top 5 Rounds</th>
                        </tr>
                        <tr>
                            <td>118 wpm - 2017/07/21</td>
                        </tr>
                        <tr>
                            <td>118 wpm - 2017/07/21</td>
                        </tr>
                        <tr>
                            <td>118 wpm - 2017/07/21</td>
                        </tr>
                        <tr>
                            <td>118 wpm - 2017/07/21</td>
                        </tr>
                        <tr>
                            <td>118 wpm - 2017/07/21</td>
                        </tr>
                    </tbody>
                </Table>
            </GridItem>
        </GridContainer>
    );
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps)(Dashboard);