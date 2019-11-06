import React from 'react'

import {connect} from 'react-redux'

import CategoryForm from './Form'
import { startEditCategory } from '../../actions/category'


class CategoriesEdit extends React.Component{
    
    handleCategorySubmit = (category) => {

        const redirect = () => this.props.history.push(`/categories`)
        this.props.dispatch(startEditCategory(category,redirect))
    }


    render(){
        return (
            <div>
                {this.props.category && (
                    <div>
                         <h2>Edit Category</h2>
                         {this.props.category.name && <CategoryForm category = {this.props.category} handleCategorySubmit = {this.handleCategorySubmit} />}
                    </div>
                )}
               
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return {
        category: state.category.find(category => category._id == id)
    }
}

export default connect(mapStateToProps)(CategoriesEdit)