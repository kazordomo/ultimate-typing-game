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
    deleteFavoredWordList,
} from '../../actions';
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

const Words = styled('div')`
    display: flex;
    flex-wrap: wrap;
    width: auto;
    margin: 0 auto;
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

    //TODO: this will make the component rerender and use calculatedRating as rating again.
    //avoiding componentWillUnmount, but perhaps we should update the wordlist first then, so that
    //the users rating will remain until the compoent is unmounted.
    handleRating(event) {
        if(event.type === 'click') {
            const wordList = this.props.globalWordLists.preview;
            wordList.rating = event.rating;
            this.props.updateWordList(wordList, this.props.match.params.id);
        }
    }

    render() {
        const { globalWordLists: { preview }, user } = this.props;
        if(Object.keys(preview).length === 0)
            return <Loading />;
        const calculatedRating = 
            preview.ratings.reduce((a, b) => a + b.value / preview.ratings.length, 0);
        const isCreatedByCurrentUser = (user.data._id === preview._user);
        const wordListRatings = preview.ratings.reduce((acc, curr) => {
            acc[curr._user] = curr;
            return acc;
        }, {});

        return (
            <div>
                <GoBack goTo='/wordLists' />                
                <Title>{preview.name}</Title>
                <div style={{width: '250px', margin: '0 auto'}}>
                    { 
                        isCreatedByCurrentUser ? 
                            <Button disabled onClick={() => this.props.favorWordList(preview)}>Favor List</Button> :
                            <Button onClick={() => this.props.favorWordList(preview)}>Favor List</Button>
                    }
                </div>
                <RatingContainer>
                    <Rater 
                        total={5} 
                        rating={calculatedRating} 
                        interactive={!isCreatedByCurrentUser && !wordListRatings[user.data._id]} 
                        onRate={this.handleRating.bind(this)}
                    >
                        <Star active />
                    </Rater>
                    { preview.ratings.length ?
                        <Span>( { preview.ratings.length } )</Span> :
                        '' }
                </RatingContainer>
                <WordsContainer>
                    <Words>
                        { this.renderWords(preview.words) }
                    </Words>
                </WordsContainer>
            </div>
        )
    }
}

function mapStateToProps({ globalWordLists, user }) {
    return { globalWordLists, user };
}

export default connect(mapStateToProps, { 
    fetchGlobalWordListIfNeeded, 
    deleteFavoredWordList,
    updateWordList,
    favorWordList
})(GlobalWordListPreview);
