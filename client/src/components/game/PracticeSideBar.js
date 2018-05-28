import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WordListItem from './WordListItem';
import PracticeStyles from '../../styles/PracticeStyles';

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
        const { 
            SideBarContainer,
            SubTitle,
            linkStyle,
            ListWrapper,
            Close,
            Open,
            SetClock,
            GameSettingsWrapper,
        } = PracticeStyles;

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