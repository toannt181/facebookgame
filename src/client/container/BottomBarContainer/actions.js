import {
    FETCH_META,
    FETCH_META_SUCCESS,
    FETCH_META_FAILURE,
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_FAILURE,
    UPLOAD_IMAGE_SUCCESS
} from './constants';

export function getMetaLink(link,content){
    return {
        type : FETCH_META,
        link,content
    };
}
export function fetchMetadataFailure(message){
    return {
        type : FETCH_META_FAILURE,
        message
    };
}
export function fetchMetadataSuccess() {
    return {
        type: FETCH_META_SUCCESS,
    };
}

export function uploadImage(form){
    return {
        type : UPLOAD_IMAGE,
        form,
    };
}
export function uploadImageFailure(message){
    return {
        type : UPLOAD_IMAGE_FAILURE,
        message

    };
}
export function uploadImageSuccess(message){
    return {
        type : UPLOAD_IMAGE_SUCCESS,
        message
    };
}