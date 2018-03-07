import React from 'react';
import Input from '../../styles/Input';
import styled from 'react-emotion';

//TODO: only show error message on submit.
const FormGroup = styled('div')`
    position: relative;
    margin-bottom: 10px; 
`;

const ErrorMessage = styled('span')`
    position: absolute;
    top: -20px;
    color: red;
    font-size: 15px;
    i {
        color: red;
    }
`;

export default ({ input, label, type, meta: { touched, error } }) => {
    function renderErrorMessage() {
        return (touched && error) ? 
            <ErrorMessage><i className="fas fa-exclamation-triangle"></i> {error}</ErrorMessage> : '';
    }

    return (
        <FormGroup>
            {renderErrorMessage()}
            <Input {...input} type={type} touchOnBlur={false} placeholder={label} />
        </FormGroup>
    );
}