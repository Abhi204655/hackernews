import {
    FETCH_STORIES_FAILURE,
    FETCH_STORIES_REQUEST,
    FETCH_STORIES_SUCCESS,
    FETCH_STORY_IDS_FAILURE,
    FETCH_STORY_IDS_REQUEST,
    FETCH_STORY_IDS_SUCCESS
} from './types';

import { getTopStoryIds, getStoriesByPage } from '../../api';

// import axios from 'axios';

export const getStoriesIds = () => async dispatch => {
    dispatch({ type: FETCH_STORY_IDS_REQUEST });

    getTopStoryIds().then(data => {
        console.log(data);
        dispatch({ type: FETCH_STORY_IDS_SUCCESS, payload: data });
        dispatch(getStories({ storyIds: data, page: 0 }));
    }).catch(err => dispatch({ type: FETCH_STORY_IDS_FAILURE }));
}

export const getStories = ({ storyIds, page }) => async dispatch => {
    dispatch({ type: FETCH_STORIES_REQUEST });

    getStoriesByPage(storyIds, page).then(stories => {
        dispatch({ type: FETCH_STORIES_SUCCESS, payload: { stories } })
    }).catch(err => dispatch({ type: FETCH_STORIES_FAILURE }));
}

