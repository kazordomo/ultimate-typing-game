import React from 'react';
import styled, { css } from 'react-emotion';
import { Link } from 'react-router-dom';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import Star from './Star';

const ItemInList = styled('span')`
    display: flex;
    justify-content: space-between;
    padding: 4px;
    font-size: 15px;
    background-color: #232C33;
    color: #FFFFFF;
    border-radius: 2px;
    cursor: pointer;
`;

const linkStyle = css`
    color: #FFFFFF;
    text-decoration: none;
`;

export default (props) => {
    return (
        <ItemInList>
            <span>
                <Link 
                    className={linkStyle} 
                    to={`/wordList/preview/${props.item._id}`}>
                    {props.item.name}
                </Link>
            </span>
            <Rater total={5} rating={props.item.rating} interactive={false} onRate={() => console.log("HEJ")}>
                <Star />
            </Rater>
            {/* <span>{props.item.labels.map(label => label)}</span> */}
            {/* {   
                props.bools.isUserList ? '' : 
                    props.bools.isUserFavored ? 
                        <span onClick={() => props.deleteList(props.item)}>
                            <I className="fas fa-star"></I>
                        </span> :
                        <span onClick={() => props.favorList(props.item)}>
                            <I className="far fa-star"></I>
                        </span>
            } */}
        </ItemInList>
    );
}