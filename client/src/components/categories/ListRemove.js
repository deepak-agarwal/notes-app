import React from 'react'
import {ListGroupItem} from 'reactstrap'
import {Button} from 'reactstrap'
import swal from 'sweetalert'

function ListRemove(props){
    return (
        <ListGroupItem >{props.name}<Button color = "danger" className = "float-right" onClick= {()=>{
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
                  props.handleRemove(props.id)
                } 
              })
        }} >remove</Button></ListGroupItem>
    )
}

export default ListRemove