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

// const blink = keyframes`
//     from { opacity: 1; }
//     to { opacity: 0; }
// `;

// const cursor = css`
//     position: relative;
//     i {
//         position: absolute;
//         width: 5px;
//         height: 30%;
//         background-color: #20C20E;
//         left: 11px;
//         top: 20%;
//         animation ${blink} 800ms infinite;
//         opacity: 1;
//     }
// `;

export default ({ input, label, type, meta: { touched, error } }) => {
    function renderErrorMessage() {
        return (touched && error) ? 
            <ErrorMessage><i className="fas fa-exclamation-triangle"></i> {error}</ErrorMessage> : '';
    }

    return (
        <FormGroup>
            {renderErrorMessage()}
            <Input {...input} type={type} touchOnBlur={false} placeholder={label} />
            {/* <div className={cursor}>
                <Input {...input} type={type} touchOnBlur={false} placeholder={label} />
                <i></i>
            </div> */}
        </FormGroup>
    );
}