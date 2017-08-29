import * as Types from '../constants/ActionTypes';


export function setCustomerInfo(customerId, name, email, phone,) {
    return {
        type: Types.SET_CUSTOMER_INFO,
        info: {name, email, phone, customerId}
    };
}


export function hideForm(formStatus) {
    return {
        type: Types.HIDE_FORM,
        hideForm: formStatus
    };
}

//tuanoc
export function f5(status) {
    return {
        type: Types.F5,
        isF5: status
    };
}

export function closeChat() {
    return {
        type: CLOSE_CHAT
    };
}

export function addMessage({typeSender, sender, message, time}) {
    return {
        type: Types.ADD_MESSAGE,
        message: {typeSender, sender, message, time}
    };
}

export function updateMessageMetadata(content, title, description, image) {
    return {
        type: Types.UPDATE_MESSAGE_METADATA,
        metadata: {content, title, description, image}
    };
}

export function addTopic(topics) {
    return {
        type: Types.ADD_TOPIC,
        topics
    };
}

export function setRegisterForm(registers) {
    return {
        type: Types.SET_INPUT_REGISTER,
        registers
    };
}

export function selectTopic(topicId) {
    return {
        type: Types.SELECTED_TOPIC,
        selected: topicId
    };
}

export function setRoom(id) {
    return {
        type: Types.SET_ROOM,
        roomId: id
    };
}


export function setAdmin(name) {
    return {
        type: Types.SET_ADMIN,
        assignee: name
    };
}

export function sendRating({ratingValue, feedback = ''}) {
    return {
        type: Types.SEND_RATING,
        rating: {
            ratingValue,
            feedback
        }
    };
}


export function setRoomInfo({id, topic_id, status, assignee, created_at}) {

    return {
        type: Types.SET_ROOM_INFO,
        room: {id, topic_id, status, assignee, created_at: created_at.date}
    };
}

export function setMessages(messages) {
    return {
        type: Types.SET_MESSAGES,
        messages
    };
}

export function setImage(image) {
    return {
        type: Types.SET_IMAGE,
        image
    };
}

export function destroyStore() {
    return {
        type: Types.DESTROY_STORE,
    };
}
