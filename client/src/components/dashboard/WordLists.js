import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGlobalWordLists }  from '../../actions/wordListActions';
import GoBack from '../basic/GoBack';
import Loading from '../../styles/Loading';
import { Link } from 'react-router-dom';

class WordLists extends Component {

    componentDidMount() {
        this.props.fetchGlobalWordLists();
    }

    renderWordLists() {
        return this.props.wordLists.globalWordLists.map(wordList => {
            return (
                <div key={wordList._id}>{wordList.name} <Link to={`/wordList/preview/${wordList._id}`}>Link</Link></div>
            );
        });
    }

    render() {

        if(!this.props.wordLists.isFetched)
            return <Loading />
        return (
            <div>
                <GoBack goTo='/dashboard' />
                <div>{ this.renderWordLists() }</div>
            </div>
        )
    }
}

function mapStateToProps({ wordLists }) {
    return { wordLists }
}

export default connect(mapStateToProps, { fetchGlobalWordLists })(WordLists);