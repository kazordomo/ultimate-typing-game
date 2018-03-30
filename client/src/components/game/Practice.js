import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'react-emotion';
import Game from './Game';
import WordListItem from './WordListItem';
import Loading from '../../styles/Loading';
import Wrapper from '../../styles/Wrapper';
import GoBack from '../utils/GoBack';
import { fetchWordLists, fetchActiveWordList } from '../../actions';
import { Link } from 'react-router-dom';


const CreatedListsContainer = styled('div')`
    width: 300px;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 30px;
    background-color: #232C33;
    color: #FFFFFF;
    // transition: all .3s cubic-bezier(0.600, -0.280, 0.735, 0.045);
    box-shadow: -8px -1px 14px -2px rgba(0,0,0,0.65);
`;

// const OpenClose = styled('div')`
//     position: absolute;
//     left: -10px;
//     top: 49%;
// `;

const FlexContainer = styled('div')`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
`;

const SubTitle = styled('h1')`
    // padding: 25px 0px;
    color: #FFFFFF;
    font-size: 25px;
    text-align: center;
    letter-spacing: 1.2px;
`;

const linkStyle = css`
    display: block;
    width: 80%;
    margin: 0 auto;
    background-color: #5B9B66;
    color: #FFFFFF;
    text-align: center;
    text-decoration: none;
    border-radius: 2px;
`;

const ListWrapper = styled('div')`
    min-height: 70%;
`;

class Practice extends Component {

    constructor(props) {
        super(props);

        this.state = {
            words: [],
            wordListActive: false
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

    // openCloseWordList() {
    //     this.setState({ wordListActive: !this.state.wordListActive });
    // }

    render() {
        if(!this.props.wordLists) {
            return <Loading />
        }
        // let listStyle = { right: '-360px' };
        // if(this.state.wordListActive) {
        //     listStyle = { right: '0px' };
        // }
        return (
            <div>
                <GoBack goTo='/dashboard' />
                <Wrapper>
                    <Game practice={true} gameOverMessage='Practice gameover' />
                    <CreatedListsContainer>
                        {/* <OpenClose onClick={this.openCloseWordList.bind(this)}>x</OpenClose> */}
                        <FlexContainer>
                            <SubTitle>Created Lists</SubTitle>
                            <ListWrapper>{this.renderWordLists()}</ListWrapper>
                            <Link className={linkStyle} to='/game/wordlist/new'>Add new list</Link>
                        </FlexContainer>
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
