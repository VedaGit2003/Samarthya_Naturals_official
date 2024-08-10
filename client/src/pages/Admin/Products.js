import React, { useState, useEffect } from 'react'
import Lay from '../../components/Layout/Lay'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Products = () => {
  const [products, setProducts] = useState([])

  //get all product
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/get-product')
      setProducts(data.products)
    }
    catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, [])
  return (
    <Lay title={"Create-Product - Admin"}>
      <div className="container-fluid p-3">
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1 className='text-center'>All Products List</h1>
            <div className='d-flex' style={{flexWrap:'wrap'}}>
              {products?.map((p) => (
                <Link 
               key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Lay>
  )
}

export default Products