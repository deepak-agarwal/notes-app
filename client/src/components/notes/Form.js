import React from 'react'

import {connect} from 'react-redux'

import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

class NotesForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: props.note? props.note.title:  '',
            description: props.note? props.note.description:  '',
            categoryId: props.note? props.note.categoryId: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title: this.state.title,
            description: this.state.description,
            categoryId: this.state.categoryId
        }
        this.props.note && (formData.id = this.props.note._id)
        this.props.handleNoteSubmit(formData)
    }

    render(){
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" value={this.state.title} onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" name="description" id="description" value={this.state.description} onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="category">Category</Label>
                        <Input type="select" id="category" value={this.state.categoryId} onChange={this.handleChange} name="categoryId">
                        <option value="">select</option>
                        {this.props.categories.map(category=>{
                             return < option key={category._id} value={category._id}>{category.name}</option>
                        })}
                        </Input>
                    </FormGroup>

                    <Button type="submit" value="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.category
    }
}

export default connect(mapStateToProps)(NotesForm)