import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActiveWords from './templates/ActiveWords';
import GameStats from './templates/GameStats';
import Wrapper from '../../styles/Wrapper';
import Input from '../../styles/Input';
import Loading from '../../styles/Loading';
import styled from 'react-emotion';
import { fetchWords } from '../../actions';

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
const ENTER = 13;
const RED = 'red';
let textInput = null;
let character = 0;

function shuffleWords(arr) {
    return arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1])
};

function textInputBorder(validate) {
    return validate ? 
        textInput.style.border = '3px solid transparent' : 
        textInput.style.border = `3px solid ${RED}`;
}

class Game extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            time: 10,
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
        this.resetGame = this.resetGame.bind(this);
    }

    async componentDidMount() {
        await this.props.fetchWords();
        this.setState({ words: shuffleWords(this.props.words) });
    }

    timer() {
        let start = setInterval(() => {
            this.setState({ time: this.state.time - 1});
            if(this.state.time === 0) {
                const { keystrokes, correctWords, incorrectWords } = this.state;
                clearInterval(start);
                this.setState({ gameOverMessage: this.props.gameOverMessage, gameOver: true });
            }
        }, 1000);
    }

    resetGame() {
        textInput.value = '';
        this.initialState.words = shuffleWords(this.props.words); //reshuffle
        this.setState(this.initialState);
    }

    validateCharacter() {
        return this.state.words[0].slice(0, character) === textInput.value.slice(0, character);
    }
    
    handleOnKeyDown({ keyCode }) {
        const { gameIsReady, keystrokes, correctWords, incorrectWords, words } = this.state;
        textInput.value = textInput.value.replace(/\s+/g,'');

        if(gameIsReady) {
            this.setState({ gameIsReady: false }, () => {
                this.timer();
            });
        }
        this.setState({ keystrokes: keystrokes + 1 });
        if(keyCode === BACKSPACE) {
            character--;
            this.validateCharacter() && textInputBorder(true);
        } else if(keyCode === SPACE) {
            if(textInput.value === words[0]) {
                this.setState({ correctWords: correctWords + 1 });
            } else {
                this.setState({ incorrectWords: incorrectWords + 1 });
                textInputBorder(false);
            }
            textInput.value = '';
            character = 0;
            words.shift();
        } else {
            character++;
        }
    }

    handleOnKeyUp({ keyCode }) {
        const { words, time } = this.state;
        
        if(textInput.value === '') {
            character = 0;
        }
        //65 == a, 90 == z
        if(keyCode > 65 && keyCode < 90) {
            textInputBorder(this.validateCharacter());
        }
    }

    render() {
        let { time, words, gameOverMessage, gameStats } = this.state;
        if(!this.props.words) {
            return <Loading />
        }
        return(
            <Wrapper>
                <Row>
                    <ActiveWords words={words} />
                </Row>
                <Row>
                    <Input 
                        play 
                        type="text" 
                        autoFocus 
                        disabled={!time}
                        onKeyDown={this.handleOnKeyDown} 
                        onKeyUp={this.handleOnKeyUp} 
                        innerRef={input => textInput = input} 
                        />
                    <RestartButton onClick={this.resetGame}>Restart</RestartButton>
                    <Counter>{time}</Counter>
                </Row>
                <Row>
                    {/* <div>{gameOverMessage}</div> */}
                    <GameStats stats={this.state} />
                </Row>
            </Wrapper>
        );
    }
}

function mapStateToProps({ wordsObj: { words }}) {
    return { words };
}

export default connect(mapStateToProps, { fetchWords })(Game);