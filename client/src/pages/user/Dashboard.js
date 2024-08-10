import React from 'react'
import Lay from '../../components/Layout/Lay'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
const Dashboard = () => {
const [auth]=useAuth()
  return (
    <Lay title={"Dashboard - SipShop"}>
        <div style={{backgroundColor:"#deb8ff",height:"100vh"}} className='container-fluid p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <UserMenu/>
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h2 style={{textTransform:"uppercase"}}>User Name: {auth?.user?.name}</h2>
                <h4 style={{color:"gray"}}>Email: {auth?.user?.email}</h4>
              </div>
            </div>
          </div>
        </div>
    </Lay>
  )
}

export default Dashboard