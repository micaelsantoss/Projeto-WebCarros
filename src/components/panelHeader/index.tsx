import { Link } from "react-router-dom";

export function PanelHeader(){
    return(
        <div className="w-full max-w-7xl bg-red-700 h-10 rounded-lg mb-5 flex items-center gap-6 pl-10">
            <Link to={"/"} className="font-bold text-white">
                Início
            </Link>

            <Link to={"/dashboard"} className="font-bold text-white">
                Dashboard
            </Link>

            <Link to={"/dashboard/newCar"} className="font-bold text-white">
                Cadastrar Veículo
            </Link>
        </div>
    )
}