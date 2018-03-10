import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActiveWords from './templates/ActiveWords';
import GameStats from './templates/GameStats';
import Wrapper from '../../styles/Wrapper';
import styled, { css } from 'react-emotion';
// import wordList from '../../utils/words';
import { submitScore, fetchActiveWordList } from '../../actions';

const inputStyle = css`
    width: 500px;
    padding: 15px;
    background: #FFFFFF;
    font-size: 20px;
`;

const RestartButton = styled('button')`
    float: right;
    margin-top 4px;
`;

const Row = styled('div')`
    width: 100%;
    margin: 5px 0px;
`

const Counter = styled('div')`
    margin-top 10px;
`;

const BACKSPACE = 8;
const SPACE = 32;
// const ENTER = 13;
const RED = 'red';
let character = 0;

function shuffleWords(arr) {
    return arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1])
};

class Game extends Component {

    constructor(props) {
        super(props);
        
        this.initialState = {
            time: 5,
            keystrokes: 0,
            words: [],
            correctWords: 0,
            incorrectWords: 0,
            gameOverMessage: '',
            gameIsReady: true,
            gameOver: false
        }
        this.state = this.initialState;
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
        this.handleSubmitScore = this.handleSubmitScore.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    async componentDidMount() {
        await this.props.fetchActiveWordList();
        console.log(this.props);
        this.setState({ words: shuffleWords(this.props.activeWordList)});
    }

    timer() {
        let start = setInterval(() => {
            this.setState({ time: this.state.time - 1});
            if(this.state.time === 0) {
                clearInterval(start);
                this.refs.scoreSubmitButton.click();
                this.setState({ gameOverMessage: this.props.gameOverMessage, gameOver: true });
            }
        }, 1000);
    }

    resetGame() {
        this.refs.gameTextInput.value = this.props.gameOverMessage;
        // this.refs.gameTextInput.value = '';
        this.initialState.words = shuffleWords(this.props.activeWordList); //reshuffle
        this.setState(this.initialState);
    }

    
    validateCharacter() {
        return this.state.words[0].slice(0, character) === this.refs.gameTextInput.value.slice(0, character);
    }
    
    gameTextInputBorder(validate) {
        return validate ? 
            this.refs.gameTextInput.style.border = '3px solid transparent' : 
            this.refs.gameTextInput.style.border = `3px solid ${RED}`;
    }

    handleOnKeyDown({ keyCode }) {
        const { gameIsReady, keystrokes, correctWords, incorrectWords, words } = this.state;
        this.refs.gameTextInput.value = this.refs.gameTextInput.value.replace(/\s+/g,'');

        if(gameIsReady) {
            this.setState({ gameIsReady: false }, () => {
                this.timer();
            });
        }
        this.setState({ keystrokes: keystrokes + 1 });
        if(keyCode === BACKSPACE) {
            character--;
            this.validateCharacter() && this.gameTextInputBorder(true);
        } else if(keyCode === SPACE) {
            if(this.refs.gameTextInput.value === words[0]) {
                this.setState({ correctWords: correctWords + 1 });
            } else {
                this.setState({ incorrectWords: incorrectWords + 1 });
                this.gameTextInputBorder(false);
            }
            this.refs.gameTextInput.value = '';
            character = 0;
            words.shift();
        } else {
            character++;
        }
    }

    handleOnKeyUp({ keyCode }) {        
        if(this.refs.gameTextInput.value === '') {
            character = 0;
        }
        //65 == a, 90 == z //TODO: should be able to use foreign keyCodes as well, when playing a self created wordlist.
        if(keyCode > 65 && keyCode < 90) {
            this.gameTextInputBorder(this.validateCharacter());
        }
    }

    handleSubmitScore() {
        const { correctWords, incorrectWords, keystrokes } = this.state; 
        this.props.submitScore({ correctWords, incorrectWords, keystrokes });
    }

    render() {
        let { time, words } = this.state;
        // if(!this.props.words) {
        //     return <Loading />
        // }
        return(
            <Wrapper>
                <Row>
                    <ActiveWords words={words} />
                </Row>
                <Row>
                    <input
                        type="text" 
                        className={inputStyle}
                        autoFocus
                        disabled={!time}
                        onKeyDown={this.handleOnKeyDown} 
                        onKeyUp={this.handleOnKeyUp} 
                        ref='gameTextInput' />
                        <button ref='scoreSubmitButton' onClick={this.handleSubmitScore}>Submit</button>
                    <RestartButton onClick={this.resetGame}>Restart</RestartButton>
                    <Counter>{time}</Counter>
                </Row>
                <Row>
                    <GameStats stats={this.state} />
                </Row>
            </Wrapper>
        );
    }
}

function mapStateToProps({ user, activeWordList }) {
    return { user, activeWordList };
}

export default connect(mapStateToProps, { submitScore, fetchActiveWordList })(Game);