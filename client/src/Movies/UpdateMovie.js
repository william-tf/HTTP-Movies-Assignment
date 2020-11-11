import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'


const initialState = {
    id:'',
    title:'',
    director:'',
    metascore:'',
    stars:[]
}


const UpdateMovie = (props) => {
    const [updateMovie, setMovie] = useState(initialState)
    const {id} = useParams()
    const {push} = useHistory()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setMovie(res.data)
        })
        .catch(err =>{
            console.log('inside catch', err)

        })
    }, [])

    const changes = e => {
        let value = e.target.value;
        let name = e.target.name
        setMovie({
            ...updateMovie,
            [name]:value
        })
    }


    
    const submit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, updateMovie)
        .then((res) => {
            console.log('this is in put:', res, typeof id)
            props.setMovieList(
                props.movieList.map((movie) => {
                    if(movie.id == Number(id)){
                        return res.data
                    }else{
                        return movie
                    }
                })
                )
                
                push('/')
                
            })
            .catch(err => {
                console.log("inside submit catch:", err)
            })
        }
        


    return(
        <div>
            <h3>Update your movie</h3>
            <form onSubmit={submit}>
                <input
                type="text"
                name="title"
                value={updateMovie.title}
                placeholder="Update title"
                onChange={changes}
                />
                <input
                type="text"
                name="director"
                value={updateMovie.director}
                onChange={changes}
                placeholder="Update director"
                />
                <input
                type="number"
                name="metascore"
                value={updateMovie.metascore}
                onChange={changes}
                placeholder="Update metascore"
                />
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie