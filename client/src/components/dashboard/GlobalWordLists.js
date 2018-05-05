import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    fetchGlobalWordListsIfNeeded, 
    sortGlobalWordLists, 
    filterGlobalWordLists 
}  from '../../actions/globalWordListActions';
import { favorWordList, deleteFavoredWordList } from '../../actions/wordListActions';
import { fetchUserIfNeeded } from '../../actions/userActions';
import GlobalWordListItem from './GlobalWordListItem';
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

const textInputStyle = css`
    border: none;
    outline: none;
    background-color: transparent; 
    padding: 0px 10px;
    color: #FFFFFF;
`;

const SortFilter = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 20px 0px;
    border-bottom: 1px solid #5A7D7C;
`;

const SortButton = styled('button')`
    width: 150px;
    margin: 2px 1px;
    outline: none;
    border: none;
    background-color: rgba(90,125,124, 0.7);
    color: #FFFFFF;
    cursor: pointer;
`;

const I = styled('i')`
    color: #5A7D7C;
`;

const ListInnerContainer = styled('div')`
    display: grid;
    grid-gap: 10px;
    grid-template: repeat(8, 1fr) / repeat(3, 1fr);
    grid-auto-flow: row;
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
            let isUserFavored = user.data.favoredWordLists.indexOf(key) > -1;
            let isUserList = items[key]._user === user.data._id;

            return <GlobalWordListItem 
               item={items[key]} 
               user={user}
               deleteList={this.props.deleteFavoredWordList}
               favorList={this.props.favorWordList}
               bools={{isUserFavored, isUserList}}
               key={key}
            />
        })
    }

    render() {

        if(!this.props.globalWordLists.isFetched || !this.props.user.isAuthenticated)
            return <Loading />
        return (
            <div>
                <GoBack goTo='/dashboard' />
                <SortFilter>
                    <div>
                        <I className="fas fa-search"></I>
                        <input className={textInputStyle} type='text' onChange={this.handleChange.bind(this)} />
                    </div>
                    <div>
                        <SortButton onClick={() => this.props.sortGlobalWordLists('createdDate')}>Sort by date</SortButton>
                        <SortButton onClick={() => this.props.sortGlobalWordLists('rating')}>Sort by rating</SortButton>
                    </div>
                </SortFilter>
                <ListInnerContainer>
                    { this.renderWordLists() }
                </ListInnerContainer>
                <Link className={linkStyle} to='/game/wordlist/new'>Add new list</Link>                
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
