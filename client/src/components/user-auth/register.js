import React, { Component } from 'react'

import axios from '../../config/axios';


export class Login extends Component {
    constructor(){
        super()
        this.state = {
            username:'',
            email:'',
            password:'',
            hobbies:'',
            skills:''
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
        axios.post('/register',formData)
        .then(response =>{
            console.log(response.data)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <form>
                    <label>Username<input type='text' value={this.state.username} name='username' onChange={this.handleChange}/></label><br/>
                    <label>Email<input type='email' value={this.state.email} name='email' onChange={this.handleChange}/></label><br/>
                    <label>Password<input type='password' value={this.state.password} name='password' onChange={this.handleChange}/></label><br/>
                    <label>Hobbies<input type='text' value={this.state.hobbies} name='hobbies' onChange={this.handleChange}/></label><br/>
                    <label>Skills<input type='text' value={this.state.skills} name='skills' onChange={this.handleChange}/></label><br/>
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Login
