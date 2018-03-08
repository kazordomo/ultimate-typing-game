import React from 'react';
import styled from 'react-emotion';

const List = styled('div')`
    width: 100%;
    margin: 10px 0px;
    padding: 10px;
    background-color: blue;
`;

const WordList = (props) => {
    console.log(props);

    return(
        <List></List>
    );
}

export default WordList;