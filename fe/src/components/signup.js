import React, {Component} from 'react'
import axios from 'axios'
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

class Signup extends Component {
    constructor (props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            error: '',
            notApproved: true,
            loggedIn: false
        };

        this.handleNameUpdate = this.handleNameUpdate.bind(this);
        this.handlePasswdUpdate = this.handlePasswdUpdate.bind(this);
        this.handleEmailUpdate = this.handleEmailUpdate.bind(this);
        this.toggleApproved = this.toggleApproved.bind(this);
        this.handleSignupEvent = this.handleSignupEvent.bind(this);
    }

    handleNameUpdate (event) {
        this.setState({
            name: event.target.value,
            error: ''
        });
    }

    handlePasswdUpdate (event) {
        this.setState({
            password: event.target.value,
            error: ''
        });
    }

    handleEmailUpdate (event) {
        this.setState({
            email: event.target.value,
            error: ''
        });
    }

    toggleApproved (event) {
        this.setState(prevState => {
            return {
                notApproved: !prevState.notApproved
            }
        })
    }

    handleSignupEvent (event) {
        alert('i was clicked');
        let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.email.match(emailPattern) &&
            this.state.password.length >= 6 &&
            this.state.name.length >= 4) {
                let query = `mutation {
                  addUser (email: "${this.state.email}", password: "${this.state.password}", name: "${this.state.name}") {
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
                    if (data.data.data.addUser.name) {
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
                error: 'make sure your details are saatvik'
            })
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
                    <input style={formFieldStyle} type="email" placeholder="Email.." value={this.state.email} onChange={this.handleEmailUpdate} /> <br />
                    <input style={formFieldStyle} type="text" placeholder="Name.." value={this.state.name} onChange={this.handleNameUpdate} /> <br />
                    <input style={formFieldStyle} type="password" placeholder="password.." value={this.state.password} onChange={this.handlePasswdUpdate} /> <br />
                    <input type="checkbox" onChange={this.toggleApproved} value={!this.state.notApproved} id="approved" /> <label htmlFor="approved" style={{color: '#FFF'}}>Balidaan dena hoga</label> <br />
                    <span style={error}>{this.state.error}</span>
                    <button style={button} type="button" onClick={this.handleSignupEvent}>Sign up</button>
                </form>
            </div>
        )
    }
}

export default Signup;