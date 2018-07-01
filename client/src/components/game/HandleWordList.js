import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import Wrapper from '../../styles/Wrapper';
import Button from '../../styles/Button';
import Row from '../../styles/Row';
import textInputStyle from '../../styles/textInput';
import checkboxStyle from '../../styles/checkboxStyle';
import DisplayError from '../basic/DisplayError';

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
    padding: 4px;
    font-size: 15px;
    // background-color: rgba(35, 44, 51, 0.2);
    background-color: #232C33;
    color: #FFFFFF;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
`;

const WordListInfo = styled('div')`
    margin: 20px 0px;
    padding-bottom: 5px;
    color: #5A7D7C;
    border-bottom: 1px solid #5A7D7C;
    font-size: 15px;
`;

const Label = styled('span')`
    margin-right: 5px;
    padding: 2px 15px;
    background-color: rgba(202, 205, 209, 0.8);
    font-size: 15px;
    cursor: pointer;
`;

const groupedTextInputStyle = css`
    float: left;
    width: 70%;
    padding: 5px;
    background-color: rgba(0,0,0,0.1);
    color: #FFFFFF;
    box-sizing: border-box;
    border: none;
    outline: none;
    ::-webkit-input-placeholder {
        color: #999;
    }
`;

const GroupedButton = styled('button')`
    width: 30%;
    padding: 5px;
    box-sizing: border-box;
    background-color: #5A7D7C;
    color: #FFFFFF;
    outline: none;
    border: none;
    border-radius: 0px 2px 2px 0px;
`;

const CheckboxGroup = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: rgba(0,0,0,0.1);
    color: #999;
    padding: 5px;
    box-sizing: border-box;
`;

class HandleWordList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.wordList ? props.wordList.name : '',
            words: props.wordList ? props.wordList.words : [],
            labels: props.wordList ? props.wordList.labels : [],
            isPublic: props.wordList ? props.wordList.isPublic : false
        }
        this.handleAddListName = this.handleAddListName.bind(this);
        this.handleAddWord = this.handleAddWord.bind(this);
        this.handleAddLabel = this.handleAddLabel.bind(this);
        this.handleDeleteWord = this.handleDeleteWord.bind(this);
        this.handleSaveList = this.handleSaveList.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        this.refs.nameTextInput.value = this.state.name;
    }

    handleAddListName() {
        this.setState({ name: this.refs.nameTextInput.value });
    }

    handleAddWord() {
        let words = this.state.words;
        words.push(this.refs.wordTextInput.value);
        this.setState({ words }, () => { this.refs.wordTextInput.value = '';});
    }

    handleAddLabel() {
        let labels = this.state.labels;
        labels.push(this.refs.labelTextInput.value);
        this.setState({ labels }, () => { this.refs.labelTextInput.value = '' ;});
    }

    handleDeleteWord(index) {
        const words = this.state.words;
        words.splice(index, 1);
        this.setState({ words });
    }

    handleDeleteLabel(index) {
        const labels = this.state.labels;
        labels.splice(index, 1);
        this.setState({ labels });
    }

    handleSaveList() {
        this.props.saveList(this.state);
    }

    renderWords() {
        const { words } = this.state;
        let id = 0;
        return words.map(word => {
            id++;
            return (
                <WordInList 
                    onClick={() => this.handleDeleteWord(words.indexOf(word))} 
                    key={id}>
                    {word}
                </WordInList>
            );
        });
    }

    renderLabels() {
        const { labels } = this.state;
        let id = 0;
        return labels.map(label => {
            id++;
            return (
                <Label 
                    onClick={() => this.handleDeleteLabel(labels.indexOf(label))} 
                    key={id}>
                    {label}
                </Label>
            );
        });
    }

    handleKeyPress(event) {
        this.refs.wordTextInput.value = 
            this.refs.wordTextInput.value.replace(/\s+/g,'');
        if(event.key === 'Enter')
            this.handleAddWord()
    }

    render() {
        const { words, isPublic } = this.state;
        return(
            <div>
                <Wrapper>
                    { this.props.error.message && <DisplayError errorMsg={this.props.error.message} /> }
                    <Row>
                        <input 
                            type='text' 
                            ref='nameTextInput' 
                            onChange={this.handleAddListName} 
                            placeholder='List Name' 
                            className={textInputStyle} 
                            maxLength={10}
                        />
                    </Row>
                    <Row>
                        <CheckboxGroup>
                            <div>Public</div>
                            <input 
                                type='checkbox' 
                                ref='isPublic' 
                                className={checkboxStyle} 
                                defaultChecked={isPublic} 
                                onChange={() => this.setState({isPublic: this.refs.isPublic.checked})}
                            />
                        </CheckboxGroup>
                    </Row>
                    <Row>
                        <input 
                            type='text' 
                            ref='labelTextInput'
                            onKeyPress={event => (event.key === 'Enter') && this.handleAddLabel()}
                            placeholder='Label To Add' 
                            className={groupedTextInputStyle} 
                        />
                        <GroupedButton>Add</GroupedButton>
                    </Row>
                    <Row>
                        <input 
                            type='text' 
                            ref='wordTextInput' 
                            onKeyPress={this.handleKeyPress}  
                            placeholder='Word To Add' 
                            className={groupedTextInputStyle} 
                        />
                        <GroupedButton>Add</GroupedButton>
                    </Row>
                    <Row>
                        <Button onClick={this.handleSaveList}>
                            Save List
                        </Button>
                    </Row>
                </Wrapper>
                <WordsContainer>
                    {this.renderLabels()}
                    <WordListInfo>Total words: {words.length}</WordListInfo>
                    <WordsInnerContainer>
                        {this.renderWords()}
                    </WordsInnerContainer>
                </WordsContainer>
            </div>
        );
    }
}

export default HandleWordList;