import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Lay from '../../components/Layout/Lay'
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [phone,setPhone]=useState("")
    const [address,setAddress]=useState("")
    const [answer,setAnswer]=useState("")
    const navigate=useNavigate()


    //Form Control
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await toast.promise(
                axios.post('/api/v1/auth/register', { name, email, password, phone, address,answer}),
                {
                    loading: 'Registering...',
                    success: (res) => {
                        if (res.data.success) {
                            navigate("/login");
                            return res.data.message;
                        } else {
                            return res.data.message || "Registration failed";
                        }
                    },
                    error: (error) => {
                        console.error("Error during registration:", error);
                        return "Something went wrong during registration";
                    }
                }
            );
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("Something went wrong during registration");
        }
    };

    return (
        <>
            <Lay>
                <div className='register'>
                    <h1 style={{ color: "rgb(133, 100, 234)" }}>Register Here</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)}
                                 required />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                placeholder='Enter your email' required value={email} onChange={(e)=>setEmail(e.target.value)}
                            />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                placeholder='Enter your address' required value={address} onChange={(e)=>setAddress(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                placeholder='Enter your phone no' required value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                placeholder='Enter your hidden nickname' required value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="exampleInputPassword1"
                                placeholder='Enter your password' required  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/login">Login</Link>
                    </form>

                </div>
            </Lay>
        </>
    )
}

export default Register