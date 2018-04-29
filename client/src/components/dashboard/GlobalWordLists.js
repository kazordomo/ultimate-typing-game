import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGlobalWordListsIfNeeded }  from '../../actions/globalWordListActions';
import { favorWordList, deleteFavoredWordList } from '../../actions/wordListActions';
import { fetchUserIfNeeded } from '../../actions/userActions';
import GoBack from '../basic/GoBack';
import Loading from '../../styles/Loading';
import { Link } from 'react-router-dom';

//TODO: create and import linkStyle
import styled, { css } from 'react-emotion';
const linkStyle = css`
    display: block;
    width: 250px;
    margin: 0 auto;
    background-color: #5B9B66;
    color: #FFFFFF;
    text-align: center;
    text-decoration: none;
    border-radius: 2px;
`;

const I = styled('i')`
    color: yellow;
`;

class WordLists extends Component {

    async componentDidMount() {
        await this.props.fetchGlobalWordListsIfNeeded();
        await this.props.fetchUserIfNeeded();
    }

    toggleWordListFavored(favoredBoolean, func) {
        favoredBoolean = !favoredBoolean;
        func()
    }

    renderWordLists() {
        //TODO: because we are using actions from wordList, the favorite star will not be updated.
        const { globalWordLists: { items }, user } = this.props;
        return Object.keys(items).map(key => {
            let isUserFavored = user.data.favoredWordLists.find(id => id === items[key]._id) || false;
            return (
                <div 
                    key={items[key]._id} >
                    <Link to={`/wordList/preview/${items[key]._id}`}>{items[key].name}</Link>
                    { isUserFavored ? 
                        <span onClick={() => this.props.deleteFavoredWordList(items[key])}>
                            <I className="fas fa-star"></I>
                        </span> :
                        <span onClick={() => this.props.favorWordList(items[key])}>
                            <I className="far fa-star"></I>
                        </span>
                    }
                </div>
            );
        })
    }

    render() {

        if(!this.props.globalWordLists.isFetched || !this.props.user.isAuthenticated)
            return <Loading />
        return (
            <div>
                <GoBack goTo='/dashboard' />
                <Link className={linkStyle} to='/game/wordlist/new'>Add new list</Link>                
                <div>{ this.renderWordLists() }</div>
            </div>
        )
    }
}

function mapStateToProps({ globalWordLists, user }) {
    return { globalWordLists, user }
}

export default connect(mapStateToProps, { 
    fetchGlobalWordListsIfNeeded, 
    fetchUserIfNeeded, 
    favorWordList,
    deleteFavoredWordList
})(WordLists);