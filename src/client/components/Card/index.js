import React from 'react';
import {connect} from 'react-redux';

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {

    }

    render() {
        return (
           <div className="card" onClick={this.onClick()}>
               <img src="https://assets.servedby-buysellads.com/p/manage/asset/id/28536"/>
               <p>Xem nguoi yeu cua ban ten la gi</p>
           </div>
        );
    }
}

function mapToProps(state) {
    return {};
}

export default connect(mapToProps)(Card);