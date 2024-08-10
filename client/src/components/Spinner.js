import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/spinner.css"
import toast from "react-hot-toast";
const Spinner = ({path="login"}) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location,path]);
  return (
    <>
    <center><h2>Redirecting to you in {count} second</h2></center>
    <span className="d-flex justify-content-center align-item-center loader"
    style={{height:"100vh"}}
    ></span>

    </>
  )
}

export default Spinner


