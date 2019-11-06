import React from 'react'

import {Row, Col} from 'reactstrap'
import {Card, CardTitle, CardText} from 'reactstrap'

import {connect} from 'react-redux'
import axios from '../../config/axios'


class CategoryShow extends React.Component {
    constructor(props){
        super(props)
            this.state = {
                notes: []
            }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/api/categories/${id}`)
            .then(response=>{
                const category = response.data
                axios.get('/api/notes',{
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
                .then(response=>{
                    const AllNotes = response.data
                    const notes = AllNotes.filter(note=>note.categoryId._id == category._id)
                    this.setState({notes})
                })
            })
            .catch(err=>{
                console.log(err)
            })
    }

    render(){
        return (
            <div>
                {this.props.category && (
                    <div>
                        <h1 className="mb-5">{this.props.category.name}</h1>
                        <Row>
                        {this.state.notes.map(note=>{
                            return (
                                <Col md="3" key={note._id}>
                                    <Card body inverse color="warning" className="mb-5">
                                         <CardTitle><h4>{note.title}</h4></CardTitle>
                                         <CardText>Description: {note.description}</CardText>
                                    </Card>
                                 </Col>
                            )})}

                </Row>
                    </div>
                )}
                
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    const id =  props.match.params.id
    return {
        category: state.category.find(category=>category._id == id)
    }
}

export default connect(mapStateToProps)(CategoryShow)