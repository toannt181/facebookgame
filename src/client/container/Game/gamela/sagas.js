import {call, put} from 'redux-saga/effects'

function fetchAPI() {
    FB.api(
        "/" + this.props.user.ID,
        {"fields": "id,name,email,first_name,last_name,birthday"},
        response => {
            if (response && !response.error) {
                console.log(response);
            }
        }
    );
}

export function* fetchData(action) {
    try {
        const data = yield call(Api.fetchUser, action.payload.url)
        yield put({type: "FETCH_SUCCEEDED", data})
    } catch (error) {
        yield put({type: "FETCH_FAILED", error})
    }
}