import React, { Component } from 'react';
import { connect } from 'react-redux';
import Game from './Game';
import PracticeSideBar from './PracticeSideBar';
import Loading from '../../styles/Loading';
import Wrapper from '../../styles/Wrapper';
import GoBack from '../basic/GoBack';
import ModalContainer from '../basic/modal/ModalContainer';
import { 
    fetchWordListsIfNeeded, 
    fetchWordListIfNeeded, 
    deleteWordList,
    gameTimer,
    updateStat,
    updatePracticeStat,
    resetGame
} from '../../actions';

class Practice extends Component {

    async componentDidMount() {
        await this.props.fetchWordListsIfNeeded();
    }

    componentWillUnmount() {
        this.props.resetGame();
    }

    timer() {
        const { currentGame, gameTimer } = this.props;
        gameTimer(currentGame.practiceTime - 1);
    }

    handleChooseWordList(wordList) {
        this.props.fetchWordListIfNeeded(wordList._id);
    }

    handleSetTime(time) {
        if(time && time !== 0) {
            this.props.updatePracticeStat({target: 'practiceTime', value: time}); 
        }
    }

    render() {
        if(!this.props.wordLists.isFetched)
            return <Loading />
        return (
            <div>
                <GoBack goTo='/dashboard' />
                <Wrapper>
                    <Game 
                        practice 
                        timer={this.timer.bind(this)} 
                        gameTime={this.props.currentGame.practiceTime}
                        gameModeTitle='Practice' 
                    />
                    <PracticeSideBar 
                        wordLists={this.props.wordLists.items}
                        user={this.props.user}
                        time={this.props.currentGame.practiceTime}
                        currentWordListId={this.props.wordLists.currentWordList._id}
                        changeTime={this.handleSetTime.bind(this)}
                        chooseWordList={this.handleChooseWordList.bind(this)}
                        deleteWordList={this.props.deleteWordList.bind(this)}
                    />
                </Wrapper>
                <ModalContainer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { 
    fetchWordListsIfNeeded, 
    fetchWordListIfNeeded, 
    deleteWordList,
    gameTimer,
    updateStat,
    updatePracticeStat,
    resetGame
})(Practice);
