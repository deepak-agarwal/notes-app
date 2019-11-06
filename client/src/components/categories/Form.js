import React from 'react'

import { Button, Form, FormGroup, Label } from 'reactstrap'


class CategoryForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name : props.category? props.category.name: ''
        }
    }

    handleName = (e) => {
        const name = e.target.value
        this.setState({name})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name
        }
        this.props.category && (formData.id = this.props.category._id)
        this.props.handleCategorySubmit(formData)
        this.setState({name:''})
    }

    render(){
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="name"></Label>
                        <input type="text" value={this.state.name} id="name" onChange={this.handleName}/>
                    </FormGroup>
                    <Button type="submit" value="add">Add</Button>
                </Form>
            </div>
        )
    }


}

export default CategoryForm