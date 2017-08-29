import React from 'react';
import {connect} from 'react-redux';
import Chatbox from '../../components/Chatbox';
import Scroll from '../../components/Scroll';
import BottomBarContainer from '../BottomBarContainer';
import {getMetaLink} from "../BottomBarContainer/actions";

class ChatboxContainer extends React.Component {

    render() {
        return (
            <Chatbox {...this.props}>
                <Scroll/>
                <BottomBarContainer/>
            </Chatbox>
        );
    }
}

function mapToProps(state) {
    return {
        customer: state.customer,
        room: state.room,
        socket: state.socket,
        topic: state.topic,
    };
}



export default connect(mapToProps)(ChatboxContainer);
