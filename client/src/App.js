import React from 'react'
import {BrowserRouter, Link, Route,Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'

import {Navbar,NavbarBrand,Nav,NavItem} from 'reactstrap'
import swal from 'sweetalert'

import CategoriesList from './components/categories/List'
import CategoriesEdit from './components/categories/Edit'
import CategoryShow from './components/categories/Show'

import NotesList from './components/notes/List'
import NoteNew from './components/notes/New'
import NoteEdit from './components/notes/Edit'

import Login from './components/user/Login'
import Register from './components/user/Register'
import Home from './components/Home/index'

import {startRemoveUser} from './actions/user'


function App(props) {
  return (
    <BrowserRouter>
    <div>
      <Navbar color="dark" light expand="md" className="mb-5">
      <NavbarBrand className="text-light">Notes App</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link className="nav-link text-light" to="/">Home</Link>
        </NavItem>
        {Object.keys(props.user).length !== 0 &&
        <React.Fragment>
        <NavItem>
          <Link className="nav-link text-light" to="/notes">Notes</Link>
        </NavItem>
        </React.Fragment>
        }
        <NavItem>
            <Link className="nav-link text-light" to="/categories">Categories</Link>
        </NavItem>
        {Object.keys(props.user).length == 0 ? (
            <React.Fragment>
            <NavItem>
              <Link className="nav-link text-light" to="/users/login">Login</Link>
            </NavItem>
          <NavItem>
            <Link className="nav-link text-light" to="/users/register">Register</Link>
          </NavItem>
          </React.Fragment>
        ):(
          <NavItem>
          <Link className="nav-link text-light" to="/" onClick={()=>{
            swal({
              title: "Are you sure you want to log out?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
                swal("Successfully Logged out", {
                  icon: "success",
                });
                props.dispatch(startRemoveUser())
              } 
            })
            }}>Logout</Link>
          </NavItem>
        )}
        
      </Nav>
    </Navbar>
      
      <div className= 'container'>
      <Switch>
      <Route path="/users/login" component={Login} exact={true}/>
      <Route path="/users/register" component={Register} exact={true}/>
      <Route path="/categories" component={CategoriesList} exact={true}/>
      <Route path="/categories/edit/:id" component={CategoriesEdit} exact={true}/>
      <Route path="/categories/:id" component={CategoryShow} exact={true}/>
      <Route path="/notes" component={NotesList} exact={true}/>
      <Route path="/notes/new" component={NoteNew} exact={true}/>
      <Route path="/notes/edit/:id" component={NoteEdit} exact={true}/>
      <Route Path="/" component={Home} exact={true}/>
      </Switch>
      </div>

    </div>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)
