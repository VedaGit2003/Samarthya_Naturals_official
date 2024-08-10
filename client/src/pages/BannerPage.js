import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const BannerPage = () => {
    const [banners, setBanners] = useState([]);

    const getAllBanners = async () => {
        try {
            const { data } = await axios.get('/api/v1/banner/get-banner');
            setBanners(data.banners);
            // toast.success("Banners fetched successfully");
        } catch (error) {
            console.log(error);
            // toast.error('Something went wrong while fetching banners');
        }
    };

    useEffect(() => {
        getAllBanners();
    }, []);

    return (
        <div>
                        <style>
                {`
                    /* Custom CSS to remove active border-bottom color from carousel controls */
                    .carousel-item.active {
                        border: none; /* Remove border */
                        background-color:black;
                    }
                    carousel-item.carousel-item-next.carousel-item-start{
                        background-color:black
                    }
                `}
            </style>
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {banners.map((p, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img
                                src={`/api/v1/banner/banner-photo/${p._id}`}
                                className="d-block w-100 carousel-img"
                                style={{height:'40vh',width:'100%',objectFit:'fill',
                                }}
                                alt={`Banner ${index}`}
                            />
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" >
                    <span className="carousel-control-prev-icon" aria-hidden="true" style={{backgroundColor:'rgb(133, 100, 234)',borderRadius:'10%'}} />
                    <span className="visually-hidden" style={{backgroundColor:'yellow'}}>Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" style={{backgroundColor:'rgb(133, 100, 234)',borderRadius:'10%'}}/>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default BannerPage;
