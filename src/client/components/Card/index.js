import React from 'react';
import {Link} from 'react-router-dom';

class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick(i) {
        console.log(i);
    }

    render() {
        return (
            <Link to={'/game/' + this.props.id}>
                <div className="card">
                    <img src={this.props.image}/>
                    <p>{this.props.title}</p>
                </div>
            </Link>
        );
    }
}

export default Card;