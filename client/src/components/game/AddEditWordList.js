import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'react-emotion';
import { postWordList, fetchWordList, updateWordList, deleteWordList } from '../../actions';
import GoBack from '../utils/GoBack';
import Wrapper from '../../styles/Wrapper';
import Button from '../../styles/Button';
import Loading from '../../styles/Loading';
import Title from '../../styles/Title';
import Row from '../../styles/Row';
import textInputStyle from '../../styles/textInput';
import { withRouter } from 'react-router-dom';

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
    background-color: #232C33;
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

const DeleteButton = styled('button')`
    position: absolute;
    top: 30px;
    right: 30px;
    width: 150px;
    padding: 5px;
    background-color: red;
    color: #FFFFFF;
    border: none;
    border-radius: 2px;
    outline: none;
    cursor: pointer;
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
            name: '',
            words: []
        }
        this.handleAddListName = this.handleAddListName.bind(this);
        this.handleAddWord = this.handleAddWord.bind(this);
        this.handleSaveList = this.handleSaveList.bind(this);
        this.handleDeleteList = this.handleDeleteList.bind(this);
        this.handleDeleteWord = this.handleDeleteWord.bind(this);
    }

    async componentDidMount() {
        const { match, fetchWordList } = this.props;
        if(match.params.id) {
            await fetchWordList(match.params.id);
            const { wordList: { name, words } } = this.props;
            this.setState({ name, words }, () => this.refs.nameTextInput.value = this.state.name);
        }    
    }

    componentWillUnmount() {
        // this.handleSaveList();
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

    handleSaveList() {
        const { name, words } = this.state;
        const { match, updateWordList, postWordList } = this.props;
        const wordList = { name, words };
        if(match.params.id) {
            updateWordList(wordList, match.params.id);
        } else {
            postWordList(wordList);
        }
    }

    handleDeleteList() {
        const { match, history } = this.props;
        this.props.deleteWordList(match.params.id, history);
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
        // if(!this.state.words.length) {
        //     return <Loading />
        // }
        return(
            <div>
                <GoBack goTo='/game/practice' />
                <Title>{this.state.name}</Title>
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
                    {/* <div>
                        <Button onClick={this.handleSaveList}>Save List</Button>
                    </div> */}
                </Wrapper>
                <WordsContainer>
                    <WordListInfo>Total words: {this.state.words.length}</WordListInfo>
                    <WordsInnerContainer>
                        {this.renderWords()}
                    </WordsInnerContainer>
                </WordsContainer>
                <DeleteButton onClick={this.handleDeleteList}>DELETE LIST</DeleteButton>
            </div>
        );
    }
}

function mapStateToProps({ wordList }) {
    return { wordList };
}

export default connect(mapStateToProps, { postWordList, fetchWordList, updateWordList, deleteWordList })(withRouter(AddEditWordList));