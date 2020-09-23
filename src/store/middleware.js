import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';


const isProd = process.env.NODE_ENV === 'production';

const middlwareList = [];

middlwareList.push(thunk);

if (!isProd) {
    middlwareList.push(createLogger());
}

const middleware = compose(applyMiddleware(...middlwareList));

export default middleware;