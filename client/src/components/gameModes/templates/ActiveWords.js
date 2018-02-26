import React from 'react';

let id = 1; //TODO: refactor

export default ({words}) => {
    return words.map(word => {
        id++;
        return <span key={id}>{word}</span>
    });
}