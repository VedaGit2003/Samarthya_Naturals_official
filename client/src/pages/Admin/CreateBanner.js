import React, { useState } from 'react'
import Lay from '../../components/Layout/Lay'
import AdminMenu from '../../components/Layout/AdminMenu'
import { FaCloudArrowUp } from "react-icons/fa6";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateBanner = () => {
    const [name, setName] = useState("")
    const [photo, setPhoto] = useState("")
    const navigate=useNavigate()

    const handleCreateBanner=async(e)=>{
        e.preventDefault()
        try{
         const bannerData=new FormData()
         bannerData.append("name",name)
         bannerData.append("photo",photo)
         const {data}=await axios.post('/api/v1/banner/create-banner',bannerData)

         if (data?.success){
            toast.success("Banner Created");
            navigate("/dashboard/admin")
         }
         else{
            toast.error(data?.message)
         }
        }catch(error){
       console.log(error)
       toast.error("Some thing went wrong")
        }
    }
    return (
        <Lay title={"Create Banner - Admin"}>
            <div className="container-fluid  p-3">
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center'>Create Banner</h1>
                        <div className="m-1 w-75">
                            <div className='mb-3'>
                                <input type='text'
                                    className='form-control' placeholder='Enter Banner Name'
                                    value={name} onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type='file' name='photo' accept='image/*'
                                        onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo && (
                                    <div className='text-center' >
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alter="banner_photo"
                                            className='img img-responsive'
                                            style={{ height: '40vh' }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreateBanner}>
                                <FaCloudArrowUp size={30} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Lay>
    )
}

export default CreateBanner