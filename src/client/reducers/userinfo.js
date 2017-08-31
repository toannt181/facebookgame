import * as Types from '../constants/actiontype';

export default function UserInfo(state = {}, action) {
    switch (action.type) {
        case Types.ADD_USER_INFO:
            return ({
                accessToken: action.accessToken, ID: action.ID
            });
        default:
            return state;
    }
}