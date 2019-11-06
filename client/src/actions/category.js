import axios from "../config/axios"

import swal from 'sweetalert'
import { updateNoteCategory } from "./note"

export const setCategory = (categories) => {
    return {
        type: 'SET_CATEGORY',
        payload: categories
    }
}

export const startSetCategory = () => {
    return (dispatch) => {
        axios.get('/api/categories')
            .then(response=>{
                const categories = response.data
                dispatch(setCategory(categories))
            })
            .catch(err=>{
                console.log(err)
            })
    }
}

export const addCategory = (category) => {
    return {
        type: 'ADD_CATEGORY',
        payload: category
    }
}

export const startAddCategory = (category) => {
    return (dispatch) => {
        axios.post('/api/categories',category)
        .then(response=>{
            if(response.data.errors){
                swal(`${response.data.message}`,"","error")
            } else {
                const category = response.data
                dispatch(addCategory(category))
            }
        })
        
    }
}

export const removeCategory = (category) => {
    return {
        type: 'REMOVE_CATEGORY',
        payload: category
    }
}

export const startRemoveCategory = (id) => {
    return (dispatch) => {
        axios.delete(`/api/categories/${id}`)
            .then(response=>{
                const category = response.data
                dispatch(removeCategory(category))
            })

            .catch(err=>{
                console.log(err)
            })
    }
}

export const editCategory = (category) => {
    return {
            type: 'EDIT_CATEGORY',
            payload: category
    }
}

export const startEditCategory = (category,redirect) => {
    return (dispatch) => {
        axios.put(`/api/categories/${category.id}`,category)
            .then(response=>{
                if (response.data.errors) {
                    swal(`${response.data.message}`,"","error")
                } else {
                    const category = response.data
                    redirect()
                    dispatch(editCategory(category))
                    dispatch(updateNoteCategory(category))
                }
            })
    }
}