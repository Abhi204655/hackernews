import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';

const JSON_DATA = '.json?print=preety';

const PAGE_LIMIT = 10;
const getPageSlice = (limit, page = 0) => ({ begin: page * limit, end: (page + 1) * limit });
const getPageValues = ({ begin, end, items }) => items.slice(begin, end);

export const getStoryIds = (endpoint = "topstories") => {
    let res = axios.get(`${BASE_URL}/${endpoint}${JSON_DATA}`).then(({ data }) => data)
    return res;
}

export const getStory = (id) => {
    const res = axios.get(`${BASE_URL}/item/${id}${JSON_DATA}`).then(({ data }) => data);
    return res;
}

export const getStoriesByPage = (ids, page, endpoint) => {
    const { begin, end } = getPageSlice(PAGE_LIMIT, page);
    const activeIds = getPageValues({ begin, end, items: ids });
    const storyPromises = activeIds.map(id => getStory(id));
    return Promise.all(storyPromises);
};
