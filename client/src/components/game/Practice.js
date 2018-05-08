import React, { Component } from 'react';
import { connect } from 'react-redux';
import Game from './Game';
import PracticeSideBar from './PracticeSideBar';
import Loading from '../../styles/Loading';
import Wrapper from '../../styles/Wrapper';
import GoBack from '../basic/GoBack';
import { fetchWordListsIfNeeded, fetchWordListIfNeeded } from '../../actions';

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
                    <Game practice time={this.state.time} gameModeTitle='Practice' />
                    <PracticeSideBar 
                        wordLists={this.props.wordLists.items}
                        user={this.props.user}
                        time={this.state.time}
                        changeTime={this.handleSetTime.bind(this)}
                        chooseWordList={this.handleChooseWordList.bind(this)}
                    />
                </Wrapper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { fetchWordListsIfNeeded, fetchWordListIfNeeded })(Practice);
