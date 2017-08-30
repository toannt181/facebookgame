import React from 'react';
import Card from '../../components/Card';
import {connect} from 'react-redux';

class ListCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="list-card">
                {this.props.listGames.map((e, i) =>
                    <Card key={i} {...e}/>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        listGames: state.ListGames
    });
}

export default connect(mapStateToProps)(ListCard);
