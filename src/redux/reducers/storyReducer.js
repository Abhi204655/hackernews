import {
    // FETCH_FILTERED_STORIES,
    // FETCH_STORIES_FAILURE,
    // FETCH_STORIES_REQUEST,
    // FETCH_STORIES_SUCCESS,
    // FETCH_STORY_IDS_FAILURE,
    // FETCH_STORY_IDS_REQUEST,
    // FETCH_STORY_IDS_SUCCESS,
    // SET_SEARCH_KEYWORD

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
    keyword: '',
    filteredStories: [],
    pageTop: 0,
    pageBest: 0,
    pageNew: 0,
    isFetching: false,
    error: '',
}

// export default (state = initialState, action) => {
//     switch (action.type) {
//         case FETCH_STORIES_REQUEST:
//         case FETCH_STORY_IDS_REQUEST:
//             return {
//                 ...state,
//                 isFetching: true,
//             };
//         case FETCH_STORY_IDS_SUCCESS:
//             return {
//                 ...state,
//                 storyIds: action.payload,
//             };
//         case FETCH_STORIES_SUCCESS:
//             return {
//                 ...state,
//                 stories: [...state.stories, ...action.payload.stories],
//                 page: state.page + 1,
//                 isFetching: false,
//             };
//         case FETCH_STORY_IDS_FAILURE:
//         case FETCH_STORIES_FAILURE:
//             return {
//                 ...state,
//                 stories: [],
//                 storyIds: [],
//                 isFetching: false,
//                 error: action.payload
//             }
//         case FETCH_FILTERED_STORIES:
//             return {
//                 ...state,
//                 filteredStories: state.stories.filter(story => story.title.toLowerCase().includes(action.payload.toLowerCase()))
//             }
//         case SET_SEARCH_KEYWORD:
//             return {
//                 ...state,
//                 keyword: action.payload
//             }
//         default:
//             return state;
//     }
// }


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
                // filteredStories: state.stories.filter(story => story.title.toLowerCase().includes(action.payload.toLowerCase()))
                filteredStories: []
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