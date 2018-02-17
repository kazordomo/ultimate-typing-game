import React from 'react';
import { css } from 'emotion';

const labelStyle = css({
    
});

const inputStyle = css({
    width: '100%',
    padding: '15px',
    backgroundColor: 'pink',
    fontSize: '25px',
    border: 'none',
    outline: 'none',
    borderRadius: '4px',
    boxSizing: 'border-box'
});

const errorMessageStyle = css({
    color: 'red'
});

export default ({ input, label, type, meta: { touched, error } }) => {
    function renderErrorMessage() {
        return (touched && error) ? 
            <div className={errorMessageStyle}>{error} <i className="fas fa-exclamation-triangle"></i></div> : '';
    }

    return (
        <div>
            <div><label className={labelStyle} >{label}</label></div>
            <input className={inputStyle} {...input} type={type} />
            {renderErrorMessage()}
        </div>
    );
}