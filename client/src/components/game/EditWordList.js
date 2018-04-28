import React, { Component } from 'react';
import { connect } from 'react-redux';
import HandleWordList from './HandleWordList';
import { fetchWordListIfNeeded, updateWordList, deleteWordList } from '../../actions';
import { withRouter } from 'react-router-dom';
import styled from 'react-emotion';
import Loading from '../../styles/Loading';
import Title from '../../styles/Title';
import GoBack from '../basic/GoBack';

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
        const { match, fetchWordListIfNeeded } = this.props;
        fetchWordListIfNeeded(match.params.id);
    }

    //TODO: ????
    handleSaveList(wordList) {
        const { match, updateWordList, history } = this.props;
        updateWordList(wordList, match.params.id, history);
    }

    handleDeleteList() {
        const { match, history } = this.props;
        this.props.deleteWordList(match.params.id, history);
    }

    render() {
        if(!this.props.wordLists.isFetched)
            return <Loading />
        const { wordLists: { currentWordList } } = this.props;
        return(
            <div>
                <GoBack goTo='/game/practice' />
                <Title>{currentWordList.name}</Title>
                <HandleWordList 
                    edit 
                    saveList={this.handleSaveList.bind(this)} 
                    deleteList={this.handleDeleteList.bind(this)} 
                    wordList={currentWordList} 
                />
                <DeleteButton onClick={this.handleDeleteList.bind(this)}>DELETE LIST</DeleteButton>
            </div>
        );
    }
}

function mapStateToProps({ wordLists }) {
    return { wordLists };
}

export default connect(
    mapStateToProps, { 
        fetchWordListIfNeeded, 
        updateWordList, 
        deleteWordList,  
    })
(withRouter(EditWordList));