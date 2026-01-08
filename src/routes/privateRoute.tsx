import { useContext, type ReactNode } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

interface PrivateProos{
    children: ReactNode;
}

export function PrivateRoute({ children }: PrivateProos): any{
    const { signed, loadingAuth } = useContext(AuthContext);

    if(loadingAuth){
        return <div>carregando...</div>
    }

    if(!signed){
        return <Navigate to={"/login"}/>
    }
    
    return children;
}