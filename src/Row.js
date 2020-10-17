import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import axios from './axios'
import './Row.css'
import movieTrailer from "movie-trailer"

const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl,isLargeRow }) {
    const [movies, setMovies] = useState([])
    const [trailerUrl,setTrailerUrl]=useState("")

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            console.log(request);
            setMovies(request.data.results)
            return request
        }
        fetchData();
    }, [fetchUrl])
    const handleClick=(movie)=>{
        if(trailerUrl){
            setTrailerUrl('');
        }else{
            movieTrailer(movie.name||"")
            .then((url)=>{
                const urlParams=new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get("v"));
            }).catch((error)=>console.log(error))
        }

    }

    const opts={
        height:"390",
        width:"100%",
        playerVars:{
            autoplay:1,
        }
    }

    return (
        <div className="row">
            <h1>{title}</h1>
            <div className="row__posters">
                {movies.map(movie => (
                    <img src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`} className={`row__poster ${isLargeRow && "row__posterLarge"}`} alt={movie.name} key={movie.id} onClick={()=>handleClick(movie)}/>
                ))}
            </div>
            {trailerUrl&&<YouTube videoId={trailerUrl} opts={opts}/>}

        </div>
    )
}

export default Row
