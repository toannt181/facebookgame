import * as Types from '../constants/actiontype';

export function setUserInfo({accessToken, ID}) {
    return {
        type: Types.ADD_USER_INFO,
        accessToken,
        ID
    };
}

export function resetResult() {
    return {
        type: Types.RESET_RESULT,
    };
}

export function updateResult(response) {
    return {
        type: Types.UPDATE_RESULT,
        response
    };
}