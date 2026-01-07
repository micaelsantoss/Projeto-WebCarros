import { FiLogIn, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

export function Header(){
    const signed = false;
    const loadingAuth = false;

    return(
        <div className="bg-white w-full flex items-center justify-center h-16 drop-shadow mb-4 ">
            <header className="w-full max-w-7xl px-4 mx-auto flex items-center justify-between ">
                <Link to={"/"}>
                    <img src="/logo.svg" alt="Logo do site" />
                </Link>

                {!loadingAuth && signed && (
                    <Link to={"/dashboard"}>
                        <div className="border rounded-full p-1 cursor-pointer">
                            <FiUser size={24} color="#000"/>
                        </div>
                    </Link>
                )}

                {!loadingAuth && !signed && (
                    <Link to={"/dashboard"}>
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