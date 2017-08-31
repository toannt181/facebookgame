import React from 'react';
import {connect} from 'react-redux';
import ResultGameContainer from '../ResultGameContainer/index';
import {setUserInfo} from "../../actions/action";

class GameContainer extends React.Component {
    constructor(props) {
        super(props);

        this.click = this.click.bind(this);
        this.passLogin = this.passLogin.bind(this);


        this.state = {passLogin: false};
        this.numberGame = parseInt(this.props.match.params.number);
        this.game = this.props.listGames.filter(e => e.id === this.numberGame)[0] || {};
    }

    click() {
        FB.getLoginStatus(response => {
            if (response.status === 'connected') {
                this.passLogin(response);
            } else {
                FB.login(response => {
                        if (response.authResponse) {
                            this.passLogin(response);
                        } else {
                            console.log('User cancelled login or did not fully authorize.');
                        }
                    },
                    {scope: 'public_profile, email, user_friends, user_birthday, user_photos, user_likes'}
                );
            }
        });
    }

    passLogin(response) {
        const {dispatch} = this.props;
        console.log('RESPONSE', response);
        dispatch(setUserInfo({
            accessToken: response.authResponse.accessToken,
            ID: response.authResponse.userID
        }));
        this.setState({passLogin: true});
    }

    render() {
        const display = !this.state.passLogin ?
            <div>
                <button className="fb-button" onClick={this.click.bind(this)}>Tiếp tuc với facebook</button>
                <img className="image-game" src={this.game.image} alt=""/>
                <h2>{this.game.title}</h2>
            </div> :
            <div>
                <ResultGameContainer numberGame={this.numberGame} />
            </div>;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 board-game">
                        {display}
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
        listGames: state.ListGames,
        user: state.UserInfo,
    });
}

export default connect(mapStateToProps)(GameContainer);
