import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Game from './Game';
import WordList from './WordList';
import Wrapper from '../../styles/Wrapper';
import { fetchWords } from '../../actions';
import { Link } from 'react-router-dom';


const ChooseListWrapper = styled('div')`
    background-color: pink;
`;

class Practice extends Component {

    // async componentDidMount() {
    //     await this.props.fetchWords();
    // }

    renderWordLists() {
        return;
    }

    render() {
        return (
            <Wrapper>
                <Game gameOverMessage='Practice gameover' />
                <ChooseListWrapper>
                    <Link to='/game/wordlist'>Add new list</Link>
                </ChooseListWrapper>
            </Wrapper>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { fetchWords })(Practice);
