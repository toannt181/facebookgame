import {combineReducers} from 'redux';

import ListGames from './listgames';
import UserInfo from './userinfo';
import ResultReturn from './resultreturn';


let reducer = combineReducers({
    ListGames,
    UserInfo,
    ResultReturn
});

export default reducer;