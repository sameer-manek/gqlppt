import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const logoStyle = {
    display: 'block',
    margin: '0 auto'
};

const formStyle = {
    display: 'block',
    margin: '0 auto',
    textAlign: 'center'
}

const formFieldStyle = {
    display: 'block',
    margin: '0px auto',
    fontSize: '20px',
    padding: '5px 10px'
}

const button = {
    display: 'block',
    margin: '10px auto',
    fontSize: '20px',
    padding: '5px 10px',
    color: 'white',
    backgroundColor: '#d4af37',
    border: '0'
}

const error = {
    color: '#f00'
}

class Home extends Component {
    constructor (props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            error: '',
            loggedIn: false
        }

        this.updateUnameField = this.updateUnameField.bind(this);
        this.updatePasswdField = this.updatePasswdField.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    updateUnameField (event) {
        this.setState ({
            username: event.target.value,
            error: ''
        });
    }

    updatePasswdField (event) {
        this.setState({
            password: event.target.value,
            error: ''
        });
    }

    async handleLogin (event) {
        let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (this.state.username.match(emailPattern) &&
            this.state.password.length >= 6) {
                let query = `query {
                  login (email: "${this.state.username}", password: "${this.state.password}") {
                    name
                  }
                }`;

                axios({
                    url: 'http://localhost:4000/api',
                    method: 'POST',
                    data: {
                        query
                    }
                }).then(data => {
                    if (data.data.data.login.name) {
                        this.setState({
                            loggedIn: true
                        })
                    } else {
                        this.setState({
                            error: 'Please enter Satvik details'
                        })
                    }
                })
        } else {
            this.setState({
                error: 'You entered tamsik values!'
            });
        }
    }

    render () {
        if (this.state.loggedIn) {
            return (<Redirect to="/user" />)
        }
        return (
            <div>
                <img src="static/logo.jpg" height="500px" style={logoStyle} />

                <form style={formStyle}>
                    <input style={formFieldStyle} type="email" placeholder="Email.." value={this.state.username} onChange={this.updateUnameField} /> <br />
                    <input style={formFieldStyle} type="password" placeholder="password.." value={this.state.password} onChange={this.updatePasswdField} /> <br />
                    <span style={error}>{this.state.error}</span>
                    <button style={formFieldStyle} style={button} type="button" onClick={this.handleLogin}>Login</button>
                </form>
            </div>
        )
    }
}

export default Home;