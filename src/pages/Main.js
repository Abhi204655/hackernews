import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import './main.scss';
import { ListItem, Loader, Footer, Header, SearchBox } from '../components';
import { connect } from 'react-redux';
import { getStoriesIds, getStories, filterStories } from '../redux/actions/storyActions';
import { hasMoreStoriesSelector } from '../redux/selectors';


class App extends React.Component {

    state = {
        endpoint: ''
    }

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
        let endpoint = this.props.match.params.endpoint;
        console.log(endpoint);
        this.setState({ endpoint });
        this.props.fetchStoriesFirstPage(endpoint);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.endpoint !== nextProps.match.params.endpoint) {
            let endpoint = nextProps.match.params.endpoint;
            console.log(endpoint);
            this.props.fetchStoriesFirstPage(endpoint);
        }
    }

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
    fetchStoriesFirstPage: (endpoint) => dispatch(getStoriesIds(endpoint)),
    filterStories: (keyword) => dispatch(filterStories(keyword))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
