import React from 'react';
import ListCard from '../ListCard/';
import {Route, Switch, Redirect} from 'react-router-dom';
import GameContainer from "../GameContainer/index";


class BodyContainer extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={ListCard}/>
                <Switch>
                    <Redirect exact from='/game' to='/'/>
                    <Route path="/game/:number"
                           render={props =>
                               <GameContainer {...props}/>
                           }/>
                </Switch>
            </Switch>
        );
    }
}

export default BodyContainer;
