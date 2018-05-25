import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'react-emotion';

const ListItem = styled('div')`
    position: relative;
    margin-bottom: 10px;
    color: #FFFFFF;
    background-color: rgba(0,0,0,0.1);
    text-align: center;
    text-decoration: none;
    cursor: pointer;
`;

const linkStyle = css`
    float: right;
    color: #FFFFFF;
    text-decoration: none;
    text-align: center;
`;

const IconWrapper = styled('span')`
    position: absolute;
    right: 0;
`;

const I = styled('i')`
    margin-left: 10px;
    font-size: 18px;
    color: ${props => props.color ? props.color : '#FFFFFF' };
`;

export default props => {
    const href = `/game/wordList/edit/${props.wordListObj._id}`;
    return(
        <div>
            <ListItem onClick={ () => props.chooseWordList() }>
                {props.wordListObj.name}
                <IconWrapper>
                    { props.isGlobalBoolean ? '' : 
                        <I 
                            className='fas fa-trash-alt' 
                            color='#FFFFFF'
                            onClick={() => props.handleDeleteWordList(props.wordListObj._id)}>
                        </I> }
                    { props.isGlobalBoolean ? 
                        <I className='fas fa-star' color='#EDF257'></I> : 
                        <Link className={linkStyle} to={href} ><I className='fas fa-edit'></I></Link> }
                </IconWrapper>
            </ListItem>
        </div>
    );
}
