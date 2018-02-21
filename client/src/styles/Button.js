import styled from 'react-emotion';

//TODO: remove props if we find no use for them.
export default styled('button')`
    margin-bottom: ${props => props.auth ? '0px' : '15px'};
    padding: ${props => props.auth ? '10px 15px' : '15px 5px'};
    font-weight: 700;
    background-color: ${props => props.auth ? '#181919' : '#2b2b2b'};
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
`;