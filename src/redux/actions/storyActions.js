import {
    FETCH_TOPSTORIES_FAILURE,
    FETCH_TOPSTORIES_REQUEST,
    FETCH_TOPSTORIES_SUCCESS,


    FETCH_BESTSTORIES_FAILURE,
    FETCH_BESTSTORIES_REQUEST,
    FETCH_BESTSTORIES_SUCCESS,


    FETCH_NEWSTORIES_FAILURE,
    FETCH_NEWSTORIES_REQUEST,
    FETCH_NEWSTORIES_SUCCESS,

    FETCH_TOPSTORY_IDS_FAILURE,
    FETCH_TOPSTORY_IDS_REQUEST,
    FETCH_TOPSTORY_IDS_SUCCESS,

    FETCH_BESTSTORY_IDS_FAILURE,
    FETCH_BESTSTORY_IDS_REQUEST,
    FETCH_BESTSTORY_IDS_SUCCESS,

    FETCH_NEWSTORY_IDS_FAILURE,
    FETCH_NEWSTORY_IDS_REQUEST,
    FETCH_NEWSTORY_IDS_SUCCESS,


    FETCH_STORY_REQUEST,
    FETCH_STORY_SUCCESS,
    FETCH_STORY_FAILURE,

    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAILURE,

    FETCH_FILTERED_STORIES,
    SET_SEARCH_KEYWORD
} from './types';

import { getStoryIds, getStoriesByPage, getStory, getCommentsByPage } from '../../api';


const ActionTypesIDS = {
    best: {
        failure: FETCH_BESTSTORY_IDS_FAILURE,
        request: FETCH_BESTSTORY_IDS_REQUEST,
        success: FETCH_BESTSTORY_IDS_SUCCESS
    },
    new: {
        failure: FETCH_NEWSTORY_IDS_FAILURE,
        request: FETCH_NEWSTORY_IDS_REQUEST,
        success: FETCH_NEWSTORY_IDS_SUCCESS
    },
    top: {
        failure: FETCH_TOPSTORY_IDS_FAILURE,
        request: FETCH_TOPSTORY_IDS_REQUEST,
        success: FETCH_TOPSTORY_IDS_SUCCESS
    }
}

const ActionTypes = {
    best: {
        failure: FETCH_BESTSTORIES_FAILURE,
        request: FETCH_BESTSTORIES_REQUEST,
        success: FETCH_BESTSTORIES_SUCCESS
    },
    new: {
        failure: FETCH_NEWSTORIES_FAILURE,
        request: FETCH_NEWSTORIES_REQUEST,
        success: FETCH_NEWSTORIES_SUCCESS
    },
    top: {
        failure: FETCH_TOPSTORIES_FAILURE,
        request: FETCH_TOPSTORIES_REQUEST,
        success: FETCH_TOPSTORIES_SUCCESS
    }
}


export const getStoriesIds = (endpoint = "topstories") => async dispatch => {

    let actionSelection;
    switch (endpoint) {
        case "topstories":
            actionSelection = ActionTypesIDS.top;
            break;
        case "newstories":
            actionSelection = ActionTypesIDS.new;
            break;
        case "beststories":
            actionSelection = ActionTypesIDS.best;
            break;
        default:
            actionSelection = ActionTypesIDS.top;
            break;
    }

    // dispatch({ type: FETCH_STORY_IDS_REQUEST });
    dispatch({ type: actionSelection.request });
    getStoryIds(endpoint).then(data => {
        // dispatch({ type: FETCH_STORY_IDS_SUCCESS, payload: data });
        // dispatch(getStories({ storyIds: data, page: 0 }));

        dispatch({ type: actionSelection.success, payload: data });
        dispatch(getStories({ storyIds: data, page: 0, endpoint }))

    }).catch(err => {
        // dispatch({ type: FETCH_STORY_IDS_FAILURE })

        dispatch({ type: actionSelection.failure, payload: err })
    });
}

export const getStories = ({ storyIds, page, endpoint = "topstories" }) => async dispatch => {

    let actionSelection;
    switch (endpoint) {
        case "topstories":
            actionSelection = ActionTypes.top;
            break;
        case "newstories":
            actionSelection = ActionTypes.new;
            break;
        case "beststories":
            actionSelection = ActionTypes.best;
            break;
        default:
            actionSelection = ActionTypes.top;
            break;
    }

    // dispatch({ type: FETCH_STORIES_REQUEST });
    dispatch({ type: actionSelection.request });

    getStoriesByPage(storyIds, page, endpoint).then(stories => {
        // dispatch({ type: FETCH_STORIES_SUCCESS, payload: { stories } })
        dispatch({ type: actionSelection.success, payload: { stories } })

    }).catch(err => {
        // dispatch({ type: FETCH_STORIES_FAILURE })
        dispatch({ type: actionSelection.failure, payload: err })
    });
}


export const fetchStory = (id) => async dispatch => {
    dispatch({ type: FETCH_STORY_REQUEST });

    getStory(id).then(story => {
        console.log(story);
        dispatch({ type: FETCH_STORY_SUCCESS, payload: { story, commentIds: (story.kids !== undefined ? story.kids : []) } })
        dispatch(getComments({ ids: (typeof story.kids === "undefined" ? [] : story.kids), page: 0 }));
    }).catch(err => {
        dispatch({ type: FETCH_STORY_FAILURE, payload: err })
    })
}

export const getComments = ({ ids, page }) => dispatch => {

    dispatch({ type: FETCH_COMMENTS_REQUEST });

    console.log('entered inside', ids)

    // if (ids.length === 0) {
    //     dispatch({ type: FETCH_COMMENTS_SUCCESS, payload: [] });
    // } else {
    getCommentsByPage({ ids, page }).then(commments => {
        dispatch({ type: FETCH_COMMENTS_SUCCESS, payload: commments })
    }).catch(err => {
        dispatch({ type: FETCH_COMMENTS_FAILURE, payload: err })
    })
    // }
}

export const filterStories = (keyword) => dispatch => {
    if (keyword !== '') {
        dispatch({ type: FETCH_FILTERED_STORIES, payload: { keyword } })
    }
}

export const setSearchKeyword = (keyword) => dispatch => dispatch({ type: SET_SEARCH_KEYWORD, payload: keyword })