import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './home';
import Signup from './signup';
import User from './user';

class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            loggedIn: true
        }
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser () {
        this.setState({
            loggedIn: true
        });
    }

    render () {
        var loggedIn = this.state.loggedIn
        return (
            <div>
                <Route exact path="/" render={props => <Home {...props} isLoggedIn={loggedIn} loginUser={this.loginUser} />} />
                <Route exact path="/signup" render={props => <Signup {...props} isLoggedIn={loggedIn} />} />
                <Route exact path="/user" render={props => <User {...props} isLoggedIn={loggedIn} /> } />
            </div>
        )
    }
}

export default App;