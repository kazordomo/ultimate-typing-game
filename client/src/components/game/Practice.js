import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Game from './Game';
import WordListItem from './WordListItem';
import Loading from '../../styles/Loading';
import Wrapper from '../../styles/Wrapper';
import GoBack from '../utils/GoBack';
import { fetchWordLists, fetchActiveWordList } from '../../actions';
import { Link } from 'react-router-dom';


const CreatedListsContainer = styled('div')`
    width: 350px;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #232C33;
    color: #FFFFFF;
`;

const SubTitle = styled('h1')`
    padding: 25px 0px;
    color: #FFFFFF;
    font-size: 25px;
    text-align: center;
    letter-spacing: 1.2px;
`;

const List = styled('div')`

`;

class Practice extends Component {

    constructor(props) {
        super(props);

        this.state = {
            words: []
        }
    }

    componentDidMount() {
        this.props.fetchWordLists(null);
    }

    handleChooseWordList(wordListObj) {
        this.props.fetchActiveWordList(wordListObj);
    }

    renderWordLists() {
        //TODO: wordlist will become an object when entering a list.
        return this.props.wordLists.map(list => <WordListItem key={list._id} chooseWordList={ () => this.handleChooseWordList(list.words) } wordListObj={list}></WordListItem>);
    }

    render() {
        if(!this.props.wordLists) {
            return <Loading />
        }
        return (
            <div>
                <GoBack goTo='/dashboard' />
                <Wrapper>
                    <Game practice={true} gameOverMessage='Practice gameover' />
                    <CreatedListsContainer>
                        <SubTitle>Created Lists</SubTitle>
                        <Link to='/game/wordlist/new'>Add new list</Link>
                        {this.renderWordLists()}
                    </CreatedListsContainer>
                </Wrapper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { fetchWordLists, fetchActiveWordList })(Practice);
