import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGlobalWordListIfNeeded } from '../../actions/globalWordListActions';
import Loading from '../../styles/Loading';
import GoBack from '../basic/GoBack';
import { 
    favorWordList, 
    updateWordList, 
    deleteFavoredWordList 
} from '../../actions/wordListActions';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import Star from './Star';

class GlobalWordListPreview extends Component {

    componentDidMount() {
        this.props.fetchGlobalWordListIfNeeded(this.props.match.params.id);
    }

    renderWords(words) {
        let id = 0;
        return words.map(word => {
            id++;
            return <div key={id}>{word}</div>;
        })
    }

    renderLabels(labels) {
        let id = 0;
        return labels.map(label => {
            id++;
            return <div key={id}>{label}</div>;
        });
    }

    handleRating(event) {
        if(event.type === 'click') {
            const wordList = this.props.globalWordLists.preview;
            wordList.rating = event.rating;
            this.props.updateWordList(wordList, this.props.match.params.id);
        }
    }

    render() {
        if(Object.keys(this.props.globalWordLists.preview).length === 0)
            return <Loading />;
        return (
            <div>
                <GoBack goTo='/wordLists' />                
                <button onClick={() => this.props.favorWordList(this.props.globalWordLists.preview)}>Save List</button>
                <button onClick={() => this.props.deleteFavoredWordList(this.props.globalWordLists.preview)}>Should be same button but delete...</button>
                <Rater total={5} rating={this.props.globalWordLists.preview.rating} onRate={this.handleRating.bind(this)}>
                    <Star active />
                </Rater>
                <div>{this.props.globalWordLists.preview.name}</div>
                { this.renderWords(this.props.globalWordLists.preview.words) }
                <div>
                    { this.renderLabels(this.props.globalWordLists.preview.labels) }
                </div>
            </div>
        )
    }
}

function mapStateToProps({ globalWordLists }) {
    return { globalWordLists };
}

export default connect(mapStateToProps, { 
    fetchGlobalWordListIfNeeded, 
    deleteFavoredWordList,
    updateWordList,
    favorWordList 
})(GlobalWordListPreview);
