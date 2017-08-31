import React from 'react';
import {Game0} from "../game/index";
import PageNotFound from "../../components/PageNotFound/index";

class ResultGameContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let GAME;
        switch (this.props.numberGame) {
            case 0:
                GAME = <Game0/>;
                break;
            default:
                GAME = <PageNotFound/>
        }

        return (
            <div>
                {GAME}
            </div>
        );
    }
}


export default ResultGameContainer;
