import * as Types from '../constants/actiontype';

export default function ResultReturn(state = {}, action) {
    switch (action.type) {
        case Types.RESET_RESULT:
            return {};
        case Types.UPDATE_RESULT:
            return {response: action.response};
        default:
            return state;
    }
}