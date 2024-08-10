import React, { useState } from 'react';
import Lay from '../../components/Layout/Lay';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await toast.promise(
                axios.post('/api/v1/auth/forgot-password', { email, newPassword,answer }),
                {
                    loading: 'Resetting Password...',
                    success: (response) => {
                        if (response.data.success) {      
                            navigate('/login');
                            return response.data.message;
                        } else {
                            throw new Error(response.data.message || "Login failed");
                        }
                    },
                    error: (error) => {
                        console.error("Error during login:", error.message);
                        if (error.response && error.response.status === 400) {
                            return "Invalid email or secret answer";
                        } else if (error.response && error.response.status === 404) {
                            return "Email not registered";
                        } else {
                            return "Something went wrong during login";
                        }
                    }
                }
            );
        } catch (error) {
            console.error("Error during login:", error.message);
            toast.error(error.message || "Login failed");
        }
    };
  return (
    <>
    <Lay title={"Forgot Password - SipShop"}>
                        <div className='login'>
                    <h1 style={{ color: "rgb(133, 100, 234)" }}>Reset Password</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                placeholder='Enter your email' required value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="exampleInputAnswer" aria-describedby="emailHelp"
                                placeholder='Enter your secret nickname' required value={answer} onChange={(e) => setAnswer(e.target.value)}
                            />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="exampleInputPassword1"
                                placeholder='Enter your new password' required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-info">Reset Password</button>
                        <Link to="/register">Register</Link>
                    </form>
                </div>
    </Lay>
    </>
  )
}

export default ForgotPassword