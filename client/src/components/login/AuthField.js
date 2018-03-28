import React from 'react';
import styled, { css } from 'react-emotion';

const FormGroup = styled('div')`
    position: relative;
    margin-bottom: 10px; 
`;

//unused atm.
const ErrorMessage = styled('span')`
    position: absolute;
    left: -20px;
    color: red;
    font-size: 15px;
    i {
        color: red;
    }
`;

const textInputStyle = css`
    width: 100%;
    color: #5A7D7C;
    background: transparent;
    border: none;
    outline: none;
    box-sizing: border-box;
`;

//unused atm.
export default ({ input, label, type, meta: { touched, error } }) => {
    function renderErrorMessage() {
        return (touched && error) ? 
            <ErrorMessage><i className="fas fa-exclamation-triangle"></i></ErrorMessage> : '';
    }

    return (
        <FormGroup>
            {/* touchOnBlur={false}  */}
            <input className={textInputStyle} {...input} type={type} placeholder={label} />
        </FormGroup>
    );
}