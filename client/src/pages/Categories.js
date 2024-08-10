import React from 'react'
import Lay from '../components/Layout/Lay'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories=useCategory()
  return (
    <Lay title={'All Categories'}>
        <div className='container'>
            <div className='row'>
              {categories.map((c)=>(
                <div className='col-md-6 mt-5 mb-3 gx-3 gy-3'  key={c._id}>
                    <Link to={`/category/${c.slug}`} className='btn btn-light'  style={{padding:"10%",flexDirection:'row'}} >
                        {c.name}
                    </Link>
                </div>
              ))}
            </div>
        </div>
    </Lay>
  )
}

export default Categories