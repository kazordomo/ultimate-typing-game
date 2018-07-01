import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import { Link } from 'react-router-dom';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import Star from './Star';

const ItemInList = styled('span')`
    position: relative;
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

const OpenCloseLabels = styled('i')`
    position: absolute;
    z-index: 1000;
    bottom: -12px;
    left: 49%;
    font-size: 22px;
`;

const Labels = styled('div')`
    position: absolute;
    z-index: 999;
    height: ${props => props.isOpen ? 'auto' : '0px'};
    transition: all .2s ease-in-out;
    overflow: hidden;
`;

const Label = styled('span')`
    margin-right: 2px;
    padding: 2px 5px;
    background-color: rgba(202, 205, 209, 1);
    font-size: 15px;
`;

class GlobalWordListItem extends Component {

    state = {
        labelsIsOpen: false,
    }

    openCloseLabels() {
        this.setState({ labelsIsOpen: !this.state.labelsIsOpen });
    }
    
    render() {
        return (
            <div>
                <ItemInList>
                    <span>
                        <Link 
                            className={linkStyle} 
                            to={`/wordList/preview/${this.props.item._id}`}>
                            {this.props.item.name}
                        </Link>
                    </span>
                    <Rater total={5} rating={this.props.item.rating} interactive={false}>
                        <Star />
                    </Rater>
                    <OpenCloseLabels onClick={this.openCloseLabels.bind(this)} className="fas fa-caret-down"></OpenCloseLabels>
                </ItemInList>
                <Labels isOpen={this.state.labelsIsOpen}>
                    { this.props.item.labels.map(label => <Label key={label}>{label}</Label>) }
                </Labels>
            </div>
        );
    }
}

export default GlobalWordListItem;