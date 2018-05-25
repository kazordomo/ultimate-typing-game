import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActiveWords from './ActiveWords';
import GameStats from './GameStats';
import Wrapper from '../../styles/Wrapper';
import Title from '../../styles/Title';
import textInputStyle from '../../styles/textInput';
import styled from 'react-emotion';
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
        //TODO: minimize the use of needing to check the different game modes.
        //should be more dynamic.
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

    resetGame() {
        this.refs.gameTextInput.value = '';
        this.refs.gameTextInput.style.color = '#5A7D7C';
        this.refs.gameTextInput.style.borderBottom = '1px solid #5A7D7C';
        this.props.resetGame();
    }
    
    validateCharacter() {
        return this.props.currentWordList.words[0].slice(0, character) === this.refs.gameTextInput.value.slice(0, character);
    }
    
    gameTextInputBorder(validate) {
        if(validate) {
            this.refs.gameTextInput.style.borderBottom = '1px solid #5A7D7C';
            this.refs.gameTextInput.style.color = '#5A7D7C';
        } else {
            this.refs.gameTextInput.style.borderBottom = `1px solid ${RED}`;
            this.refs.gameTextInput.style.color = `${RED}`;
        }
    }

    handleOnKeyDown({ keyCode }) {
        this.refs.gameTextInput.value = this.refs.gameTextInput.value.replace(/\s+/g,'');

        if(!this.props.multiplayer && !this.props.currentGame.gameIsRunning && (keyCode > 65 && keyCode < 90)) {
            this.props.updateStat({target: 'gameIsRunning', value: true});
            this.props.timer();
        }
        this.props.updateStat({target: 'keystrokes', value: 1});
        if(keyCode === BACKSPACE) {
            character--;
            this.validateCharacter() && this.gameTextInputBorder(true);
        } else if(keyCode === SPACE) {
            if(this.refs.gameTextInput.value === this.props.currentWordList.words[0]) {
                this.props.updateStat({target: 'correctWords', value: 1});
            } else {
                this.props.updateStat({target: 'incorrectWords', value: 1});
                this.gameTextInputBorder(false);
            }
            this.refs.gameTextInput.value = '';
            character = 0;
            this.props.currentWordList.words.shift();
        } else {
            character++;
        }
    }

    handleOnKeyUp({ keyCode }) {        
        if(this.refs.gameTextInput.value === '')
            character = 0;
        if(keyCode > 65 && keyCode < 90)
            this.gameTextInputBorder(this.validateCharacter());        
    }

    render() {
        //TODO: This will be global. not goodie.
        document.onkeydown = ({ keyCode }) => {
            if(keyCode === ENTER) {
                clearInterval(start);
                this.resetGame();
            }
        };
        return(
            <div ref='_isMounted'>
                <Title>{this.props.gameModeTitle}</Title>
                <Wrapper>
                    <Row>
                        <ActiveWords words={this.props.currentWordList.words} />
                    </Row>
                    <Row>
                        <input
                            type="text" 
                            className={textInputStyle}
                            autoFocus
                            disabled={!this.props.currentGame.time}
                            onKeyDown={this.handleOnKeyDown.bind(this)}
                            onKeyUp={this.handleOnKeyUp.bind(this)} 
                            ref='gameTextInput' />
                        { 
                            this.props.currentGame.time 
                                ? <Counter>{this.props.currentGame.time}</Counter> 
                                : <GameStats stats={this.props.currentGame} />
                        }
                    </Row>
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