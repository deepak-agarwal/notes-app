import axios from "../config/axios"

import swal from 'sweetalert'

export const setNote = (notes) => {
    return {
        type: 'SET_NOTE',
        payload: notes
    }
}

export const startSetNote = () => {
    return (dispatch) => {
        axios.get('/api/notes',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                const notes = response.data
                dispatch(setNote(notes))
            })
            .catch(err=>{
                console.log(err)
            })
    }
}

export const addNote = (note) => {
    return {
        type: 'ADD_NOTE',
        payload: note
    }
}

export const startAddNote = (note,redirect) => {
    return (dispatch) => {
        axios.post('/api/notes',note,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.errors){
                swal(`${response.data.message}`,"","error")
            } else {
                const note = response.data
                redirect()
                dispatch(addNote(note))
            }
        })
        
    }
}

export const removeNote = (note) => {
    return {
        type: 'REMOVE_NOTE',
        payload: note
    }
}

export const startRemoveNote = (id) => {
    return (dispatch) => {
        axios.delete(`/api/notes/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                const note = response.data
                dispatch(removeNote(note))
            })

            .catch(err=>{
                console.log(err)
            })
    }
}

export const editNote = (note) => {
    return {
            type: 'EDIT_NOTE',
            payload: note
    }
}

export const startEditNote = (note,redirect) => {
    return (dispatch) => {
        axios.put(`/api/notes/${note.id}`,note, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                if (response.data.errors) {
                    swal(`${response.data.message}`,"","error")
                } else {
                    const note = response.data
                    redirect()
                    dispatch(editNote(note))
                }
            })
    }
}

export const updateNoteCategory = (category) => {
    return {
        type: 'UPDATE_NOTE_CATEGORY',
        payload: category
    }
}