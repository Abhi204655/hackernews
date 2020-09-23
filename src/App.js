import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { getStoriesIds, getStories } from './redux/actions/storyActions';
import { hasMoreStoriesSelector } from './redux/selectors';

class App extends React.Component {

    static propTypes = {
        stories: PropTypes.array.isRequired,
        page: PropTypes.number.isRequired,
        storyIds: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        hasMoreStories: PropTypes.bool.isRequired,
        fetchStories: PropTypes.func.isRequired,
        fetchStoriesFirstPage: PropTypes.func.isRequired,
    };


    componentDidMount() {
        this.props.fetchStoriesFirstPage();
        console.log(this.props.hasMoreStories)
        console.log(this.props);
    }

    fetchStories = () => {
        const { storyIds, page, fetchStories, isFetching } = this.props;
        if (!isFetching) {
            fetchStories({ storyIds, page });
        }
    };

    render() {

        const { stories, hasMoreStories } = this.props;
        return (
            <div>
                <InfiniteScroll
                    dataLength={stories.length}
                    next={this.fetchStories}
                    hasMore={hasMoreStories}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                    loader={<p>Loading...</p>}
                    style={{
                        height: '100%',
                        overflow: 'visible',
                    }}
                >
                    {stories.map(story => <p key={story.id}>{story.title}</p>)}
                </InfiniteScroll>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    stories: state.story.stories,
    page: state.story.page,
    storyIds: state.story.storyIds,
    isFetching: state.story.isFetching,
    hasMoreStories: hasMoreStoriesSelector(state),
});

const mapDispatchToProps = dispatch => ({
    fetchStories: ({ storyIds, page }) => dispatch(getStories({ storyIds, page })),
    fetchStoriesFirstPage: () => dispatch(getStoriesIds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
