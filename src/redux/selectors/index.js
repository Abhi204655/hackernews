import { createSelector } from 'reselect';

const storyIdsSelectorTop = state => state.story.storyIdsTop;
const storiesSelectorTop = state => state.story.storiesTop;

const storyIdsSelectorBest = state => state.story.storyIdsBest;
const storiesSelectorBest = state => state.story.storiesBest;

const storyIdsSelectorNew = state => state.story.storyIdsNew;
const storiesSelectorNew = state => state.story.storiesNew;

const commentIdsSelector = state => state.story.commentIds;
const commentsSelector = state => state.story.comments;

export const hasMoreTopStoriesSelector = createSelector(
    storyIdsSelectorTop,
    storiesSelectorTop,
    (storyIdsTop, storiesTop) => storyIdsTop.length > storiesTop.length,
);

export const hasMoreBestStoriesSelector = createSelector(
    storyIdsSelectorBest,
    storiesSelectorBest,
    (storyIdsBest, storiesBest) => storyIdsBest.length > storiesBest.length,
);

export const hasMoreNewStoriesSelector = createSelector(
    storyIdsSelectorNew,
    storiesSelectorNew,
    (storyIdsNew, storiesNew) => storyIdsNew.length > storiesNew.length,
);

export const hasMoreComments = createSelector(
    commentIdsSelector,
    commentsSelector,
    (commmentIds, comments) => commmentIds.length > comments.length,
);