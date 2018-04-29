import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActiveWords from './ActiveWords';
import GameStats from './GameStats';
import Wrapper from '../../styles/Wrapper';
import Loading from '../../styles/Loading';
import Title from '../../styles/Title';
import textInputStyle from '../../styles/textInput';
import styled from 'react-emotion';
import { selectWordList } from '../../actions';
import { updateTime } from '../../player';

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

const CountDown = styled('div')`
    font-size: 64px;
    color: red;
    text-align: center;
`;

const BACKSPACE = 8;
const SPACE = 32;
const ENTER = 13;
const RED = 'red';
let character = 0;
let countDown = null;
let updateScore = null;
let start = null;

class Game extends Component {

    constructor(props) {
        super(props);
        
        this.initialState = {
            time: 60,
            keystrokes: 0,
            correctWords: 0,
            incorrectWords: 0,
            gameIsReady: true,
            multiPlayerCountDown: 3
        }
        this.state = this.initialState;
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    componentDidMount() {
        if(!this.props.practice)
            this.props.selectWordList(null); //reset currentWordList
        if(this.props.multiplayer) {
            this.multiplayerCountDown();
        }
    }

    componentWillUnmount() {
        this.clearInterval();
    }

    clearInterval() {
        clearInterval(countDown);
        clearInterval(updateScore);
        clearInterval(start);
    }

    startMultiplayer() {
        updateScore = setInterval(() => {
            this.props.updatePlayersWpm(this.state.correctWords);
        }, 1000);
        updateTime(true, (err, time) => {
            this.setState({ time });
            if(this.state.time === 0)
                clearInterval(updateScore);
        });
    }

    multiplayerCountDown() {
        countDown = setInterval(() => {
            let { multiPlayerCountDown } = this.state;
            this.setState({multiPlayerCountDown: multiPlayerCountDown - 1});
            if(multiPlayerCountDown === 0) {
                clearInterval(countDown);
                this.setState({multiPlayerCountDown: ''});
                this.startMultiplayer();
            }
        }, 1000);
    }

    timer() {
        start = setInterval(() => {
            const { correctWords, incorrectWords, keystrokes } = this.state;
            if(!this.props.multiplayer)
                this.setState({ time: this.state.time - 1});
            if(this.state.time === 0) {
                clearInterval(start);
                !this.props.practice && this.props.submitScore(correctWords, incorrectWords, keystrokes);
                this.setState({ gameIsReady: false });
            }
        }, 1000);
    }

    resetGame() {
        this.refs.gameTextInput.value = '';
        this.setState(this.initialState);
    }
    
    validateCharacter() {
        return this.props.currentWordList.words[0].slice(0, character) === this.refs.gameTextInput.value.slice(0, character);
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

        if(keyCode === ENTER) {
            clearInterval(start);
            this.setState(this.initialState);
        }

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
            if(this.refs.gameTextInput.value === this.props.currentWordList.words[0]) {
                this.setState({ correctWords: correctWords + 1 });
            } else {
                this.setState({ incorrectWords: incorrectWords + 1 });
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
        if(this.props.multiplayer && this.state.multiPlayerCountDown) {
            return <CountDown>{this.state.multiPlayerCountDown}</CountDown>;
        }
        let { time } = this.state;
        return(
            <div>
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
                            disabled={!time}
                            onKeyDown={this.handleOnKeyDown} 
                            onKeyUp={this.handleOnKeyUp} 
                            ref='gameTextInput' />
                        { time ? <Counter>{time}</Counter> : <GameStats stats={this.state} /> }
                    </Row>
                </Wrapper>
            </div>
        );
    }
}

function mapStateToProps({ user, wordLists: { currentWordList } }) {
    return { user, currentWordList };
}

export default connect(mapStateToProps, { selectWordList })(Game);