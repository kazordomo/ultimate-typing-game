import React from 'react';
import styled, { css } from 'react-emotion';

const FormGroup = styled('div')`
    position: relative;
    margin-bottom: 10px; 
`;

const textInputStyle = css`
    width: 100%;
    color: #5A7D7C;
    background: transparent;
    border: none;
    outline: none;
    box-sizing: border-box;
`;

export default ({ input, label, type }) => {
    return (
        <FormGroup>
            {/* touchOnBlur={false}  */}
            <input className={textInputStyle} {...input} type={type} placeholder={label} />
        </FormGroup>
    );
}