import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActiveWords from './ActiveWords';
import GameStats from './GameStats';
import Wrapper from '../../styles/Wrapper';
import Title from '../../styles/Title';
import textInputStyle from '../../styles/textInput';
import styled, { css } from 'react-emotion';
import { 
    selectWordList, 
    resetGame,
    updateStat
} from '../../actions';

const Row = styled('div')`
    width: 100%;
    padding: 20px 0px;
`

const Counter = styled('div')`
    margin-top 10px;
    color: #EDF257;
    font-size: 40px;
    text-align: center;
`;

const restartStyle = css`
    color: #FFFFFF;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
`;

const BACKSPACE = 8;
const SPACE = 32;
const ENTER = 13;
const RED = 'red';
let character = 0;
let start = null;

//TODO:
//this comp should better be divided by the three different game modes.
//pain in tha azz to find your way in the code with all the if states according too
//the different modes.

class Game extends Component {

    componentDidMount() {
        if(!this.props.practice)
            this.props.selectWordList(null); //reset currentWordList
        if(this.props.multiplayer) {
            this.props.timer();
            this.props.updateStat({target: 'gameIsRunning', value: true});
        }
    }

    componentWillUnmount() {
        clearInterval(start);
        this.props.resetGame();
    }

    componentWillReceiveProps(props) {
        if(props.currentGame.time === 0) {
            clearInterval(start);
        }
    }

    handleResetGame() {
        if(this.gameTextInput) {
            this.gameTextInput.value = '';
            this.gameTextInput.style.color = '#5A7D7C';
            this.gameTextInput.style.borderBottom = '1px solid #5A7D7C';
        }
        start && clearInterval(start);
        this.props.resetGame();
    }
    
    validateCharacter() {
        return this.props.currentWordList.words[0].slice(0, character) === this.gameTextInput.value.slice(0, character);
    }
    
    gameTextInputBorder(validate) {
        if(validate) {
            this.gameTextInput.style.borderBottom = '1px solid #5A7D7C';
            this.gameTextInput.style.color = '#5A7D7C';
        } else {
            this.gameTextInput.style.borderBottom = `1px solid ${RED}`;
            this.gameTextInput.style.color = `${RED}`;
        }
    }

    handleOnKeyDown({ keyCode }) {
        this.gameTextInput.value = this.gameTextInput.value.replace(/\s+/g,'');

        if(!this.props.multiplayer && !this.props.currentGame.gameIsRunning && (keyCode > 65 && keyCode < 90)) {
            this.props.updateStat({target: 'gameIsRunning', value: true});
            start = setInterval(() => this.props.timer(), 1000);
        }
        this.props.updateStat({target: 'keystrokes', value: 1});
        if(keyCode === ENTER && !this.props.multiplayer)
            this.handleResetGame();
        if(keyCode === BACKSPACE) {
            character--;
            this.validateCharacter() && this.gameTextInputBorder(true);
        } else if(keyCode === SPACE) {
            if(this.gameTextInput.value === this.props.currentWordList.words[0]) {
                this.props.updateStat({target: 'correctWords', value: 1});
            } else {
                this.props.updateStat({target: 'incorrectWords', value: 1});
                this.gameTextInputBorder(false);
            }
            this.gameTextInput.value = '';
            character = 0;
            this.props.currentWordList.words.shift();
        } else {
            character++;
        }
    }

    handleOnKeyUp({ keyCode }) {        
        if(this.gameTextInput.value === '')
            character = 0;
        if(keyCode > 65 && keyCode < 90)
            this.gameTextInputBorder(this.validateCharacter());        
    }

    gameEnded() {
        return (
            <Row>
                <GameStats stats={this.props.currentGame} />
                <button 
                    className={restartStyle} 
                    ref='restartButton'
                    onClick={this.handleResetGame.bind(this)}
                    autoFocus
                >
                    Play again?
                </button>    
            </Row>
        )
    }

    gameRunning() {
        return (
            <Row>
                <input
                    type="text" 
                    className={textInputStyle}
                    autoFocus
                    disabled={!this.props.currentGame.time}
                    onKeyDown={this.handleOnKeyDown.bind(this)}
                    onKeyUp={this.handleOnKeyUp.bind(this)} 
                    ref={input => { this.gameTextInput = input; }}/>
                <Counter>{this.props.currentGame.time}</Counter> 
            </Row>
        )
    }

    render() {
        return(
            <div ref='_isMounted'>
                <Title>{this.props.gameModeTitle}</Title>
                <Wrapper>
                    <Row>
                        <ActiveWords words={this.props.currentWordList.words} />
                    </Row>
                    { 
                        this.props.currentGame.time 
                            ? this.gameRunning()
                            : this.gameEnded()
                    }                    
                </Wrapper>
            </div>
        );
    }
}

function mapStateToProps({ user, wordLists: { currentWordList }, currentGame }) {
    return { user, currentWordList, currentGame };
}

export default connect(mapStateToProps, { 
    selectWordList, 
    resetGame, 
    updateStat 
})(Game);