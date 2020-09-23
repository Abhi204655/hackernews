import {
    FETCH_STORIES_FAILURE,
    FETCH_STORIES_REQUEST,
    FETCH_STORIES_SUCCESS,
    FETCH_STORY_IDS_FAILURE,
    FETCH_STORY_IDS_REQUEST,
    FETCH_STORY_IDS_SUCCESS,
    FETCH_FILTERED_STORIES,
    SET_SEARCH_KEYWORD
} from './types';

import { getTopStoryIds, getStoriesByPage } from '../../api';

// import axios from 'axios';

export const getStoriesIds = () => async dispatch => {
    dispatch({ type: FETCH_STORY_IDS_REQUEST });

    getTopStoryIds().then(data => {
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

export const filterStories = (keyword) => dispatch => {
    if (keyword !== '') {
        dispatch({ type: FETCH_FILTERED_STORIES, payload: keyword })
    }
}

export const setSearchKeyword = (keyword) => dispatch => dispatch({ type: SET_SEARCH_KEYWORD, payload: keyword })