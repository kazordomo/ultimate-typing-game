import React from 'react';
import styled from 'react-emotion';

const ActiveWord = styled('span')`
    margin-right: ${props => props.first ? '0px' : '25px'};
    color: #FFFFFF;
`;

const HighLight = styled('span')`
    margin-right: 10px;
    padding: 5px 15px;
    background: rgba(90, 125, 124, 0.4);
    border-radius: 2px;
`;

export default ({ words }) => {
    return (
        <div>
            <HighLight><ActiveWord first>{words[0]}</ActiveWord></HighLight>
            <ActiveWord>{words[1]}</ActiveWord>
            <ActiveWord>{words[2]}</ActiveWord>
            <ActiveWord>{words[3]}</ActiveWord>
            <ActiveWord>{words[4]}</ActiveWord>
        </div>
    );
}