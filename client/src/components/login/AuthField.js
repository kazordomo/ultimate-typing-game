import React from 'react';
import Input from '../../styles/Input';
import styled, { css, keyframes } from 'react-emotion';

// const Label = styled('label')({
//     fontSize: '20px'
// });

const FormGroup = styled('div')`
    position: relative;
    margin-bottom: 10px; 
`;

const ErrorMessage = styled('span')`
    position: absolute;
    top: 20px;
    color: red;
`;

const blink = keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
`;

const cursor = css`
    position: relative;
    i {
        position: absolute;
        width: 1px;
        height: 30%;
        background-color: green;
        left: 16px;
        top: 20%;
        animation ${blink} 1000ms infinite;
        opacity: 1;
    }
`;

export default ({ input, label, type, meta: { touched, error } }) => {
    function renderErrorMessage() {
        return (touched && error) ? 
            <ErrorMessage><i className="fas fa-exclamation-triangle"></i> {error}</ErrorMessage> : '';
    }

    return (
        <FormGroup>
            {/* <div><Label>{label}</Label></div> */}
            {renderErrorMessage()}
            <div className={cursor}>
                <Input {...input} type={type} touchOnBlur={false} placeholder={label} />
                <i></i>
            </div>
        </FormGroup>
    );
}