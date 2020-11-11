import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
const initialState = {
    id:'',
    title:'',
    director:'',
    metascore:'',
    stars:[]
}

const AddMovie = (props) => {
    const [addMovie, setAddMovie] = useState(initialState)
    const {push} = useHistory()
    const changes = e => {
        const name = e.target.name
        const value = e.target.value
        setAddMovie({
            ...addMovie,
            [name]:value
        })
    }

    const submit = e => {
        e.preventDefault()
        axios.post(`http://localhost:5000/api/movies`, addMovie)
        .then(res => props.setMovieList(res.data))
        .catch(err => console.log(err))
        push('/')
    }
    
    return(
        
        <form onSubmit={submit}>
            <input
            type="text"
            name="title"
            placeholder="Add a title"
            onChange={changes}
            value={addMovie.title}
            />
            <input
            type="text"
            name="director"
            placeholder="add a director"
            onChange={changes}
            value={addMovie.director}
            />
            <input
            type="text"
            name="metascore"
            placeholder="Add a metascore"
            value={addMovie.metascore}
            onChange={changes}
            />
            <button>Add!!</button>
        </form>
    )
}


export default AddMovie