import React from 'react'

import {Link} from 'react-router-dom'


import {connect} from 'react-redux'

import {Row, Col,Container} from 'reactstrap'
import {Card, CardTitle, CardText,Button} from 'reactstrap'
import swal from 'sweetalert'

import {startRemoveNote} from '../../actions/note'

class NotesList extends React.Component {

        handleRemove = (id) =>{
            swal({
                title: "Are you sure you want to Delete?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  swal("Successfully Deleted", {
                    icon: "success",
                  });
                  this.props.dispatch(startRemoveNote(id))
                } 
              })
        }

        findCategory = (id) => {
            return this.props.category.find(category=>category._id == id)
        }

    render(){
        return (
            <div>
               <h1 className="mb-5"> Notes - {this.props.notes.length}</h1>
               <Row>
                        {this.props.notes.map(note=>{
                            return (
                                <Col md="3" key={note._id}>
                                    <Card body inverse color="warning" className="mb-5">
                                         <CardTitle><h4>{note.title}</h4></CardTitle>
                                         <CardText>Description: {note.description}</CardText>
                                         <CardText><Link className="text-white" to={`/categories/${note.categoryId._id? note.categoryId._id : this.findCategory(note.categoryId)._id}`}>Category: {note.categoryId.name? note.categoryId.name : this.findCategory(note.categoryId).name}</Link></CardText>
                                         <Container className="mt-3">
                                             <Row>
                                                 <Col md="6">
                                                     <Link to={`/notes/edit/${note._id}`}><Button color="info">edit</Button></Link>
                                                 </Col>
                                                 <Col md="6">
                                                     <Button color="danger" onClick={()=>{this.handleRemove(note._id)}}>remove</Button>
                                                 </Col>
                                             </Row>
                                         </Container>
                                    </Card>
                                 </Col>
                            )})}

                </Row>
                <br/>
                <Link to="/notes/new"><Button color="secondary">Add Note</Button></Link>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        notes: state.note,
        category: state.category
    }
}

export default connect(mapStateToProps)(NotesList)