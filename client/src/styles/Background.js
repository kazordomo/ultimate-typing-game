import styled from 'react-emotion';

export default styled('div')`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
    background-color: ${props => props.main ? '#111c2d' : '#000000'};
`;