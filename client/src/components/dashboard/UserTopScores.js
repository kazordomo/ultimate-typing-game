import React from 'react';
import TopScore from './TopScore';
import LeaderboardStyles from '../../styles/LeaderboardStyles';

export default props => {
    
    function renderScores() {
        let position = 1;
        return props.topFive.map(score => { 
            score.position = position++; 
            return <TopScore 
                isUserTopScores
                key={score._id} 
                topScore={score} />; 
        });
    }

    const { Table, Tr } = LeaderboardStyles;
    if(!props.topFive.length)
        return '';
    return (
        <Table>
            <tbody>
                <Tr>
                    <th>Pos.</th>
                    <th>WPM</th>
                    <th>Date.</th>
                </Tr>
                {renderScores()}
            </tbody>
        </Table>
    );
}