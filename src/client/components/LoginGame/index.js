import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-white">
                <Link to="/">
                    <img src="http://vi.hellotests.com/public/images/choiface.png" alt=""/>
                </Link>
            </nav>
        );
    }
}

function mapToProps(state) {
    return {};
}

export default connect(mapToProps)(NavBar);