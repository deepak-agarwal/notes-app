import React from 'react'

import NotesForm from './Form'

import {connect} from 'react-redux'
import { startAddNote } from '../../actions/note'


class NoteNew extends React.Component {  
    
    handleNoteSubmit = (note) => {
        
        const redirect = () => this.props.history.push('/notes')
        this.props.dispatch(startAddNote(note,redirect))
    }
    render(){
        return (
            <div>
                <h2>Add Note</h2>
                <NotesForm handleNoteSubmit={this.handleNoteSubmit}/>
            </div>
        )
    }
}

export default connect()(NoteNew)