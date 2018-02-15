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

export default ({ input, label, type }) => {
    return (
        <div>
            <div><label className={labelStyle} >{label}</label></div>
            <input className={inputStyle} {...input} type={type} />
        </div>
    );
}