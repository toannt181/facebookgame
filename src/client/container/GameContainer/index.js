import React from 'react';
import {connect} from 'react-redux';

class GameContainer extends React.Component {
    constructor(props) {
        super(props);
        this.numberGame = parseInt(this.props.match.params.number);
        this.game = this.props.listGames.filter(e => e.id === this.numberGame)[0] || {};
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 board-game">
                        <img className="image-game" src={this.game.image} alt=""/>
                        <h2>{this.game.title}</h2>
                    </div>
                    <div className="col-md-3">
                        sidebar here
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        listGames: state.ListGames
    });
}

export default connect(mapStateToProps)(GameContainer);
