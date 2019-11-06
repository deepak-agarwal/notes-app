import React from 'react'

import {connect} from 'react-redux'

import NotesForm from './Form'
import { startEditNote } from '../../actions/note'


class NoteEdit extends React.Component{
    
    handleNoteSubmit = (note) => {

        const redirect = () => this.props.history.push('/notes')
        this.props.dispatch(startEditNote(note,redirect))
    }


    render(){
        return (
            <div>
                {this.props.note && (
                    <div>
                         <h2>Edit Note</h2>
                         {this.props.note.title && <NotesForm note = {this.props.note} handleNoteSubmit = {this.handleNoteSubmit} />}
                    </div>
                )}
               
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return {
        note: state.note.find(note => note._id == id)
    }
}

export default connect(mapStateToProps)(NoteEdit)