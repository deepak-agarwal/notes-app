import React from 'react'

import {ListGroup, ListGroupItem,Button} from 'reactstrap'

import CategoryForm from './Form'

import {connect} from 'react-redux'
import swal from 'sweetalert'

import {Link} from 'react-router-dom'
import { startAddCategory, startRemoveCategory } from '../../actions/category'

class CategoriesList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            categories: []
        }
    }

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
                  this.props.dispatch(startRemoveCategory(id))
                } 
              })
        }

    handleCategorySubmit = (category) => {
        this.props.dispatch(startAddCategory(category))
    }


    render(){
        return (
            <div>
            <h1 className="mb-5"> Categories - {this.props.categories.length}</h1>
            <ListGroup>
                {this.props.categories.map(category=>{
                     return <ListGroupItem key={category._id}>{Object.keys(this.props.user).length != 0 ? <Link to={`/categories/${category._id}`}>{category.name}</Link> : category.name }<Button className="float-right" color="danger" onClick={()=>{
                        this.handleRemove(category._id)
                    }}>remove</Button>
                 <Link to = {`/categories/edit/${category._id}`}><Button className="float-right mr-5" color="info">Edit</Button></Link>
                 </ListGroupItem> 
                 
                })}
            </ListGroup>
            
            <br/>
            <h3>Add Category</h3>
            <CategoryForm handleCategorySubmit={this.handleCategorySubmit}/>

            </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.category,
        user: state.user
    }
}

export default connect(mapStateToProps)(CategoriesList)