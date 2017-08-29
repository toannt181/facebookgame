import React from 'react';
import {connect} from 'react-redux';
import BottomBar from '../../components/BottomBar';
import {addMessage, setImage} from '../../actions/action';
import {getMetaLink, uploadImage} from './actions';


class BottomBarContainer extends React.Component {

    render() {
        return (
            <BottomBar {...this.props}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        customer: state.customer,
        room: state.room,
        socket : state.socket,
        image : state.image,
    };
}
function mapDispatchToProps(dispatch) {
    return{
        dispatch,
        sendMessage : ({name,content}) => {
            let date = new Date().getHours() + ':' + new Date().getMinutes();
            dispatch(addMessage({typeSender: 'self', sender: name, message:{content}, time:date}));
        },
        uploadImage : ({formData}) => {
            dispatch(uploadImage(formData));
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(BottomBarContainer);