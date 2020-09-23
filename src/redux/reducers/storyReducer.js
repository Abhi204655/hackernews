import {
    FETCH_STORIES_FAILURE,
    FETCH_STORIES_REQUEST,
    FETCH_STORIES_SUCCESS,
    FETCH_STORY_IDS_FAILURE,
    FETCH_STORY_IDS_REQUEST,
    FETCH_STORY_IDS_SUCCESS
} from '../actions/types';


const initialState = {
    storyIds: [],
    stories: [],
    page: 0,
    isFetching: false,
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STORIES_REQUEST:
        case FETCH_STORY_IDS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case FETCH_STORY_IDS_SUCCESS:
            return {
                ...state,
                storyIds: action.payload,
            };
        case FETCH_STORIES_SUCCESS:
            return {
                ...state,
                stories: [...state.stories, ...action.payload.stories],
                page: state.page + 1,
                isFetching: false,
            };
        case FETCH_STORY_IDS_FAILURE:
        case FETCH_STORIES_FAILURE:
            return {
                ...state,
                stories: [],
                storyIds: [],
                isFetching: false,
                error: action.payload
            }
        default:
            return state;
    }
}