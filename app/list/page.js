"use client"
import React, { useState, useEffect } from "react";
import Nav from "@/app/components/Nav";


const Trending = ({ initialData }) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0); // Track the offset for pagination
    const limit = 8; // Number of GIFs per page
    const [likedGIFs, setLikedGIFs] = useState([]);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=g3TEgnU2pGODGJrcvHcn36HwOhK3E8l9&limit=${limit}&offset=${offset}`);
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [offset]);

    const handleNextPage = () => {
        setOffset((prevOffset) => prevOffset + limit);
    };

    const handlePrevPage = () => {
        if (offset >= limit) {
            setOffset((prevOffset) => prevOffset - limit);
        }
    };

    const handleLike = (id) => {
        const likedGIF = data.find((gif) => gif.id === id);
        if (likedGIF) {
            if (likedGIFs.some((liked) => liked.id === id)) {
                // Dislike if already liked
                setLikedGIFs(likedGIFs.filter((liked) => liked.id !== id));
            } else {
                // Like if not already liked
                setLikedGIFs([...likedGIFs, likedGIF]);
            }
        }
    };
   

    const isLiked = (id) => {
        return likedGIFs.some((liked) => liked.id === id);
    };

    return (
        <>
            <Nav />
            <div className="bg-dark text-white py-5">
                <h1 className="text-center mb-4">Explore Randomly <span style={{ color: '#00E6CC' }}>Animation</span> GIFs</h1>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {loading ? (
                            <p>Loading...</p>
                        ) : Array.isArray(data) && data.length > 0 ? (
                            data.map((gif) => (
                                <div key={gif.id} className="col">
                                    <div className="card">
                                        <img src={gif.images?.downsized_large.url} className="card-img-top" alt="" style={{ height: '200px', objectFit: 'cover' }} />
                                        <button className={`btn btn-${isLiked(gif.id) ? 'primary' : 'danger'} mt-2`} onClick={() => handleLike(gif.id)}>
                                            {isLiked(gif.id) ? "Dislike" : "Like"}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No GIFs available</p>
                        )}
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button className="btn btn-primary me-2" onClick={handlePrevPage} disabled={offset === 0}>
                            Previous Page
                        </button>
                        <button className="btn btn-primary" onClick={handleNextPage}>
                            Next Page
                        </button>
                    </div>
                </div>
                {/* ------ */}
                
                <div className="liked-gifs">
                    <h3> Your Liked GIFs</h3>
                    <ul>
                        {likedGIFs.map((gif) => (
                            <li key={gif.id}>
                                <img src={gif.images?.downsized_large.url} alt="" style={{ height: '100px', objectFit: 'cover' }} />
                                <button className={`btn btn-danger mt-2`} onClick={() => handleLike(gif.id)}>Dislike</button>
                            </li>
                        ))}
                    </ul>
                </div>  
                
            </div>
        </>
    );
};

export default Trending;
