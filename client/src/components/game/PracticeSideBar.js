import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import { Link } from 'react-router-dom';
import WordListItem from './WordListItem';

const SideBarContainer = styled('div')`
    width: 300px;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 30px;
    background-color: #232C33;
    color: #FFFFFF;
    transition: all .3s cubic-bezier(0.600, -0.280, 0.735, 0.045);
    box-shadow: -8px -1px 14px -2px rgba(0,0,0,0.65);
`;

const SubTitle = styled('h1')`
    color: #FFFFFF;
    font-size: 25px;
    text-align: center;
    letter-spacing: 1.2px;
`;

const linkStyle = css`
    display: block;
    width: 80%;
    margin: 0 auto;
    background-color: #5B9B66;
    color: #FFFFFF;
    text-align: center;
    text-decoration: none;
    border-radius: 2px;
`;

const ListWrapper = styled('div')`
    max-height: 80%;
    min-height: 80%;
    overflow: auto;
`;

const OpenClose = styled('div')`
    width: auto;
    position: absolute;
    left: -75px;
    top: 15px;
    background-color: #FFFFFF;
    color: #000000;
    text-align: center;
    font-size: 16px;
    border-radius: 20px 0px 0px 20px;
    cursor: pointer;
    box-shadow: -4px -1px 14px 1px rgba(0,0,0,0.65)
`;

const inputNumberStyle = css`
    width: 75px;
    padding: 10px 20px;
    background: transparent;
    border: none;
    outline: none;
    color: #5A7D7C;
    font-size: 30px;
    text-align: center;
    ::-webkit-inner-spin-button, 
    ::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }
`;

const GameSettingsWrapper = styled('div')`
    text-align: center;
`;

class PracticeSideBar extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            wordListActive: true
        }
    }

    renderWordLists() {
        let { wordLists, user, chooseWordList } = this.props;
        return (
            Object.keys(wordLists).map(key => {
                let isGlobal = false;
                if(wordLists[key]._user !== user.data._id)
                    isGlobal = true;
                return (
                    <WordListItem 
                        key={wordLists[key]._id} 
                        chooseWordList={ () => chooseWordList(wordLists[key]) }
                        wordListObj={wordLists[key]}
                        isGlobalBoolean={isGlobal}>
                    </WordListItem>
                );
            })
        );
    }

    openCloseWordList() {
        this.setState({ wordListActive: !this.state.wordListActive });
    }

    render() {
        let listStyle = { right: '-360px' };
        if(this.state.wordListActive) {
            listStyle = { right: '0px' };
        }
        return (
            <div>
                <SideBarContainer style={listStyle}>
                    <OpenClose onClick={this.openCloseWordList.bind(this)}>
                        {this.state.wordListActive ? 'Close' : 'Open'}
                    </OpenClose>
                    <SubTitle>Game Settings</SubTitle>
                    <GameSettingsWrapper>
                        <div>
                            <i className="fas fa-clock"></i>
                            <input 
                                className={inputNumberStyle}
                                type='number'
                                defaultValue={this.props.time}
                                ref='timeInput'
                                onChange={() => this.props.changeTime({target: 'time', value: this.refs.timeInput.value})}
                            />
                        </div>
                    </GameSettingsWrapper>
                    <SubTitle>Lists</SubTitle>
                    <ListWrapper>{this.renderWordLists()}</ListWrapper>
                    <Link className={linkStyle} to='/game/wordlist/new'>Add new list</Link>
                </SideBarContainer>
            </div>
        );
    }
}

export default PracticeSideBar;