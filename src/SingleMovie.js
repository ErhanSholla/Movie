import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT } from './context'
const SingleMovie = () => {
  const { id } = useParams()

  const [movie, setMovie] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({ show: false, msg: '' })

  const fetchMovies = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    if (data.Response === 'False') {
      setError({ show: true, msg: data.Error })
      setLoading(false)
    } else {
      setMovie(data)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}&i=${id}`)
  }, [id])

  if (loading) {
    return <div className='loading'></div>
  }
  if (error.show) {
    return (
      <div className='page-error'>
        <h1>{error.msg}</h1>
        <Link to='/' className='btn'>
          Back to movies
        </Link>
      </div>
    )
  }

  const { Poster: poster, Title: title, Plot: plot, Year: year } = movie
  console.log(movie)
  return (
    <section className='single-movie'>
      <img src={poster} alt={title} />
      <div className='single-movie-info'>
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>{year}</h4>
        <h4>Actors: {movie.Actors}</h4>
        <h4>
          Budget: <span>{movie.BoxOffice}</span>
        </h4>
        <h4>Director: {movie.Director}</h4>
        <h4>Genre : {movie.Genre}</h4>
        <h4>Rated : {movie.Rated}</h4>
        <h4>Imbd-Rating : {movie.imdbRating}</h4>
        <h4>Writers : {movie.Writer}</h4>
        <Link to={'/'} className='btn'>
          back to movies
        </Link>
      </div>
    </section>
  )
}

export default SingleMovie
