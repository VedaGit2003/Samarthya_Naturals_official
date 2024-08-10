import React, { useState, useEffect } from 'react'
import Lay from '../components/Layout/Lay'
import { useAuth } from '../context/auth'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { Checkbox, Radio } from 'antd'
import axios from 'axios'
import { Prices } from '../components/Prices'
import { useCart } from '../context/cart'
import { useFavorites } from '../context/favourite';
import SearchInput from '../components/Form/SearchInput'
import BannerPage from './BannerPage'
import '../css/search.css'
import { IoReloadCircleSharp } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";

const Shop = () => {
    const [cart, setCart] = useCart()
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [favorites, setFavorites] = useFavorites();

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);
    //get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //getTOtal COunt
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // filter by cat
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("/api/v1/product/product-filters", {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    const handleAddToFavorites = (product) => {
        const updatedFavorites = [...favorites, product];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        toast.success('Item Added to Favorites');
    };

    // reset filters
    // const resetFilters=async()=>{
    //   await setChecked([])
    //  await setRadio([])
    // }
    return (
        <Lay title={"All Products - Best Offers"}>

            <div className="container-fluid row mt-3">
                <div className="col-md-2">
                    <h4 className="text-center">Filter By Category</h4>
                    <div className="d-flex flex-column">
                        {categories?.map((c) => (
                            <Checkbox
                                key={c._id}
                                onChange={(e) => handleFilter(e.target.checked, c._id)}
                            >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    {/* price filter */}
                    <h4 className="text-center mt-4">Filter By Price</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map((p) => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column">
                        <button
                            className="btn btn-danger"
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>
                    </div>
                </div>
                <div className="col-md-9">
                    {/* <h1 className="text-center">All Products</h1> */}
                    {/* //search bar */}
                    <center> <div className='text-center' style={{ padding: 5, width: "70%" }}>
                        <SearchInput />
                    </div>
                    </center>
                    <center> <div className='text-center' style={{ padding: 5, width: "100%" }}>
                        <BannerPage />
                    </div>
                    </center>
                </div>
                <div className="d-flex flex-wrap" style={{ justifyContent: 'center' }}>
                    {products?.map((p) => (

                        <div className="card m-4" style={{ width: "18rem" }}>
                            <button
                                onClick={() => handleAddToFavorites(p)}
                                style={{ border: 'none', padding: 0, background: 'none',position:'absolute'}}
                            >
                                <IoMdHeart style={{ position: 'absolute', color: 'rgb(127, 173, 57)' }} size={30} />
                            </button>

                            <img style={{ width: "100%", height: "60%" }}
                                src={`/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top"
                                alt={p.name}
                            />

                            <hr />
                            <div className="card-body">
                                <h5 className="card-title">{p.name.substring(0, 30)}</h5>
                                <p className="card-text">
                                    {p.description.substring(0, 30)}...
                                </p>
                                <p className="card-text">
                                    Rs.<strong><span style={{ color: 'green' }}>{p.price}</span></strong>
                                </p>
                                <button class="btn btn-primary ms-1 mb-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                <button class="btn btn-rounded ms-1 mb-1 cart-button" id='cart'
                                    style={{
                                        padding: '2%',
                                        border: '1px solid #32f065',
                                        color: '#32f065',
                                        transition: 'background-color 0.3s',
                                        backgroundColor: 'transparent'
                                    }}
                                    onClick={() => {
                                        setCart([...cart, p]);
                                        localStorage.setItem("cart", JSON.stringify([...cart, p]))
                                        toast.success("Item Added to Cart")
                                    }
                                    }
                                >ADD TO CART</button>
                            </div>
                        </div>

                    ))}
                </div>
                <div className="m-2 p-3">
                    {products && products.length < total && (
                        <button
                            className="btn btn-outline-info"
                            onClick={(e) => {
                                e.preventDefault();
                                setPage(page + 1);
                            }}
                        >
                            {loading ? ("Loading ...") : ("Loadmore")}
                        </button>
                    )}
                </div>

            </div>

        </Lay>
    )
}

export default Shop