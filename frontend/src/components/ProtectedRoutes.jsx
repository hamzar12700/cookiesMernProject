import React, { Children, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function ProtectedRoutes({ children }) {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    //     const token = localStorage.getItem("token");
    // console.log(token);

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch("http://localhost:5000/api/v1/auth/profile", {
                    credentials: "include"
                })

                if (response.ok) {
                    navigate("/")
                    setAuthenticated(true)
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, [])

    if (loading) {
        return <h1>Loading......</h1>
    }


    if (!authenticated) {
        return <Navigate to='/login' replace />
    }
    return children
}

export default ProtectedRoutes