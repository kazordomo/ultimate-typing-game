import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'react-emotion';
import { postWordList, fetchWordList, updateWordList, deleteWordList } from '../../actions';
import Wrapper from '../../styles/Wrapper';
import Button from '../../styles/Button';
import Loading from '../../styles/Loading';
import { Link, withRouter } from 'react-router-dom';

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
    font-size: 15px;
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
            return <WordInList key={id}>{word}<span onClick={() => this.handleDeleteWord(words.indexOf(word))}>x</span></WordInList>;
        });
    }

    render() {
        if(!this.props.wordList) {
            return <Loading />
        }
        return(
            <div>
                <Link to='/game/practice'>Back to Practice</Link>
                <Wrapper>
                    <input type='text' ref='nameTextInput' onChange={this.handleAddListName} placeholder='List Name' className={inputStyle} />
                    <input type='text' ref='wordTextInput' onKeyPress={event => (event.key === 'Enter') && this.handleAddWord()}  placeholder='Word To Add' className={inputStyle} />
                    <div>
                        <Button onClick={this.handleAddWord}>Add Word</Button>
                    </div>
                    <div>
                        <Button onClick={this.handleSaveList}>Save List</Button>
                    </div>
                </Wrapper>
                <span>{this.state.name}</span>
                <WordsContainer>
                    {this.renderWords()}
                </WordsContainer>
                <Button onClick={this.handleDeleteList}>DELETE LIST</Button>
            </div>
        );
    }
}

function mapStateToProps({ wordList }) {
    return { wordList };
}

export default connect(mapStateToProps, { postWordList, fetchWordList, updateWordList, deleteWordList })(withRouter(AddEditWordList));