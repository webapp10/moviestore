import React, { useState, useEffect } from 'react';
import './moviecard.css'
import './skeletonLoader.css'
import axios from 'axios';
const Home = () => {
    const [searchValue, setSearchValue] = useState("");
    const [Movies, setMovies] = useState([]);
    const [SearchResult, setSearchResult] = useState([]);
    const [LoadingSpinner, setLoadingSpinner] = useState(true);

    const loadMovies = async () => {
        try {
            const { data } = await axios.get(`https://api.npoint.io/f5e5fd9a8a4d634d09da`);
            setLoadingSpinner(false);
            setMovies(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadMovies();
    }, []);

    const handleSearch = (e) => {

        if (e.target.value !== "") {
            setSearchValue(e.target.value);
            const filteredMovie = Movies.filter((movie) => {
                return Object.values(movie).join(" ").toLowerCase().includes(searchValue.toLowerCase());
            });
            setSearchResult(filteredMovie);
        } else {
            setSearchResult(Movies);
        }

    }

    const handleButton = (param) => {
        setSearchValue(param);
        const filteredMovie = Movies.filter((movie) => {
            return Object.values(movie).join(" ").toLowerCase().includes(param.toLowerCase());
        });
        if (!filteredMovie.length > 0) {
            alert("No movies found! (" + param.toUpperCase() + ")");
            return;
        }
        setSearchResult(filteredMovie);




    }
    return <>
        <div className='searchBoxContainer'>
            <input type="text" onChange={handleSearch} placeholder="Movie name, category, year..."></input>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-search searchIcon" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>

        </div>

        <div className="categoryBtn">
            <button type='button' className='btn btn-danger' onClick={(a) => handleButton('adventure')}>Adventure</button>
            <button type='button' className='btn btn-danger' onClick={() => handleButton('sci-fi')}>Sci-Fi</button>
            <button type='button' className='btn btn-danger' onClick={() => handleButton('romantic')}>Romantic</button>
            <button type='button' className='btn btn-danger' onClick={() => handleButton('horror')}>Horror</button>
            <button type='button' className='btn btn-danger' onClick={() => handleButton('thriller')}>Thriller</button>
            <button type='button' className='btn btn-danger' onClick={() => handleButton('comedy')}>Comedy</button>
            <br></br>
            <button type='button' className='btn btn-success' onClick={() => handleButton('hollywood')}>Hollywood</button>
            <button type='button' className='btn btn-success' onClick={() => handleButton('bollywood')}>Bollywood</button>
            <button type='button' className='btn btn-success' onClick={() => handleButton('tollywood')}>Tollywood</button>
            <br></br>
            <button type='button' className='btn btn-warning' onClick={() => handleButton('')}>All Movies</button>
        </div>

        <div className='cardContainer'>

            <center>
                {
                    LoadingSpinner ? (<div><div className="loader"></div><div>Loading...</div></div>) : null
                }
            </center>



            {
                (searchValue !== "" ? SearchResult : Movies).map((movie, index) => {
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
                    );
                })
            }


        </div>



    </>;
}

export default Home;
