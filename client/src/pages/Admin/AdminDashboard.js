import React from 'react'
import Lay from '../../components/Layout/Lay'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
  const [auth]=useAuth()
  return (
    <Lay title={"Admin Dashboard"}>
        <div style={{backgroundColor:"#bad5ff",height:"100vh"}} className='container-fluid p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu/>
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h2 style={{textTransform:"uppercase"}}>Admin Name: {auth?.user?.name}</h2>
                <h4 style={{color:"gray"}}>Email: {auth?.user?.email}</h4>
                <h4 style={{color:"gray"}}> Contact Number: {auth?.user?.phone}</h4>
              </div>
            </div>
          </div>
        </div>
    </Lay>
  )
}

export default AdminDashboard