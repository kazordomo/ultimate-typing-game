import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGlobalWordListsIfNeeded }  from '../../actions/globalWordListActions';
import { favorWordList } from '../../actions/wordListActions';
import GoBack from '../basic/GoBack';
import Loading from '../../styles/Loading';
import { Link } from 'react-router-dom';

class WordLists extends Component {

    componentDidMount() {
        this.props.fetchGlobalWordListsIfNeeded();
    }

    renderWordLists() {
        const { items } = this.props.globalWordLists;
        return Object.keys(items).map(key => {
            return (
                <div 
                    key={items[key]._id} >
                    {items[key].name}
                    <Link to={`/wordList/preview/${items[key]._id}`}>Link</Link>
                    <span onClick={() => this.props.favorWordList(items[key])}>Favorite</span>
                </div>
            );
        })
    }

    render() {

        if(!this.props.globalWordLists.isFetched)
            return <Loading />
        return (
            <div>
                <GoBack goTo='/dashboard' />
                <div>{ this.renderWordLists() }</div>
                <Link to='/game/wordlist/new'>Add new list</Link>
            </div>
        )
    }
}

function mapStateToProps({ globalWordLists }) {
    return { globalWordLists }
}

export default connect(mapStateToProps, { fetchGlobalWordListsIfNeeded, favorWordList })(WordLists);