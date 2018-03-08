import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'react-emotion';
import { postWords } from '../../actions';
import Wrapper from '../../styles/Wrapper';
import Button from '../../styles/Button';

const inputStyle = css`
    width: 500px;
    padding: 15px;
    background: #FFFFFF;
    font-size: 20px;
`;

const WordsContainer = styled('div')`
    width: 60%;
    margin: 0 auto;
    padding: 40px;
    border: 1px solid #ffffff;
`;

const WordInList = styled('span')`
    margin-right: 10px;
`;


class AddEditWordList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            words: []
        }
        this.handleAddListName = this.handleAddListName.bind(this);
        this.handleAddWord = this.handleAddWord.bind(this);
        this.handleSaveList = this.handleSaveList.bind(this);
    }

    handleAddListName() {
        this.setState({ name: this.refs.nameTextInput.value });
    }

    handleAddWord() {
        let words = this.state.words;
        words.push(this.refs.wordTextInput.value);
        this.setState({ words }, () => { this.refs.wordTextInput.value = '';});
    }

    handleSaveList() {
        const { name, words } = this.state;
        const wordList = { name, words };
        this.props.postWords(wordList)
    }

    renderWords() {
        let id = 0;
        return this.state.words.map(word => {
            id++;
            return <WordInList key={id}>{word}</WordInList>;
        });
    }

    render() {
        return(
            <div>
                <Wrapper>
                <input type='text' ref='nameTextInput' onChange={this.handleAddListName} placeholder='List Name' className={inputStyle} />
                    <input type='text' ref='wordTextInput' placeholder='Word To Add' className={inputStyle} />
                    <div>
                        <Button onClick={this.handleAddWord}>Add Word</Button>
                    </div>
                    <div>
                        <Button onClick={this.handleSaveList}>Save List</Button>
                    </div>
                </Wrapper>
                <WordsContainer>
                    {this.renderWords()}
                </WordsContainer>
            </div>
        );
    }
}

export default connect(null, { postWords })(AddEditWordList);