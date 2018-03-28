import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActiveWords from './templates/ActiveWords';
import GameStats from './templates/GameStats';
import Wrapper from '../../styles/Wrapper';
import Loading from '../../styles/Loading';
import Title from '../../styles/Title';
import textInputStyle from '../../styles/textInput';
import styled, { css } from 'react-emotion';
// import wordList from '../../utils/words';
import {fetchActiveWordList, fetchUser } from '../../actions';
import { updateTime } from '../../player';

const RestartButton = styled('button')`
    float: right;
    margin-top 4px;
`;

const Row = styled('div')`
    width: 100%;
    padding: 20px 0px;
`

const Counter = styled('div')`
    margin-top 10px;
    color: #5A7D7C;
    font-size: 40px;
    text-align: center;
`;

const BACKSPACE = 8;
const SPACE = 32;
// const ENTER = 13;
const RED = 'red';
let character = 0;

class Game extends Component {

    constructor(props) {
        super(props);
        
        this.initialState = {
            time: 20,
            keystrokes: 0,
            correctWords: 0,
            incorrectWords: 0,
            gameOverMessage: '',
            gameIsReady: true
        }
        this.state = this.initialState;
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    async componentDidMount() {
        await this.props.fetchActiveWordList();
        await this.props.fetchUser();
        if(this.props.multiplayer) {
            this.initMultiplayer();
        }
    }

    initMultiplayer() {
        let updateScore = setInterval(() => {
            this.props.updatePlayersWpm(this.state.correctWords);
        }, 1000);
        updateTime((err, time) => {
            this.setState({ time });
            if(this.state.time === 0) {
                clearInterval(updateScore);
            }
        });
    }

    timer() {
        let start = setInterval(() => {
            const { correctWords, incorrectWords, keystrokes } = this.state;
            if(!this.props.multiplayer)
                this.setState({ time: this.state.time - 1});
            if(this.state.time === 0) {
                clearInterval(start);
                console.log(correctWords);
                !this.props.practice && this.props.submitScore(correctWords, incorrectWords, keystrokes);
                this.setState({ gameOverMessage: this.props.gameOverMessage, gameIsReady: false });
            }
        }, 1000);
    }

    async resetGame() {
        await this.props.fetchActiveWordList();
        this.refs.gameTextInput.value = '';
        this.setState(this.initialState);
    }
    
    validateCharacter() {
        return this.props.activeWordList[0].slice(0, character) === this.refs.gameTextInput.value.slice(0, character);
    }
    
    gameTextInputBorder(validate) {
        if(validate) {
            this.refs.gameTextInput.style.borderBottom = '1px solid #5A7D7C';
            this.refs.gameTextInput.style.color = '#5A7D7C';
        }  else {
            this.refs.gameTextInput.style.borderBottom = `1px solid ${RED}`;
            this.refs.gameTextInput.style.color = `${RED}`;
        }
    }

    handleOnKeyDown({ keyCode }) {
        const { gameIsReady, keystrokes, correctWords, incorrectWords } = this.state;
        this.refs.gameTextInput.value = this.refs.gameTextInput.value.replace(/\s+/g,'');

        //TODO: we need to change how we start the game.
        if(gameIsReady && (keyCode > 65 && keyCode < 90)) {
            this.setState({ gameIsReady: false }, () => {
                this.timer();
            });
        }
        this.setState({ keystrokes: keystrokes + 1 });
        if(keyCode === BACKSPACE) {
            character--;
            this.validateCharacter() && this.gameTextInputBorder(true);
        } else if(keyCode === SPACE) {
            if(this.refs.gameTextInput.value === this.props.activeWordList[0]) {
                this.setState({ correctWords: correctWords + 1 });
            } else {
                this.setState({ incorrectWords: incorrectWords + 1 });
                this.gameTextInputBorder(false);
            }
            this.refs.gameTextInput.value = '';
            character = 0;
            this.props.activeWordList.shift();
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

    render() {
        if(!this.props.activeWordList) {
            return <Loading />;
        }
        let { time, gameIsReady, correctWords, incorrectWords, keystrokes } = this.state;
        return(
            <div>
                <Title>Singleplayer</Title>
                <Wrapper>
                    <Row>
                        <ActiveWords words={this.props.activeWordList} />
                    </Row>
                    <Row>
                        <input
                            type="text" 
                            className={textInputStyle}
                            autoFocus
                            disabled={!true}
                            onKeyDown={this.handleOnKeyDown} 
                            onKeyUp={this.handleOnKeyUp} 
                            ref='gameTextInput' />
                        {/* <RestartButton onClick={this.resetGame}>Restart</RestartButton> */}
                        <Counter>{time}</Counter>
                    </Row>
                    <Row>
                        <GameStats stats={this.state} />
                    </Row>
                </Wrapper>
            </div>
        );
    }
}

function mapStateToProps({ user, activeWordList }) {
    return { user, activeWordList };
}

export default connect(mapStateToProps, {fetchActiveWordList, fetchUser })(Game);