import React from 'react';
import styled from 'react-emotion';

const StatTitle = styled('span')`
    color: #FFFFFF;
    margin-right: 20px;
`;

const StatValue = styled('span')`
    color: #8884d8;
`;

const StatWrapper = styled('div')`
    padding: 2px 5px;
    background-color: rgba(90, 125, 124, 0.1);
    border-radius: 3px 0px 3px 0px;
`;


export default ({ label, stat }) => 
    <StatWrapper><StatTitle>{label}:</StatTitle><StatValue>{stat}</StatValue></StatWrapper>
