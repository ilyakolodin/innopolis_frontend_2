import * as React from 'react';
import { useLocation, Navigate } from 'react-router-dom'

export const RequireAuth = ({children}: {children: any}) => {
    const location = useLocation();
    console.log(location)

    const isAuth = true

    if (!isAuth) {
        return <Navigate to='/about'/>
    }

    return children
}