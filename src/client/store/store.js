import reducer from '../reducers/reducer';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

// import rootSaga from '../sagas';

// const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

);

// sagaMiddleware.run(rootSaga);

export default store;