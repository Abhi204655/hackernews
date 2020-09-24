import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import './main.scss';
import { ListItem, Loader, Footer, Header, SearchBox } from '../components';
import { connect } from 'react-redux';
import { getStoriesIds, getStories, filterStories } from '../redux/actions/storyActions';
import { hasMoreTopStoriesSelector, hasMoreBestStoriesSelector, hasMoreNewStoriesSelector } from '../redux/selectors';


class App extends React.Component {

    // state = {
    //     endpoint: ''
    // }

    static propTypes = {
        // stories: PropTypes.array.isRequired,
        // page: PropTypes.number.isRequired,
        // storyIds: PropTypes.array.isRequired,
        // isFetching: PropTypes.bool.isRequired,
        // filteredStories: PropTypes.array.isRequired,
        // keyword: PropTypes.string.isRequired,
        // hasMoreStories: PropTypes.bool.isRequired,
        // fetchStories: PropTypes.func.isRequired,
        // fetchStoriesFirstPage: PropTypes.func.isRequired,
        // filterStories: PropTypes.func.isRequired


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
        console.log('rendering again');
    }

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.match.params.endpoint !== nextProps.match.params.endpoint) {
    //         let endpoint = nextProps.match.params.endpoint;
    //         console.log(endpoint);
    //         this.props.fetchStoriesFirstPage(endpoint);
    //     }
    // }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.match.params.endpoint !== prevState.match.params.endpoint) {
    //         let endpoint = nextProps.match.params.endpoint;
    //         console.log(endpoint);
    //         nextProps.fetchStoriesFirstPage(endpoint);
    //         return null;
    //     } else return null;
    // }

    // static getDerivedStateFromProps(props, state) {
    //     if (state.endpoint !== props.match.params.endpoint) {

    //         let endpoint = props.match.params.endpoint;
    //         console.log(endpoint);
    //         props.fetchStoriesFirstPage(endpoint);
    //         return {
    //             endpoint: props.match.params.endpoint
    //         }
    //     } else return null;
    // }

    // componentDidUpdate() {
    //     let endpoint = this.props.match.params.endpoint;
    //     console.log(endpoint);
    //     this.props.fetchStoriesFirstPage(endpoint);
    // }

    fetchTopStories = () => {
        const { storyIdsTop, pageTop, fetchTopStories, isFetching } = this.props;

        if (!isFetching) {
            fetchTopStories({ storyIdsTop, pageTop });
        }
    };

    fetchBestStories = () => {
        const { storyIdsBest, pageBest, fetchBestStories, isFetching } = this.props;
        if (!isFetching) {
            fetchBestStories({ storyIdsBest, pageBest });
        }
    };
    fetchNewStories = () => {
        const { storyIdsNew, pageNew, fetchNewStories, isFetching } = this.props;

        if (!isFetching) {
            fetchNewStories({ storyIdsNew, pageNew });
        }
    };

    renderStories = () => {
        let { storiesTop, storiesBest, storiesNew, filteredStories, hasMoreTopStories, hasMoreNewStories, hasMoreBestStories, keyword } = this.props;
        let { endpoint } = this.props.match.params;
        let fetchStoriesFunc;
        let curStories;
        let hasMoreStories;
        switch (endpoint) {
            case "topstories" || '':
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
    // stories: state.story.stories,
    // page: state.story.page,
    // storyIds: state.story.storyIds,
    // isFetching: state.story.isFetching,
    // filteredStories: state.story.filteredStories,
    // keyword: state.story.keyword,
    // hasMoreStories: hasMoreStoriesSelector(state),


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
    fetchTopStories: ({ storyIdsTop, pageTop }) => dispatch(getStories({ storyIdsTop, pageTop })),
    fetchBestStories: ({ storyIdsBest, pageBest }) => dispatch(getStories({ storyIdsBest, pageBest })),
    fetchNewStories: ({ storyIdsNew, pageNew }) => dispatch(getStories({ storyIdsNew, pageNew })),
    fetchStoriesFirstPage: (endpoint) => dispatch(getStoriesIds(endpoint)),
    filterStories: (keyword) => dispatch(filterStories(keyword))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
