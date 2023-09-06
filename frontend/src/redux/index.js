import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
};

const configureStore = preloadedState => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;