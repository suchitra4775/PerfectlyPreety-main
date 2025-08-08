import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateComp = ({children}) => {
    const navigate = useNavigate()

    const isAuthenticated = sessionStorage.getItem("islogin")==="true"

    useEffect(()=>{
        if(!isAuthenticated){
            navigate("/")
        }
    },[])
    return (
        <div>
            <>{children}</>
        </div>
    )
}

export default PrivateComp
