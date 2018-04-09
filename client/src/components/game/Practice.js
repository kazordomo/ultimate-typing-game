import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'react-emotion';
import Game from './Game';
import WordListItem from './WordListItem';
import Loading from '../../styles/Loading';
import Wrapper from '../../styles/Wrapper';
import FlexContainer from '../../styles/FlexContainer';
import GoBack from '../utils/GoBack';
import { fetchWordLists, selectWordList } from '../../actions';
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
    transition: all .3s cubic-bezier(0.600, -0.280, 0.735, 0.045);
    box-shadow: -8px -1px 14px -2px rgba(0,0,0,0.65);
`;

const OpenClose = styled('div')`
    position: absolute;
    left: -10px;
    top: 49%;
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
            wordListActive: true
        }
    }

    async componentDidMount() {
        await this.props.fetchWordLists();
    }

    componentWillUnmount() {
        this.props.selectWordList(null); //reset currentWordList
    }

    handleChooseWordList(wordList) {
        this.props.selectWordList(wordList._id);
    }

    renderWordLists() {
        let { wordLists: { items } } = this.props;
        return (
            Object.keys(items).map(key => {
                return <WordListItem 
                            key={items[key]._id} 
                            chooseWordList={ () => this.handleChooseWordList(items[key]) } 
                            wordListObj={items[key]}>
                        </WordListItem>
            })
        );
    }

    openCloseWordList() {
        this.setState({ wordListActive: !this.state.wordListActive });
    }

    render() {
        if(!this.props.wordLists.isFetched) {
            return <Loading />
        }
        let listStyle = { right: '-360px' };
        if(this.state.wordListActive) {
            listStyle = { right: '0px' };
        }
        return (
            <div>
                <GoBack goTo='/dashboard' />
                <Wrapper>
                    <Game practice gameModeTitle='Practice' />
                    <CreatedListsContainer style={listStyle}>
                        <OpenClose onClick={this.openCloseWordList.bind(this)}>x</OpenClose>
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

export default connect(mapStateToProps, { fetchWordLists, selectWordList })(Practice);
