import React from 'react';
import { connect } from 'react-redux';
import { postWordList } from '../../actions';
import HandleWordList from './HandleWordList';
import { withRouter } from 'react-router-dom';
import Title from '../../styles/Title';

const AddWordList = ({ postWordList, history }) => {

    function handleSaveList(wordList) {
        console.log(history);
        postWordList(wordList, history);
    }

    return(
        <div>
            <Title>Create List</Title>
            <HandleWordList add saveList={handleSaveList}/>
        </div>
    );
}

export default connect(null, { postWordList })(withRouter(AddWordList));

