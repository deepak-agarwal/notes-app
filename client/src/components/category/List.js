import React, { Component } from 'react'
import axios from '../../config/axios';

export class List extends Component {
    constructor(){
        super()
        this.state={
            categories:[]
        }
    }
    handleClick=(id)=>{
        console.log(id)
    }
    componentDidMount(){
        axios.get('/categories')
        .then(response=>{
            const categories = response.data
            this.setState({categories})
        })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.categories.map(category=> <ListItem key={category._id}  {...category}  handleClick = {this.handleClick} />)}
                </ul>
            </div>
        )
    }
}


function ListItem(props) {
    return (
        <li>{props.name}<button onClick={
            props.handleClick(props._id)
        }>remove</button></li>
    )
}



export default List
