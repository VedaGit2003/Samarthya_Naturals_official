import React, { useState } from 'react';
import Lay from '../../components/Layout/Lay';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await toast.promise(
                axios.post('/api/v1/auth/login', { email, password }),
                {
                    loading: 'Logging in...',
                    success: (response) => {
                        if (response.data.success) {
                            setAuth({
                                ...auth,
                                user: response.data.user,
                                token: response.data.token,
                            });
                            localStorage.setItem("auth", JSON.stringify(response.data));
                            navigate(location.state || '/');
                            return response.data.message;
                        } else {
                            throw new Error(response.data.message || "Login failed");
                        }
                    },
                    error: (error) => {
                        console.error("Error during login:", error.message);
                        if (error.response && error.response.status === 400) {
                            return "Invalid email or password";
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
            <Lay title={"Login - SipShop"}>
                <div className='login'>
                    <h1 style={{ color: "rgb(133, 100, 234)" }}>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                placeholder='Enter your email' required value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="exampleInputPassword1"
                                placeholder='Enter your password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/register">Register</Link>
                        <br></br>
                        <Link to="/forgot-password" style={{padding:0,color:'blue'}}>forgot password?</Link>
                    </form>
                </div>
            </Lay>
        </>
    );
};

export default Login;

