import React, { Component } from 'react';
import { connect } from 'react-redux';
import HandleWordList from './HandleWordList';
import { fetchWordList, updateWordList, deleteWordList } from '../../actions';
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

class EditWordList extends Component {

    async componentDidMount() {
        const { match, fetchWordList } = this.props;
        await fetchWordList(match.params.id);
    }

    handleSaveList(wordList) {
        const { match, updateWordList } = this.props;
        updateWordList(wordList, match.params.id);
    }

    handleDeleteList() {
        const { match, history } = this.props;
        this.props.deleteWordList(match.params.id, history);
    }

    render() {
        if(!this.props.wordList) {
            return <Loading />
        }
        const { wordList: { name, words } } = this.props;
        return(
            <div>
                <Title>{this.props.wordList.name}</Title>
                <HandleWordList edit saveList={this.handleSaveList.bind(this)} deleteList={this.handleDeleteList.bind(this)} wordList={{name, words}} />
                <DeleteButton onClick={this.handleDeleteList.bind(this)}>DELETE LIST</DeleteButton>
            </div>
        );
    }
}

function mapStateToProps({ wordList }) {
    return { wordList };
}

export default connect(mapStateToProps, {fetchWordList, updateWordList, deleteWordList })(withRouter(EditWordList));