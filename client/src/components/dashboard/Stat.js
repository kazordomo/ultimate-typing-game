import React from 'react';
import styled from 'react-emotion';
import Row from '../../styles/Row';

const StatTitle = styled('span')`
    color: #A0C1D1;
    margin-right: 20px;
`;

export default ({ label, stat }) => 
    <Row><StatTitle>{label}:</StatTitle>{stat}</Row>
