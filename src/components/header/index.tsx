import { useContext } from "react";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { supabase } from "../../services/supabaseConnection";

export function Header(){
    const { signed, loadingAuth, profile} = useContext(AuthContext);
    console.log(profile);

    async function logOut(){
        await supabase.auth.signOut();

        <Navigate to={"/login"}/>
    }

    return(
        <div className="bg-white w-full flex items-center justify-center h-16 drop-shadow mb-4 ">
            <header className="w-full max-w-7xl px-4 mx-auto flex items-center justify-between ">
                <Link to={"/"}>
                    <img src="/logo.svg" alt="Logo do site" />
                </Link>

                {!loadingAuth && signed && (
                    <Link to={"/dashboard"} className="flex items-center gap-5">
                        <div className="border rounded-full p-1 cursor-pointer">
                            <FiUser size={24} color="#000"/>
                        </div>
                        <div 
                            onClick={() => logOut()}
                            className="flex gap-3 bg-red-600 px-3 py-1 rounded"
                        >
                            <p className="bold">Sair</p>
                            <FiLogOut size={24} color="#000"/>
                        </div>
                    </Link>
                )}

                {!loadingAuth && !signed && (
                    <Link to={"/login"}>
                        <div className="cursor-pointer flex gap-2 bg-red-600 px-2 py-1 rounded">
                            <p className="font-semibold">Entrar</p>
                            <FiLogIn size={24} color="#000"/>
                        </div>
                    </Link>
                )}
            </header>
        </div>
    )
}