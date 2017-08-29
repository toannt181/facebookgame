import React from 'react';
import {connect} from 'react-redux';

class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <button className="btn btn-danger">EDIT</button>
            </nav>
        );
    }
}

function mapToProps(state) {
    return {};
}

export default connect(mapToProps)(NavBar);