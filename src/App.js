import React from 'react';
import './App.scss';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { getStoriesIds, getStories, filterStories } from './redux/actions/storyActions';
import { hasMoreStoriesSelector } from './redux/selectors';
import ListItem from './components/ListItem';
import Loader from './components/Loader';
import Footer from './components/Footer';
import SearchBox from './components/SearchBox';
import Header from './components/Header';

class App extends React.Component {

    // state = {
    //     keyword: ''
    // }

    // handleChange = (e) => {
    //     const { filterStories } = this.props;
    //     const { keyword } = this.state;
    //     this.setState({
    //         keyword: e.target.value
    //     })
    //     const debouncedSave = debounce(() => filterStories(keyword), 1000);
    //     debouncedSave();
    // }

    static propTypes = {
        stories: PropTypes.array.isRequired,
        page: PropTypes.number.isRequired,
        storyIds: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        filteredStories: PropTypes.array.isRequired,
        keyword: PropTypes.string.isRequired,
        hasMoreStories: PropTypes.bool.isRequired,
        fetchStories: PropTypes.func.isRequired,
        fetchStoriesFirstPage: PropTypes.func.isRequired,
        filterStories: PropTypes.func.isRequired
    };


    componentDidMount() {
        this.props.fetchStoriesFirstPage();
    }

    fetchStories = () => {
        const { storyIds, page, fetchStories, isFetching } = this.props;
        if (!isFetching) {
            fetchStories({ storyIds, page });
        }
    };

    renderStories = () => {
        let { stories, filteredStories, hasMoreStories, keyword } = this.props;
        if (keyword === '') {
            return (
                <InfiniteScroll
                    dataLength={stories.length}
                    next={this.fetchStories}
                    hasMore={hasMoreStories}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                    loader={<Loader />}
                    style={{
                        height: '100%',
                        overflow: 'visible',
                    }}
                >
                    {stories.map(story => <ListItem key={story.id} story={story} />)}
                </InfiniteScroll>
            )
        } else {
            if (filteredStories.length === 0) {
                return <p>Not Found</p>
            } else {
                return (
                    filteredStories.map(story => <ListItem key={story.id} story={story} />)
                )
            }
        }
    }

    render() {

        return (
            <div className="app">
                <div className="app__header--wrapper">
                    <Header />
                    <SearchBox />
                </div>
                <div className="app__list__container">
                    {this.renderStories()}
                </div>
                <Footer />
            </div >
        );
    }
}

const mapStateToProps = state => ({
    stories: state.story.stories,
    page: state.story.page,
    storyIds: state.story.storyIds,
    isFetching: state.story.isFetching,
    filteredStories: state.story.filteredStories,
    keyword: state.story.keyword,
    hasMoreStories: hasMoreStoriesSelector(state),
});

const mapDispatchToProps = dispatch => ({
    fetchStories: ({ storyIds, page }) => dispatch(getStories({ storyIds, page })),
    fetchStoriesFirstPage: () => dispatch(getStoriesIds()),
    filterStories: (keyword) => dispatch(filterStories(keyword))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
