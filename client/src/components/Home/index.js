import React from 'react'
import image from './image.png'

function Home(props){
        return (
            <div className="col-xs-1 text-center mt-5">
                <h2 className="mb-5">Welcome To The Notes App</h2>
                <img className = "ml-4" src={image} alt="Images of notes"/>
            </div>
        )
}
    
export default Home