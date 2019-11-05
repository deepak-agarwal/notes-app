import React, { Component } from 'react'
import axios from '../../config/axios';


export class Login extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            password:''
        }
    }

    handleChange = (e) => {
        const {name,value} = e.target
        this.setState({
            [name]:value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {...this.state}
        axios.post('/login',formData)
        .then(response =>{
            console.log(response.data)
            localStorage.setItem('token',response.data.tokens[response.data.tokens.length - 1].token)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <form>
                    <label>E-mail<input type='email' value={this.state.email} name='email' onChange={this.handleChange}/></label><br/>
                    <label>Password<input type='password' value={this.state.password} name='password' onChange={this.handleChange}/></label><br />
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Login
