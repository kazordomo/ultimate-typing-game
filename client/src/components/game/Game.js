import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActiveWords from './templates/ActiveWords';
import GameStats from './templates/GameStats';
import Wrapper from '../../styles/Wrapper';
import Loading from '../../styles/Loading';
import styled, { css } from 'react-emotion';
// import wordList from '../../utils/words';
import { submitScore, fetchActiveWordList, fetchUser } from '../../actions';
import { newPlayer, updatePlayerScores, unsubscribe } from '../../player';


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

class Game extends Component {

    constructor(props) {
        super(props);
        
        this.initialState = {
            time: 60,
            keystrokes: 0,
            correctWords: 0,
            incorrectWords: 0,
            gameOverMessage: '',
            gameIsReady: false
        }
        this.state = this.initialState;
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
        this.handleSubmitScore = this.handleSubmitScore.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.startUpdateInterval = null;
    }

    async componentDidMount() {
        await this.props.fetchActiveWordList();
        await this.props.fetchUser();
        if(this.props.multiplayer) {
            this.startMultiplayerGame();
        } else {
            this.setState({ gameIsReady: true });
        }
    }

    componentWillUnmount() {
        this.startUpdateInterval && clearInterval(this.startUpdateInterval);
        unsubscribe();
    }

    startMultiplayerGame() {
        const { user: { _id, local: { username } } } = this.props;
        newPlayer(this.props.user, (err, playerName) => {
            if(username !== playerName) {
                this.props.opponentName(playerName);        
            }
        });
        this.startUpdateInterval = setInterval(() => {
            //TODO: check the security of this, we do not want players to be able to send their own data to the server.
            //TODO: refactor. we do not want to update the state if the game is not in the play (player leaves the component or room).
            updatePlayerScores({ user: _id, wpm: this.state.correctWords}, (err, data) => {
                if(data.gameIsReady) {
                    this.setState({ gameIsReady: true });
                } else {
                    this.setState({ gameIsReady: false });
                }
                if(data.user === this.props.user._id) {
                    this.props.userWpm(data.wpm);
                } else {
                    this.props.opponentWpm(data.wpm);
                }
            });
        }, 1000); //5000
    }

    timer() {
        let start = setInterval(() => {
            this.setState({ time: this.state.time - 1});
            if(this.state.time === 0) {
                clearInterval(start);
                this.refs.scoreSubmitButton.click();
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
        return validate ? 
            this.refs.gameTextInput.style.border = '3px solid transparent' : 
            this.refs.gameTextInput.style.border = `3px solid ${RED}`;
    }

    renderWaitingForPlayer() {
        return this.state.gameIsReady ? '' : 'Waiting on opponent...';
    }

    handleOnKeyDown({ keyCode }) {
        const { gameIsReady, keystrokes, correctWords, incorrectWords } = this.state;
        this.refs.gameTextInput.value = this.refs.gameTextInput.value.replace(/\s+/g,'');

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

    handleSubmitScore() {
        const { correctWords, incorrectWords, keystrokes } = this.state; 
        this.props.submitScore({ correctWords, incorrectWords, keystrokes });
    }

    render() {
        let { time, gameIsReady } = this.state;
        if(!this.props.activeWordList) {
            return <Loading />;
        }
        return(
            <Wrapper>
                {this.props.multiplayer && this.renderWaitingForPlayer()}
                <Row>
                    <ActiveWords words={this.props.activeWordList} />
                </Row>
                <Row>
                    <input
                        type="text" 
                        className={inputStyle}
                        autoFocus
                        disabled={!gameIsReady}
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

export default connect(mapStateToProps, { submitScore, fetchActiveWordList, fetchUser })(Game);