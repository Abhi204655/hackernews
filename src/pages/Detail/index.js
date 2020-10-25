import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroll-component';
import parse from 'html-react-parser';
import { Header, Footer, Loader } from '../../components';

import { fetchStory, getComments } from '../../redux/actions/storyActions';

import { hasMoreComments } from '../../redux/selectors';


import './detail.scss';

import TimeAgo from 'react-timeago';

class Detail extends React.Component {

    static propTypes = {
        story: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        comments: PropTypes.array.isRequired,
        commentIds: PropTypes.array.isRequired,
        getStoryFirstPage: PropTypes.func.isRequired,
        getComments: PropTypes.func.isRequired,
        isFetchingComments: PropTypes.bool.isRequired
    }

    componentDidMount() {
        let { storyId } = this.props.match.params;
        this.props.getStoryFirstPage(storyId);
    }

    fetchComments = () => {
        const { commentIds, pageComment, isFetching } = this.props;
        if (!isFetching) {
            this.props.getComments({ ids: commentIds, page: pageComment });
        }
    };

    renderStory = () => {
        const { isFetching, comments, story } = this.props;
        if (isFetching) {
            return <Loader />
        } else {
            return (
                <>
                    <div className="detail__block--story">
                        <h1>{story.title}</h1>
                        <div className="detail__block--story--desc">
                            <p>By:{' '}{story.by}</p>
                            <p>{'|'}</p>
                            <p>{story.time}</p>
                            {/* <p><TimeAgo date={new Date(story.time * 1000).toISOString()} /></p> */}
                        </div>
                    </div>
                    {comments.length === 0 ? (
                        <p>No Comments</p>
                    ) : (
                            <InfiniteScroll
                                dataLength={comments.length}
                                next={this.fetchComments}
                                hasMore={hasMoreComments}
                                loader={<Loader />}
                                endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }
                                style={{
                                    height: '100%',
                                    overflow: 'visible',
                                }}
                            >
                                {comments.map(comment => (
                                    <div key={comment.id} className="comment-block">
                                        <h2>{comment.by}</h2>
                                        <p><TimeAgo date={new Date(comment.time * 1000).toISOString()} /></p>
                                        {parse('<span>' + comment.text + '</span>')}
                                    </div>
                                ))}
                            </InfiniteScroll>
                        )}
                </>

            )
        }
    }

    render() {
        let { comments } = this.props;
        return (
            <div className="detail">
                <div className="app__header--wrapper">
                    <Header />
                </div >
                <div className="detail__block">
                    {this.renderStory()}
                </div>
                <Footer />
            </div >
        )
    }
}

const mapStateToProps = state => ({
    story: state.story.story,
    isFetching: state.story.isFetching,
    comments: state.story.comments,
    pageComment: state.story.pageComment,
    commentIds: state.story.commentIds,
    isFetchingComments: state.story.isFetchingComments
})

const mapDispatchProps = dispatch => ({
    getStoryFirstPage: (id) => dispatch(fetchStory(id)),
    getComments: ({ ids: commentIds, page: pageComment }) => dispatch(getComments({ ids: commentIds, page: pageComment })),
})

export default connect(mapStateToProps, mapDispatchProps)(Detail);
