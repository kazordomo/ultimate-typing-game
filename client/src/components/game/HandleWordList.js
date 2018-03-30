import React, { Component } from 'react';
import styled from 'react-emotion';
import GoBack from '../utils/GoBack';
import Wrapper from '../../styles/Wrapper';
import Button from '../../styles/Button';
import Row from '../../styles/Row';
import textInputStyle from '../../styles/textInput';

const WordsContainer = styled('div')`
    width: 500px;
    margin: 0 auto;
    margin-top: 40px;
`;

const WordsInnerContainer = styled('div')`
    display: grid;
    grid-gap: 10px;
    grid-template: repeat(8, 1fr) / repeat(5, 1fr);
    grid-auto-flow: row;
`;

const WordInList = styled('span')`
    position: relative;
    padding: 4px;
    font-size: 15px;
    background-color: rgba(35, 44, 51, 0.3);
    color: #FFFFFF;
    text-align: center;
    border-radius: 2px;
    i {
        position: absolute;
        top: -3px;
        left: -3px;
        color: #5A7D7C;
        font-size: 13px;
        cursor: pointer;
    }
`;

const WordListInfo = styled('div')`
    margin: 20px 0px;
    padding-bottom: 5px;
    color: #5A7D7C;
    border-bottom: 1px solid #5A7D7C;
    font-size: 15px;
`;

//TODO: SAVE LIST ON UNMOUNT?!

class AddEditWordList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.wordList ? props.wordList.name : '',
            words: props.wordList ? props.wordList.words : []
        }
        this.handleAddListName = this.handleAddListName.bind(this);
        this.handleAddWord = this.handleAddWord.bind(this);
        this.handleDeleteWord = this.handleDeleteWord.bind(this);
    }

    componentDidMount() {
        this.refs.nameTextInput.value = this.state.name;
    }

    componentWillUnmount() {
        //TODO: remake. will kick of the post even if the list gets deleted.
        if(this.props.edit) {
            const { name, words } = this.state;
            this.props.saveList({name, words});
        }

    }

    handleAddListName() {
        this.setState({ name: this.refs.nameTextInput.value });
    }

    handleAddWord() {
        let words = this.state.words;
        words.push(this.refs.wordTextInput.value);
        this.setState({ words }, () => { this.refs.wordTextInput.value = '';});
    }

    handleDeleteWord(index) {
        const words = this.state.words;
        words.splice(index, 1);
        this.setState({ words });
    }

    renderCreateList() {
        if(!this.props.add)
            return '';
        const { name, words } = this.state;
        return <Button onClick={() => this.props.saveList({name, words})}>Create List</Button>
    }

    renderWords() {
        const { words } = this.state;
        let id = 0;
        return words.map(word => {
            id++;
            return (
                <WordInList key={id}>{word}
                    <span onClick={() => this.handleDeleteWord(words.indexOf(word))}>
                        <i className="fas fa-times"></i>
                    </span>
                </WordInList>
            );
        });
    }

    render() {
        return(
            <div>
                <GoBack goTo='/game/practice' />
                <Wrapper>
                    <Row>
                        <input type='text' ref='nameTextInput' onChange={this.handleAddListName} placeholder='List Name' className={textInputStyle} />
                    </Row>
                    <Row>
                        <input type='text' ref='wordTextInput' onKeyPress={event => (event.key === 'Enter') && this.handleAddWord()}  placeholder='Word To Add' className={textInputStyle} />
                    </Row>
                    <Row>
                        <Button onClick={this.handleAddWord}>Add Word</Button>
                    </Row>
                    <Row>
                        {this.renderCreateList()}
                    </Row>
                </Wrapper>
                <WordsContainer>
                    <WordListInfo>Total words: {this.state.words.length}</WordListInfo>
                    <WordsInnerContainer>
                        {this.renderWords()}
                    </WordsInnerContainer>
                </WordsContainer>
            </div>
        );
    }
}

export default AddEditWordList;