"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Nav from "@/app/components/Nav";

const Search = () => {
    const [slug, setSlug] = useState("");
    const [images, setImages] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [likedGIFs, setLikedGIFs] = useState([]);
    const limit = 6; // Number of GIFs per page

    const searchGIFs = async (searchQuery, offsetVal) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=aLU8qMkGlAEtrL95Ls8aC7euCwhANwlW&limit=${limit}&offset=${offsetVal}`);
            if (data && data.data && Array.isArray(data.data)) {
                setImages(data.data.map(gif => ({ ...gif, liked: false }))); // Adding 'liked' property to each GIF
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        setOffset(0);
        searchGIFs(slug, 0);
    };

    const handleNextPage = () => {
        setOffset((prevOffset) => prevOffset + limit);
        searchGIFs(slug, offset + limit);
    };

    const handlePrevPage = () => {
        if (offset >= limit) {
            setOffset((prevOffset) => prevOffset - limit);
            searchGIFs(slug, offset - limit);
        }
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [slug]); // Run the effect whenever the slug changes

    // Function to toggle liked state for a GIF
    const toggleLike = (index) => {
        const updatedLikedGIFs = [...likedGIFs];
        const gif = images[index];

        if (updatedLikedGIFs.includes(gif)) {
            // Remove GIF from liked list
            const updatedGIFs = updatedLikedGIFs.filter((likedGIF) => likedGIF !== gif);
            setLikedGIFs(updatedGIFs);
        } else {
            // Add GIF to liked list
            updatedLikedGIFs.push(gif);
            setLikedGIFs(updatedLikedGIFs);
        }

        // Update the state of liked GIFs and toggle button appearance
        const updatedImages = [...images];
        updatedImages[index].liked = !updatedImages[index].liked; // Set liked property for the GIF

        setImages(updatedImages);
    };

    return (
        <>
            <Nav />
            <div style={{ backgroundColor: '#077b8a', minHeight: '100vh', width: '100%' }}>
                <div className='container py-5'>
                    <h1 className='text-center text-white mb-4'>Search Your GIFs</h1>
                    <div className='input-group mb-3'>
                        <input
                            className='form-control'
                            type='text'
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder='Search Your Favorite GIFs'
                        />
                        <button className='btn btn-primary' onClick={handleSearch}>Search</button>
                    </div>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {images.map((gif, index) => (
                            <div className="col" key={index}>
                                <div className="card">
                                    <img src={gif.images.fixed_height.url} alt={`GIF ${index}`} className="card-img-top" />
                                    <div className="card-body d-flex justify-content-between">
                                        {/* Like button */}
                                        <button style={{width:'100%'}}
                                            className={`btn ${gif.liked ? 'btn-primary' : 'btn-danger'}`}
                                            onClick={() => toggleLike(index)}
                                        >
                                            {gif.liked ? 'Dislike' : 'Like'}
                                        </button>
                                        {/* Optional: Add more buttons, text, or information */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {!loading && (
                        <div className="d-flex justify-content-center mt-4">
                            <button className='btn btn-primary me-2' onClick={handlePrevPage} disabled={offset === 0}>
                                Previous Page
                            </button>
                            <button className='btn btn-primary' onClick={handleNextPage}>
                                Next Page
                            </button>
                        </div>
                    )}
                    {loading && (
                        <div className="text-center mt-3">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Search;
