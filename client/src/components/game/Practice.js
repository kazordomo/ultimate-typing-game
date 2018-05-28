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
    resetGame
} from '../../actions';

class Practice extends Component {

    constructor(props) {
        super(props);

        this.state = {
            words: [],
            wordListActive: true,
            time: 60
        }
    }

    async componentDidMount() {
        await this.props.fetchWordListsIfNeeded();
    }

    componentWillUnmount() {
        this.props.resetGame();
    }

    //DRY
    timer() {
        const { currentGame, gameTimer } = this.props;
        gameTimer(currentGame.time - 1);
    }

    handleChooseWordList(wordList) {
        this.props.fetchWordListIfNeeded(wordList._id);
    }

    handleSetTime(time) {
        this.setState({ time });
    }

    render() {
        if(!this.props.wordLists.isFetched)
            return <Loading />
        return (
            <div>
                <GoBack goTo='/dashboard' />
                <Wrapper>
                    <Game practice timer={this.timer.bind(this)} gameModeTitle='Practice' />
                    <PracticeSideBar 
                        wordLists={this.props.wordLists.items}
                        user={this.props.user}
                        time={this.props.currentGame.time}
                        changeTime={this.props.updateStat.bind(this)}
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
    resetGame
})(Practice);
