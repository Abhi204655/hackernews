import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import './main.scss';
import { ListItem, Loader, Footer, Header, SearchBox } from '../components';
import { connect } from 'react-redux';
import { getStoriesIds, getStories, filterStories } from '../redux/actions/storyActions';
import { hasMoreTopStoriesSelector, hasMoreBestStoriesSelector, hasMoreNewStoriesSelector } from '../redux/selectors';


class App extends React.Component {

    state = {
        endpoint: ''
    }

    static propTypes = {

        storiesTop: PropTypes.array.isRequired,
        storiesBest: PropTypes.array.isRequired,
        storiesNew: PropTypes.array.isRequired,
        pageTop: PropTypes.number.isRequired,
        pageBest: PropTypes.number.isRequired,
        pageNew: PropTypes.number.isRequired,
        storyIdsTop: PropTypes.array.isRequired,
        storyIdsBest: PropTypes.array.isRequired,
        storyIdsNew: PropTypes.array.isRequired,

        isFetching: PropTypes.bool.isRequired,
        filteredStories: PropTypes.array.isRequired,
        keyword: PropTypes.string.isRequired,

        hasMoreTopStories: PropTypes.bool.isRequired,
        hasMoreBestStories: PropTypes.bool.isRequired,
        hasMoreNewStories: PropTypes.bool.isRequired,

        fetchTopStories: PropTypes.func.isRequired,
        fetchBestStories: PropTypes.func.isRequired,
        fetchNewStories: PropTypes.func.isRequired,
        fetchStoriesFirstPage: PropTypes.func.isRequired,
        filterStories: PropTypes.func.isRequired
    };


    componentDidMount() {
        let endpoint = this.props.match.params.endpoint;
        this.setState({ endpoint });
        this.props.fetchStoriesFirstPage("topstories");
        this.props.fetchStoriesFirstPage("newstories");
        this.props.fetchStoriesFirstPage("beststories");

        console.log('rendering');

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.match.params.endpoint !== prevState.endpoint) {
            window.scrollTo(0, 0);
            console.log(nextProps.match.params.endpoint);
            return { endpoint: nextProps.match.params.endpoint };
        } else return null;
    }

    fetchTopStories = () => {
        const { storyIdsTop, pageTop, fetchTopStories, isFetching } = this.props;
        const { endpoint } = this.props.match.params;
        if (!isFetching) {
            fetchTopStories({ storyIds: storyIdsTop, page: pageTop, endpoint });
        }
    };

    fetchBestStories = () => {
        const { storyIdsBest, pageBest, fetchBestStories, isFetching } = this.props;

        const { endpoint } = this.props.match.params;
        if (!isFetching) {
            fetchBestStories({ storyIds: storyIdsBest, page: pageBest, endpoint });
        }
    };
    fetchNewStories = () => {
        const { storyIdsNew, pageNew, fetchNewStories, isFetching } = this.props;

        const { endpoint } = this.props.match.params;
        if (!isFetching) {
            fetchNewStories({ storyIds: storyIdsNew, page: pageNew, endpoint });
        }
    };

    renderStories = () => {
        let { storiesTop, storiesBest, storiesNew, filteredStories, hasMoreTopStories, hasMoreNewStories, hasMoreBestStories, keyword } = this.props;
        let { endpoint } = this.props.match.params;
        let fetchStoriesFunc;
        let curStories;
        let hasMoreStories;
        if (typeof endpoint === "undefined") {
            endpoint = "topstories";
        }
        switch (endpoint) {
            case "topstories":
                fetchStoriesFunc = this.fetchTopStories;
                curStories = storiesTop;
                hasMoreStories = hasMoreTopStories;
                break;
            case "newstories":
                fetchStoriesFunc = this.fetchNewStories;
                curStories = storiesNew;
                hasMoreStories = hasMoreNewStories;
                break;
            case "beststories":
                fetchStoriesFunc = this.fetchBestStories;
                curStories = storiesBest;
                hasMoreStories = hasMoreBestStories;
                break;
            default:
                fetchStoriesFunc = this.fetchTopStories;
                curStories = storiesTop;
                break;
        }
        if (keyword === '') {
            return (
                <InfiniteScroll
                    dataLength={curStories.length}
                    next={fetchStoriesFunc}
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
                    {curStories.map(story => <ListItem key={story.id} story={story} />)}
                </InfiniteScroll>
            )
        } else {
            if (filteredStories.length === 0) {
                return (
                    <div className="not-found">
                        <h2>Not <span>Found</span>.</h2>
                        <p>Search for some other keyword</p>
                    </div>
                )
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

    storiesTop: state.story.storiesTop,
    storiesBest: state.story.storiesBest,
    storiesNew: state.story.storiesNew,

    pageTop: state.story.pageTop,
    pageBest: state.story.pageBest,
    pageNew: state.story.pageNew,

    storyIdsTop: state.story.storyIdsTop,
    storyIdsBest: state.story.storyIdsBest,
    storyIdsNew: state.story.storyIdsNew,

    isFetching: state.story.isFetching,
    filteredStories: state.story.filteredStories,
    keyword: state.story.keyword,
    hasMoreTopStories: hasMoreTopStoriesSelector(state),
    hasMoreBestStories: hasMoreBestStoriesSelector(state),
    hasMoreNewStories: hasMoreNewStoriesSelector(state),
});

const mapDispatchToProps = dispatch => ({

    fetchTopStories: ({ storyIds, page, endpoint }) => dispatch(getStories({ storyIds, page, endpoint })),
    fetchBestStories: ({ storyIds, page, endpoint }) => dispatch(getStories({ storyIds, page, endpoint })),
    fetchNewStories: ({ storyIds, page, endpoint }) => dispatch(getStories({ storyIds, page, endpoint })),

    fetchStoriesFirstPage: (endpoint) => dispatch(getStoriesIds(endpoint)),
    filterStories: (keyword) => dispatch(filterStories(keyword))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
