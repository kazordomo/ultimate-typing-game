import React, { Component } from 'react';
import ActiveWords from './templates/ActiveWords';
import wordArray from '../../utils/words';
import Wrapper from '../../styles/Wrapper';
import Input from '../../styles/Input';

const BACKSPACE = 8;
const SPACE = 32;
const ENTER = 13;
let textInput = null;
let character = 0;

function shuffleWords(arr) {
    return arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1])
};

class PlayField extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            time: 10,
            keystrokes: 0,
            words: shuffleWords(wordArray),
            correctWords: 0,
            incorrectWords: 0,
            message: '',
            gameIsReady: true //TODO: change purpose of gameIsReady
        }
        this.state = this.initialState;
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    }

    //TODO: add lifecycle methods where we set up the props we get according to which game mode,
    //and add the data to our local state. message for instance.

    timer() {
        let start = setInterval(() => {
            this.setState({ time: this.state.time - 1});
            if(this.state.time === 0) {
                clearInterval(start);
                //TODO: the message should be set by the parent.
                this.setState({ message: 'GAME OVER. PRESS ENTER TO PLAY AGAIN'});
            }
        }, 1000);
    }

    resetGame() {
        textInput.value = '';
        this.initialState.words = shuffleWords(wordArray); //reshuffle
        this.setState(this.initialState);
    }

    validateCharacter() {
        return this.state.words[0].slice(0, character) === textInput.value.slice(0, character);
    }

    //TODO: REFACTOR
    handleOnKeyDown({ keyCode }) {
        const { gameIsReady, keystrokes, correctWords, incorrectWords, words, time } = this.state;
        if(keyCode === ENTER) { //should not be here...
            return this.resetGame();
        }
        if(gameIsReady) {
            this.setState({ gameIsReady: false }, () => {
                this.timer();
            });
        }
        if(time > 0) {
            textInput.value=textInput.value.replace(/\s+/g,'');
            this.setState({ keystrokes: this.state.keystrokes + 1 });
            if(keyCode === BACKSPACE) {
                character--;
                if(this.validateCharacter()) {
                    textInput.style.border = '3px solid transparent';
                }
            } 
            else if(keyCode === SPACE) {
                if(textInput.value === words[0]) {
                    this.setState({ correctWords: correctWords + 1 });
                } else {
                    this.setState({ incorrectWords: incorrectWords + 1 });
                    textInput.style.border = '3px solid red';
                }
                textInput.value = '';
                character = 0;
                words.shift();
            } else {
                character++;
            }
        }
    }

    handleOnKeyUp({ keyCode }) {
        const { words, time } = this.state;
        if(time > 0) {
            if(textInput.value === '') {
                character = 0;
            }
            if(keyCode !== 32) {
                if(!this.validateCharacter()) {
                    textInput.style.border = '3px solid red';
                } else if(this.validateCharacter()) {
                    textInput.style.border = '3px solid transparent';
                }
            }
        }
    }

    render() {
        return(
            <Wrapper>
                <div>{this.state.time}</div>
                <div>{this.state.message}</div>
                <Input 
                    play 
                    type="text" 
                    autoFocus 
                    disabled={!this.state.time}
                    onKeyDown={this.handleOnKeyDown} 
                    onKeyUp={this.handleOnKeyUp} 
                    innerRef={input => textInput = input} 
                />
                <ActiveWords words={this.state.words} />
            </Wrapper>
        );
    }
}

export default PlayField;