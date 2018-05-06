import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { fetchGlobalWordListIfNeeded } from '../../actions/globalWordListActions';
import Loading from '../../styles/Loading';
import GoBack from '../basic/GoBack';
import Title from '../../styles/Title';
import { 
    favorWordList, 
    updateWordList, 
    deleteFavoredWordList 
} from '../../actions/wordListActions';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import Star from './Star';
import Button from '../../styles/Button';

const Word = styled('span')`
    margin-right 20px;
    line-height: 2;
`;

const WordsContainer = styled('div')`
    display: flex;
    flex-wrap: wrap;
    color: #FFFFFF;
`;

const RatingContainer = styled('div')`
    text-align: center;
    color: #FFFFFF;
`;

const Span = styled('span')`
    margin-left: 10px;
    font-size: 16px;
`;

class GlobalWordListPreview extends Component {

    componentDidMount() {
        this.props.fetchGlobalWordListIfNeeded(this.props.match.params.id);
    }

    renderWords(words) {
        let id = 0;
        return words.map(word => {
            id++;
            return <Word key={id}>{word}</Word>;
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
        const { globalWordLists: { preview } } = this.props;

        if(Object.keys(preview).length === 0)
            return <Loading />;
        const calculatedRating = 
            preview.ratings.reduce((a, b) => a + b.value / preview.ratings.length, 0);
        return (
            <div>
                <GoBack goTo='/wordLists' />                
                <Title>{preview.name}</Title>
                <div style={{width: '250px', margin: '0 auto'}}>
                    <Button onClick={() => this.props.favorWordList(preview)}>Save List</Button>
                </div>
                {/* <button onClick={() => this.props.deleteFavoredWordList(preview)}>Should be same button but delete...</button> */}
                <RatingContainer>
                    <Rater total={5} rating={calculatedRating} onRate={this.handleRating.bind(this)}>
                        <Star active />
                    </Rater>
                    { preview.ratings.length ?
                        <Span>( { preview.ratings.length } )</Span> :
                        '' }
                </RatingContainer>
                <WordsContainer>
                    { this.renderWords(preview.words) }
                </WordsContainer>
                <div>
                    { this.renderLabels(preview.labels) }
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
