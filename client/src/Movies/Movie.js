import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory()
  const {id} = useParams()


  const deleteMovie = () =>{
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      props.setMovieList(
        props.movieList.filter((movie) => {
            return movie.id !== id
            
        }))
    })
    .catch(err => console.log(err))
    push('/')
    }

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };




  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={() => push(`/update-movie/${movie.id}`)} >Edit</button>
      <button onClick={deleteMovie} >Delete</button>
    </div>
  );
}

export default Movie;
