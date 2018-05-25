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
    color: #5A7D7C;
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

const Close = styled('div')`
    color: #FFFFFF;
    font-size: 16px;
    cursor: pointer;
`;

const Open = styled('div')`
    position: absolute;
    color: #FFFFFF;
    cursor: pointer;
    transition: all .3s cubic-bezier(0.600, -0.280, 0.735, 0.045);
    i {
        font-size: 20px;
        margin-right: 8px;
    }
`;

const SetClock = styled('div')`
    position: relative;
    i {
        top: 25px;
        position: absolute;
    }
    input[type="number"] {
        width: 75px;
        padding: 10px 20px;
        background: transparent;
        border: none;
        outline: none;
        color: #EDF257;
        font-size: 30px;
        text-align: center;
        ::-webkit-inner-spin-button, 
        ::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
        }
    }
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
                        isGlobalBoolean={isGlobal}
                        handleDeleteWordList={this.props.deleteWordList}>
                    </WordListItem>
                );
            })
        );
    }

    openCloseWordList() {
        this.setState({ wordListActive: !this.state.wordListActive });
    }

    render() {
        let listStyle = { right: '-350px' };
        let openIcon = { marginLeft: '-95px' };
        if(this.state.wordListActive) {
            listStyle = { right: '0px' };
            openIcon = { marginLeft: '360px' };
        }
        return (
            <div>
                <SideBarContainer style={listStyle}>
                    <Open onClick={this.openCloseWordList.bind(this)} style={openIcon}>
                        <i className="fas fa-caret-left"></i>
                        Open
                    </Open>
                    <Close onClick={this.openCloseWordList.bind(this)}>
                        <i className="fas fa-times"></i>
                    </Close>
                    <SubTitle>Game Settings</SubTitle>
                    <GameSettingsWrapper>
                        <SetClock>
                            <i className="fas fa-clock"></i>
                            <input 
                                type='number'
                                defaultValue={this.props.time}
                                ref='timeInput'
                                onChange={() => this.props.changeTime({target: 'time', value: this.refs.timeInput.value})}
                            />
                        </SetClock>
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