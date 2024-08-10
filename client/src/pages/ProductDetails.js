import React, { useEffect, useState } from 'react'
import Lay from '../components/Layout/Lay'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useCart } from '../context/cart'
// import { Navigate } from 'react-router-dom'

const ProductDetails = () => {
    const [cart, setCart] = useCart()
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const navigate = useNavigate

    //details
    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProduct(data?.product?._id, data?.product?.category?._id)
        } catch (error) {
            console.log(error)
            toast.error("Error while fetching details")
        }
    }
    //get similar products
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Lay title={"Product details"}>
            <div className='container mt-2'>
                <div className='row'>
                    <div className='col-md-6 mt-5'>
                        <center>
                            <img src={`/api/v1/product/product-photo/${product._id}`}
                                className='card-img-top' alt='product.name' style={{ height: "50%", width: "90%", border: "1px solid black" }}
                            />
                        </center>

                    </div>
                    <div className='col-md-6 mt-4'>
                        <h1 className='text-center'>Product Details</h1>
                        <br></br>
                        <h3>Name: {product?.name}</h3>
                        <h6>Description: {product?.description}</h6>
                        <h6 style={{ color: 'green' }}>Price: {product?.price}</h6>
                        <h6>Category: {product?.category?.name}</h6>
                        <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-info"
                            onClick={() => {
                                setCart([...cart, product]);
                                localStorage.setItem("cart", JSON.stringify([...cart, product]))
                                toast.success("Item Added to Cart")
                            }}

                        >ADD TO CART</button>
                    </div>
                </div>
                <div className='row mt-4'>
                    <h4>Similar Products</h4>
                    {relatedProducts.length < 1 && (
                        <p className="text-center">No Similar Products found</p>
                    )}
                    <div className="d-flex flex-wrap">
                        {relatedProducts?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    src={`/api/v1/product/product-photo/${p?._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name.substring(0, 20)}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text" style={{ color: 'green' }}> Rs. {p.price}</p>
                                    <button class="btn btn-secondary ms-1"
                                        onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem("cart", JSON.stringify([...cart, p]))
                                            toast.success("Item Added to Cart")
                                        }}
                                    >ADD TO CART</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Lay>
    )
}

export default ProductDetails