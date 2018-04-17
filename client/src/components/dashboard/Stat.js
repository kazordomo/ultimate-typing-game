import React from 'react';
import styled from 'react-emotion';
import Row from '../../styles/Row';

const StatTitle = styled('span')`
    margin-right: 20px;
`;

export default ({ label, stat }) => <Row><StatTitle>{label}:</StatTitle>{stat}</Row>;
