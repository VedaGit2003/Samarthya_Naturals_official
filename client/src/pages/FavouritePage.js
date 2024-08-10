import React, { useEffect, useState } from 'react'
import Lay from '../components/Layout/Lay'
import { useFavorites } from '../context/favourite'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const FavouritePage = () => {
    const [auth, setAuth] = useAuth()
    const [favorites, setFavorites] = useFavorites()
    const navigate = useNavigate()

    // Total price of favorite items
    const totalPrice = () => {
        try {
            let total = 0
            favorites?.map((item) => {
                total = total + item.price
            })
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "INR"
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Delete item from favorites
    const removeFavoriteItem = async (pid) => {
        try {
            let myFavorites = [...favorites]
            let index = myFavorites.findIndex((item) => item._id === pid)
            myFavorites.splice(index, 1)
            setFavorites(myFavorites)
            localStorage.setItem('favorites', JSON.stringify(myFavorites))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Lay title={"Favorites-ShipShop"}>
            <div className='container' style={{display:'flex',flexDirection:'column'}} >
                <div className='row' >
                    <div className='col-md-12' >
                        <h1 className='text-center bg-light p-2 mb-1'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {favorites?.length ? `You have ${favorites?.length} items in your favorites ${auth?.token ? ""
                                : "Please Login to view favorites"}` : "Your Favorites is Empty"
                            }
                        </h4>
                    </div>
                </div>
                <div className='row' style={{display:'flex',justifyContent:'space-between'}}>
                    <div className='col-md-6'>
                        {
                            favorites?.map((p) => (
                                <div className='row mb-2 card flex-row p-3' key={p._id}>
                                    <div className='col-md-4'>
                                        <img src={`/api/v1/product/product-photo/${p._id}`}
                                            className='card-img-top' alt={p.name}
                                            style={{ width: "90%", height: "90%", border: "0.5px solid grey" }}
                                        />
                                    </div>
                                    <div className='col-md-8'>
                                        <p>Product name: {p.name.substring(0, 30)}</p>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <p>Price :<strong style={{ color: 'green' }}>{p.price}</strong> </p>
                                        <button className='btn btn-danger' onClick={() => removeFavoriteItem(p._id)}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='col-md-4'>
                        <h2>Favorites Summary</h2>
                        <p>Total | View All</p>
                        <hr />
                        <h4>Total : {totalPrice()}</h4>
                        {
                            auth?.user?.address ? (<>
                                <div className='mb-3'>
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}>
                                        Update Address
                                    </button>
                                </div>
                            </>) :
                                (<div className='mb-3'>
                                    {
                                        auth?.token ? (
                                            <button
                                                className="btn btn-outline-warning"
                                                onClick={() => navigate("/dashboard/user/profile")}
                                            >
                                                Update Address
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-outline-warning"
                                                onClick={() =>
                                                    navigate("/login", {
                                                        state: "/favorites",
                                                    })
                                                }
                                            >
                                                Please Login to view favorites
                                            </button>
                                        )
                                    }
                                </div>)
                        }
                    </div>
                </div>
            </div>
        </Lay>
    )
}

export default FavouritePage
