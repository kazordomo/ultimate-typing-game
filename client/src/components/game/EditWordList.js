import React, { Component } from 'react';
import { connect } from 'react-redux';
import HandleWordList from './HandleWordList';
import { selectWordList, updateWordList, deleteWordList } from '../../actions';
import { withRouter } from 'react-router-dom';
import styled from 'react-emotion';
import Loading from '../../styles/Loading';
import Title from '../../styles/Title';

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

//TODO: use selectWOrdList and use currentWordList.

class EditWordList extends Component {

    componentDidMount() {
        //fetchWordListsIfNeeded();
        const { match, fetchWordList } = this.props;
        selectWordList(match.params.id);
    }

    //TODO: ????
    handleSaveList(wordList) {
        const { match, updateWordList } = this.props;
        updateWordList(wordList, match.params.id);
    }

    handleDeleteList() {
        const { match, history } = this.props;
        this.props.deleteWordList(match.params.id, history);
    }

    render() {
        const { wordLists: { currentWordList: { name, words } } } = this.props;
        return(
            <div>
                <Title>{name}</Title>
                <HandleWordList edit saveList={this.handleSaveList.bind(this)} deleteList={this.handleDeleteList.bind(this)} wordList={{name, words}} />
                <DeleteButton onClick={this.handleDeleteList.bind(this)}>DELETE LIST</DeleteButton>
            </div>
        );
    }
}

function mapStateToProps({ wordLists }) {
    return { wordLists };
}

export default connect(mapStateToProps, { selectWordList, updateWordList, deleteWordList })(withRouter(EditWordList));