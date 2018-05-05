import styled from 'react-emotion';

export default {
    Table: styled('table')`
        width: 100%;
        tr:nth-child(odd) {
            background-color: rgba(90,125,124, 0.1);        
        }
        td {
            padding: 5px;
        }
        th {
            padding: 5px;
        }
    `,
    Tr: styled('tr')`
        text-align: left;
    `,
    LeaderboardContainer: styled('div')`
        max-width: 500px;
        width: 80%;
        margin: 0 auto;
        color: #FFFFFF;
    `,
    TopTodayButton: styled('button')`
        cursor: pointer;
        color: #FFFFFF;
        border: none;
        outline: none;
        width: 50%;
        background-color: ${props => (props.active !== 'topScores') ? 
            'rgba(91, 155, 102, 1)' : 
            'rgba(91, 155, 102, 0.1)'
        };
    `,
    TopAllButton: styled('button')`
        cursor: pointer;
        color: #FFFFFF;
        border: none;
        outline: none;
        width: 50%;
        background-color: ${props => (props.active === 'topScores') ? 
            'rgba(91, 155, 102, 1)' : 
            'rgba(91, 155, 102, 0.1)'
        };
    `
}