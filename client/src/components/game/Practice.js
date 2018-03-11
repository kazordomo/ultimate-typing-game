import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Game from './Game';
import WordListItem from './WordListItem';
import Loading from '../../styles/Loading';
import Wrapper from '../../styles/Wrapper';
import { fetchWordLists, fetchActiveWordList } from '../../actions';
import { Link } from 'react-router-dom';


const ChooseListWrapper = styled('div')`
    background-color: pink;
`;

class Practice extends Component {

    constructor(props) {
        super(props);

        this.state = {
            words: []
        }
    }

    async componentDidMount() {
        await this.props.fetchWordLists(null);
    }

    handleChooseWordList(wordListObj) {
        this.props.fetchActiveWordList(wordListObj);
    }

    renderWordLists() {
        return this.props.wordLists.map(list => <WordListItem key={list._id} chooseWordList={ () => this.handleChooseWordList(list.words) } wordListObj={list}></WordListItem>);
    }

    render() {
        if(!this.props.wordLists) {
            return <Loading />
        }
        return (
            <div>
                <Link to='/dashboard'>Back to Dashboard</Link>
                <Wrapper>
                    <Game gameOverMessage='Practice gameover' />
                    <ChooseListWrapper>
                        <Link to='/game/wordlist/new'>Add new list</Link>
                    </ChooseListWrapper>
                    {this.renderWordLists()}
                </Wrapper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { fetchWordLists, fetchActiveWordList })(Practice);
