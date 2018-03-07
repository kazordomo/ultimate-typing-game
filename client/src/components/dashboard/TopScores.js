import React from 'react';
import TopScore from './TopScore';

const TopScores = ({ scores }) => {

    function renderScores() {
        return scores.sort((a, b) => {
            return b.correctWords - a.correctWords;
        })
        .splice(0, 5)
        .map(score => <TopScore key={score._id} topScore={score} />);
    }

    return (
        <div>
            TopFive
            {renderScores()}
        </div>
    );
}

export default TopScores;