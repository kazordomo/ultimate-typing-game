import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled, { css } from 'react-emotion';
import { showPopupModal } from '../../actions';

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

class WordListItem extends Component {

    // this.props.handleDeleteWordList(this.props.wordListObj._id)

    render() {
        const href = `/game/wordList/edit/${this.props.wordListObj._id}`;
        return(
            <div>
                <ListItem onClick={ () => this.props.chooseWordList() }>
                    {this.props.wordListObj.name}
                    <IconWrapper>
                        { this.props.isGlobalBoolean ? '' : 
                            <I 
                                className='fas fa-trash-alt' 
                                color='#FFFFFF'
                                onClick={() => this.props.dispatch(showPopupModal({
                                    id: 2,
                                    text: 'Are you sure?',
                                    onClose: () => console.log('closing'),
                                    onConfirm: () => this.props.handleDeleteWordList(this.props.wordListObj._id),
                                }))}>
                            </I> }
                        { this.props.isGlobalBoolean ? 
                            <I className='fas fa-star' color='#EDF257'></I> : 
                            <Link className={linkStyle} to={href} ><I className='fas fa-edit'></I></Link> }
                    </IconWrapper>
                </ListItem>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(null, mapDispatchToProps)(WordListItem);

