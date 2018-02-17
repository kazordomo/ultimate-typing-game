import React from 'react';
import styled from 'react-emotion';

// const Label = styled('label')({
//     fontSize: '20px'
// });

const FormGroup = styled('div')({
    position: 'relative',
    marginBottom: '10px' 
});

const Input = styled('input')({
    width: '100%',
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: 'pink',
    fontSize: '20px',
    border: 'none',
    outline: 'none',
    borderRadius: '4px',
    boxSizing: 'border-box'
});

const ErrorMessage = styled('span')({
    position: 'absolute',
    top: '-20px',
    color: 'red'
});

export default ({ input, label, type, meta: { touched, error } }) => {
    function renderErrorMessage() {
        return (touched && error) ? 
            <ErrorMessage><i className="fas fa-exclamation-triangle"></i> {error}</ErrorMessage> : '';
    }

    return (
        <FormGroup>
            {/* <div><Label>{label}</Label></div> */}
            {renderErrorMessage()}
            <Input {...input} type={type} touchOnBlur={false} placeholder={label} />
        </FormGroup>
    );
}