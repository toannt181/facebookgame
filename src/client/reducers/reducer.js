import {combineReducers} from 'redux';

import customer from './topic';
import topic from './topic';

let reducer = combineReducers({
    customer,
    topic,
});

export default reducer;