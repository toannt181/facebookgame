import React from 'react';
import {connect} from 'react-redux';
import {resetResult, updateResult} from "../../../actions/action";

class Game0 extends React.Component {

    constructor(props) {
        super(props);
        this.props.dispatch(resetResult());
    }

    componentWillMount() {
        FB.api(
            "/" + this.props.user.ID,
            {"fields": "id,name,email,first_name,last_name,birthday"},
            response => {
                if (response && !response.error) {
                    console.log('t', response);
                    this.props.dispatch(updateResult(response));
                }
            }
        );
    }

    render() {
        const DISPLAY = this.props.result.response ?
            <h2>loading...</h2> :
            <div>{this.props.result.response}</div>;

        return (
            <div>
                {DISPLAY}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        user: state.UserInfo,
        result: state.ResultReturn
    })
}

export default connect(mapStateToProps)(Game0);