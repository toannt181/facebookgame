import React from 'react';
import {connect} from 'react-redux';
import NavBar from '../../components/NavBar';
import Card from '../../components/Card';
import BodyContainer from "../BodyContainer/index";


require('../../css/cssGroup');

class App extends React.Component {
    constructor(props) {
        super(props);

        FB.api('/113124472034820', function(response) {
            console.log('Tata', response);
        });
    }

    render() {
        return (
            <div>
                <NavBar/>
                <BodyContainer/>
            </div>
        );
    }
}

export default App;
