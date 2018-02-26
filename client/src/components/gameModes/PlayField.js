import React, { Component } from 'react';
import styled from 'react-emotion';
import _ from 'lodash';
// import ActiveWords from './templates/ActiveWords';
import wordArray from '../../utils/words';
import Input from '../../styles/Input';

const KEY_CODE_MIN = 65; //a
const KEY_CODE_MAX = 90; //z
const BACKSPACE = 8;
const SPACE = 32;
const ENTER = 13;

const Wrapper = styled('div')`
    width: 400px;
    margin: 250px auto;
`;

const ActiveWord = styled('span')`
    margin-right: 15px;
`;

//TODO: REFACTOR

let textInput = null;
let character = 0;

class PlayField extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            time: 10,
            keystrokes: 0,
            words: this.shuffleWords(wordArray),
            correctWords: 0,
            incorrectWords: 0,
            message: ''
        }
        this.state = this.initialState;
        this.timer();
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.handleOnKeyUp = this.handleOnKeyUp.bind(this);

    }

    shuffleWords(arr) {
        return arr
          .map(a => [Math.random(), a])
          .sort((a, b) => a[0] - b[0])
          .map(a => a[1])
    };

    validateCharacter() {
        return this.state.words[0].slice(0, character) === textInput.value.slice(0, character);
    }

    validateWord = (inputValue, activeWord) => {
        if(inputValue !== activeWord) {
            return false;
        }
        return true;
    }

    timer() {
        let start = setInterval(() => {
            this.setState({ time: this.state.time - 1});
            if(this.state.time === 0) {
                clearInterval(start);
                this.setState({ message: 'GAME OVER. PRESS ENTER TO PLAY AGAIN'});
            }
        }, 1000);
    }

    resetGame() {
        textInput.value = '';
        this.initialState.words = this.shuffleWords(wordArray);
        this.setState(this.initialState);
    }

    //TODO: REFACTOR
    handleOnKeyDown({ keyCode }) {
        if(keyCode === ENTER) {
            return this.resetGame();
        }
        if(this.state.time > 0) {
            textInput.value=textInput.value.replace(/\s+/g,'');
            this.setState({ keystrokes: this.state.keystrokes + 1 });
            if(keyCode === BACKSPACE) {
                character--;
                if(this.validateCharacter()) {
                    textInput.style.border = '3px solid transparent';
                }
            } 
            else if(keyCode === SPACE) {
                if(this.validateWord(textInput.value, this.state.words[0])) {
                    this.correctWords++;
                } else {
                    this.incorrectWords++;
                    textInput.style.border = '3px solid red';
                }
                textInput.value = '';
                character = 0;
                this.state.words.shift();
            } else {
                character++;
            }
        }
    }

    handleOnKeyUp({ keyCode }) {
        if(this.state.time > 0) {
            if(textInput.value === '') {
                character = 0;
            }
            if(keyCode !== 32) {
                if(this.state.words[0].slice(0, character) !== textInput.value.slice(0, character)) {
                    textInput.style.border = '3px solid red';
                } else if(this.state.words[0].slice(0, character) === textInput.value.slice(0, character)) {
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
                    onKeyDown={this.handleOnKeyDown} 
                    onKeyUp={this.handleOnKeyUp} 
                    innerRef={input => textInput = input} 
                />
                <div>
                    <ActiveWord>{this.state.words[0]}</ActiveWord>
                    <ActiveWord>{this.state.words[1]}</ActiveWord>
                    <ActiveWord>{this.state.words[2]}</ActiveWord>
                    <ActiveWord>{this.state.words[3]}</ActiveWord>
                    <ActiveWord>{this.state.words[4]}</ActiveWord>
                </div>
            </Wrapper>
        );
    }
}

export default PlayField;