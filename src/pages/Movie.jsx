import React, { useState, useEffect } from 'react';
import './moviecard.css'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
const Movie = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [Loading, isLoading] = useState(true);
    const [Movies, setMovies] = useState([]);
    const [FilteredMovie, setFilteredMovie] = useState([]);
    const loadMovies = async () => {
        try {
            const { data } = await axios.get(`https://api.npoint.io/f5e5fd9a8a4d634d09da`);
            setMovies(data);
            handleSearch();
            isLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearch = () => {
        const SearchParameter = String(searchParams).split("=")[0].trim();
        const filteredMovie = Movies.filter((movie) => {
            return Object.values(movie).join(" ").toLowerCase().includes(SearchParameter.toLowerCase());
        });

        if (!filteredMovie.length > 0) {
            setFilteredMovie(Movies);
            return;
        }
        setFilteredMovie(filteredMovie);

    }

    useEffect(() => {
        loadMovies();

    }, []);


    return (
        <div>
            <center>
                <div className='paramHeading'>Search result for: " {searchParams} "</div>
                <center>
                    {
                        Loading ? (<div><div className="loader"></div><div>Loading...</div></div>) : null
                    }
                </center>
                {
                    FilteredMovie.length > 0 ? FilteredMovie.map((movie, index) => {
                        return (
                            <div key={index} className='movieCard'>
                                <div className='movieTitle'>
                                    <i className="bi bi-film"></i> {movie.title}
                                </div>
                                <div className='movieThumbnail'>
                                    <img src={movie.thumbnail} alt={movie.title} />
                                </div>
                                <div className='movieMore'>
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingTwo">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    More Details
                                                </button>
                                            </h2>
                                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">

                                                    <b type="button" className='btn btn-success moreDetailsBtn'>File Size:</b> <b className='moreDetailsBtn'>{movie.file_size}</b><br></br>
                                                    <b type="button" className='btn btn-success moreDetailsBtn'>Category:</b> <b className='moreDetailsBtn'>{movie.category}</b><br></br>
                                                    <b type="button" className='btn btn-success moreDetailsBtn'>Release Year:</b> <b className='moreDetailsBtn'>{movie.publish_year}</b><br></br>
                                                    <b type="button" className='btn btn-success moreDetailsBtn'>Industry:</b> <b className='moreDetailsBtn'>{movie.movie_industry}</b><br></br>
                                                    <b type="button" className='btn btn-success moreDetailsBtn'>Upload Date:</b><b className='moreDetailsBtn'>{movie.upload_date}</b><br></br>
                                                    <b type="button" className='btn btn-success moreDetailsBtn'>Quality:</b> <b className='moreDetailsBtn'>{movie.quality}</b><br></br>
                                                    <b type="button" className='btn btn-success moreDetailsBtn'>Availability:</b> <b className='moreDetailsBtn'>{movie.availability}</b><br></br>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <a type="button" className="download-btn" href={movie.download_link}>Download <i className="bi bi-cloud-download"></i></a>
                                </div>
                            </div>
                        )
                    }) : ""
                }
            </center>

        </div>
    );
}

export default Movie;
