import styled from 'react-emotion';

export default styled('button')({
    border: 'none',
    outline: 'none',
    borderRadius: '2px',
    cursor: 'pointer',
    }, (props) => ({
        width: props.width ? props.width : '100%',
        padding: props.padding ? props.padding : '10px',
        backgroundColor: props.disabled ? '#849687' : (props.backgroundColor ? props.backgroundColor : '#5B9B66'),
        color: props.disabled ? '#D7DBDA' : (props.color ? props.color : '#FFFFFF'),
        ...props,
    })
);