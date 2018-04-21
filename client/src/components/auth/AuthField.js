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

export default ({ name, label, type, onChange, value }) => {
    return (
        <FormGroup>
            <input 
                name={name}
                className={textInputStyle} 
                type={type} 
                placeholder={label} 
                onChange={onChange} 
                value={value} />
        </FormGroup>
    );
}