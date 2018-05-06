import React from 'react';
import { connect } from 'react-redux';
import { addWordList } from '../../actions';
import HandleWordList from './HandleWordList';
import { withRouter } from 'react-router-dom';
import Title from '../../styles/Title';
import GoBack from '../basic/GoBack';

const AddWordList = ({ addWordList, history }) => {

    function handleSaveList(wordList) {
        addWordList(wordList);
        history.goBack();
    }

    return(
        <div>
            <GoBack goBackOne goBackFunc={() => history.goBack()} />
            <Title>Create List</Title>
            <HandleWordList add saveList={handleSaveList}/>
        </div>
    );
}

export default connect(null, { addWordList })(withRouter(AddWordList));

