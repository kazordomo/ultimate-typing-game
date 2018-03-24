import React from 'react';
import TopScore from './TopScore';

const TopScores = ({ scores }) => {

    function renderScores() {
        return scores.map(score => <TopScore key={score._id} topScore={score} />);
    }

    return (
        <div>
            TopFive
            {renderScores()}
        </div>
    );
}

export default TopScores;