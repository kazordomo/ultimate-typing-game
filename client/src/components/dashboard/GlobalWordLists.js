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
import Style from '../../styles/GlobalWordListsStyle';

class WordLists extends Component {

    state = {
        currentSorting: 'createdDate'
    }

    async componentDidMount() {
        await Promise.all([
            this.props.fetchGlobalWordListsIfNeeded(), 
            // this.props.fetchUserIfNeeded(),
        ]);
    }

    handleChange(event) {
        this.props.filterGlobalWordLists(event.target.value.toLowerCase());
    }

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

    handleSort(sortValue) {
        this.setState({ currentSorting: sortValue }, () => {
            this.props.sortGlobalWordLists(sortValue);
        });
    }

    render() {
        const { 
            linkStyle,
            textInputStyle,
            ClearFix,
            SortFilter,
            SortButton,
            I,
            ListInnerContainer,
        } = Style;

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
                        <SortButton 
                            active={this.state.currentSorting === 'createdDate'} 
                            onClick={() => this.handleSort('createdDate')}>
                            Sort by date
                        </SortButton>
                        <SortButton 
                            active={this.state.currentSorting === 'rating'} 
                            onClick={() => this.handleSort('rating')}>
                            Sort by rating
                        </SortButton>
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
