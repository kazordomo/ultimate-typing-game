import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    fetchGlobalWordListsIfNeeded, 
    sortGlobalWordLists, 
    filterGlobalWordLists 
}  from '../../actions/globalWordListActions';
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

    handleChange(event) {
        this.props.filterGlobalWordLists(event.target.value.toLowerCase());
    }

    //REFACTOR
    renderWordLists() {
        const { globalWordLists: { items }, user } = this.props;

        const filteredItems = Object.keys(items)
            .filter(key => {
                return items[key].name
                    .toLowerCase()
                    .includes(this.props.globalWordLists.filter);
            })
            .reduce((obj, key) => {
                obj[key] = items[key];
                return obj;
            }, {});
        
        return Object.keys(filteredItems).map(key => {
            let isUserFavored = user.data.favoredWordLists.find(id => id === items[key]._id) || false;
            let isUserList = items[key]._user === user.data._id;
            return (
                <div 
                    key={items[key]._id} >
                    <Link to={`/wordList/preview/${items[key]._id}`}>{items[key].name}</Link>
                    { isUserList ? '' :
                        isUserFavored ? 
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
                <input type='text' onChange={this.handleChange.bind(this)} />
                <div>
                    <button onClick={() => this.props.sortGlobalWordLists('createdDate')}>Sort by date</button>
                    <button onClick={() => this.props.sortGlobalWordLists('rating')}>Sort by rating</button>
                </div>
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
    deleteFavoredWordList,
    sortGlobalWordLists,
    filterGlobalWordLists
})(WordLists);
