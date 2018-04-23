import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGlobalWordList } from '../../actions/wordListActions';
import Loading from '../../styles/Loading';

class WordListReview extends Component {

    componentDidMount() {
        this.props.fetchGlobalWordList(this.props.match.params.id);
    }

    renderWords(words) {
        return words.map(word => {
            return <div key={word}>{word}</div>;
        })
    }

    render() {
        if(Object.keys(this.props.wordLists.preview).length === 0)
            return <Loading />;
        return (
            <div>
                <div>{this.props.wordLists.preview.name}</div>
                { this.renderWords(this.props.wordLists.preview.words) }
            </div>
        )
    }
}

function mapStateToProps({ wordLists }) {
    return { wordLists };
}

export default connect(mapStateToProps, { fetchGlobalWordList })(WordListReview);