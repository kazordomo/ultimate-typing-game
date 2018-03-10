import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Game from './Game';
import WordListItem from './WordListItem';
import Loading from '../../styles/Loading';
import Wrapper from '../../styles/Wrapper';
import { fetchWordLists } from '../../actions';
import { Link } from 'react-router-dom';


const ChooseListWrapper = styled('div')`
    background-color: pink;
`;

class Practice extends Component {

    async componentDidMount() {
        await this.props.fetchWordLists();
    }

    renderWordLists() {
        return this.props.wordLists.map(list => <WordListItem key={list._id} wordListObj={list}></WordListItem>);
    }

    render() {
        if(!this.props.wordLists) {
            return <Loading />
        }
        return (
            <Wrapper>
                <Game gameOverMessage='Practice gameover' />
                <ChooseListWrapper>
                    <Link to='/game/wordlist/new'>Add new list</Link>
                </ChooseListWrapper>
                {this.renderWordLists()}
            </Wrapper>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { fetchWordLists })(Practice);
