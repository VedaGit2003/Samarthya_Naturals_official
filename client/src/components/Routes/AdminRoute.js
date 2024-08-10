import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import toast from "react-hot-toast";

export default function AdminRoute() {
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        if (!auth.token) {
          // If user is not logged in, redirect to login page
          navigate("/");
          return;
        }

        await toast.promise(
          axios.get("/api/v1/auth/admin-auth"),
          {
            loading: "Checking authorization...",
            success: (res) => {
              if (res.data.ok) {
                // User is authorized as admin, allow access
                setLoading(false);
                toast.success("Success");
              } else {
                // User is not authorized as admin, handle accordingly
                navigate("/", { state: { notAdmin: true } }); // Redirect to home page with state
                return Promise.reject("User is not an admin");
                // toast.success("not a admin")
              }
            },
            error: (error) => {
              console.error("Error checking admin authorization:", error);
              toast.error("Something went wrong");
              navigate("/"); // Redirect to home page or another appropriate page
            },
          }
        );
      } catch (error) {
        console.error("Error checking admin authorization:", error);
        toast.error("Something went wrong");
        navigate("/"); // Redirect to home page or another appropriate page
      }
    };

    authCheck();
  }, [auth, navigate]);

  return loading ? <Spinner path="" /> : <Outlet />;
}