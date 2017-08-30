import * as Types from '../constants/actiontype';
import {FAKEDATA} from "./fakedata";

export default function ListGames(state = FAKEDATA, action) {
    switch (action.type) {
        case Types.ADD_GAME:
            return {
                listGames: [...state.listGames, ...action.game]
            };
        default:
            return state;
    }
}