import React from 'react';
import styled from 'react-emotion';

const ActiveWord = styled('span')`
    margin-right: 15px;
`;

export default ({ words }) => {
    return (
        <div>
            <ActiveWord>{words[0]}</ActiveWord>
            <ActiveWord>{words[1]}</ActiveWord>
            <ActiveWord>{words[2]}</ActiveWord>
            <ActiveWord>{words[3]}</ActiveWord>
            <ActiveWord>{words[4]}</ActiveWord>
        </div>
    );
}