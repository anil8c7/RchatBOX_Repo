import React from 'react'
import { Outlet } from 'react-router-dom';

const PrivateRoutes = ()=> {
    let userlogin = true;
    if(userlogin){
        return <Outlet />;
    }else{
        return "User is not logged in";
    }
}

export default PrivateRoutes;