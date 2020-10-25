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

    SET_SEARCH_KEYWORD,
    FETCH_FILTERED_STORIES
} from '../actions/types';


const initialState = {
    storyIdsTop: [],
    storyIdsBest: [],
    storyIdsNew: [],
    storiesTop: [],
    storiesBest: [],
    storiesNew: [],

    story: {},
    comments: [],
    commentIds: [],
    pageComment: 0,
    isFetchingComments: false,

    keyword: '',
    filteredStories: [],
    pageTop: 0,
    pageBest: 0,
    pageNew: 0,
    isFetching: false,
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BESTSTORIES_REQUEST:
        case FETCH_NEWSTORIES_REQUEST:
        case FETCH_TOPSTORIES_REQUEST:
        case FETCH_BESTSTORY_IDS_REQUEST:
        case FETCH_NEWSTORY_IDS_REQUEST:
        case FETCH_TOPSTORY_IDS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case FETCH_TOPSTORY_IDS_SUCCESS:
            return {
                ...state,
                storyIdsTop: action.payload,
            };
        case FETCH_BESTSTORY_IDS_SUCCESS:
            return {
                ...state,
                storyIdsBest: action.payload,
            };
        case FETCH_NEWSTORY_IDS_SUCCESS:
            return {
                ...state,
                storyIdsNew: action.payload,
            };
        case FETCH_TOPSTORIES_SUCCESS:
            return {
                ...state,
                storiesTop: [...state.storiesTop, ...action.payload.stories],
                pageTop: state.pageTop + 1,
                isFetching: false,
            };
        case FETCH_BESTSTORIES_SUCCESS:
            return {
                ...state,
                storiesBest: [...state.storiesBest, ...action.payload.stories],
                pageBest: state.pageBest + 1,
                isFetching: false,
            };
        case FETCH_NEWSTORIES_SUCCESS:
            return {
                FETCH_COMMENTS_REQUEST,
                FETCH_COMMENTS_SUCCESS,
                FETCH_COMMENTS_FAILURE,
                ...state,
                storiesNew: [...state.storiesNew, ...action.payload.stories],
                pageNew: state.pageNew + 1,
                isFetching: false,
            };
        case FETCH_TOPSTORY_IDS_FAILURE:
        case FETCH_TOPSTORIES_FAILURE:
            return {
                ...state,
                storiesTop: [],
                storyIdsTop: [],
                isFetching: false,
                error: action.payload
            }
        case FETCH_BESTSTORY_IDS_FAILURE:
        case FETCH_BESTSTORIES_FAILURE:
            return {
                ...state,
                storiesBest: [],
                storyIdsBest: [],
                isFetching: false,
                error: action.payload
            }
        case FETCH_NEWSTORY_IDS_FAILURE:
        case FETCH_NEWSTORIES_FAILURE:
            return {
                ...state,
                storiesNew: [],
                storyIdsNew: [],
                isFetching: false,
                error: action.payload
            }
        case FETCH_FILTERED_STORIES:
            return {
                ...state,
                filteredStories: [...state.storiesBest, ...state.storiesNew, ...state.storiesTop].filter(story => story.title.toLowerCase().includes(action.payload.keyword.toLowerCase()))
            }

        case FETCH_STORY_REQUEST:
            return {
                ...state,
                isFetching: true,
                commentIds: [],
                comments: []
            }
        case FETCH_STORY_SUCCESS:
            return {
                ...state,
                story: action.payload.story,
                commentIds: action.payload.commentIds,
                isFetching: false
            }

        case FETCH_STORY_FAILURE:
            return {
                ...state,
                story: {},
                isFetching: false,
                error: action.payload
            }
        case FETCH_COMMENTS_REQUEST:
            return {
                ...state,
                isFetchingComments: true
            }

        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                isFetchingComments: false,
                comments: [...state.comments, ...action.payload],
                pageComment: state.pageComment + 1
            }
        case FETCH_COMMENTS_FAILURE:
            return {
                ...state,
                comments: [],
                isFetchingComments: false
            }
        case SET_SEARCH_KEYWORD:
            return {
                ...state,
                keyword: action.payload
            }
        default:
            return state;
    }
}