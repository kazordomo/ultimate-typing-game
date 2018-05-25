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
import Row from '../../styles/Row';
import { Link } from 'react-router-dom';

//TODO: create and import linkStyle
import styled, { css } from 'react-emotion';
const linkStyle = css`
    float: right;
    color: #FFFFFF;
    text-decoration: none;
    i {
        margin-left: 10px;
    }
`;

const textInputStyle = css`
    border: none;
    outline: none;
    background-color: transparent; 
    padding: 0px 10px;
    color: #FFFFFF;
`;

const ClearFix = styled('div')`
    ::after {
        content: "";
        clear: both;
        display: table;
    }
`;

const SortFilter = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 30px 0px;
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
        console.log(this.props);
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
            const listObj = items[key];
            const calculatedRating = 
                listObj.ratings.reduce((a, b) => a + b.value / listObj.ratings.length, 0);
            listObj.rating = calculatedRating;

            return <GlobalWordListItem 
               item={listObj} 
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
                <Link className={linkStyle} to='/game/wordlist/new'>
                    Add new list
                    <i className="fas fa-plus"></i>
                </Link>
                <ClearFix />
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
