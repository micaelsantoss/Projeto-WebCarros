import { useContext, useEffect, useState } from "react";
import { Container } from "../../components/container";
import { PanelHeader } from "../../components/panelHeader";
import { supabase } from "../../services/supabaseConnection";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { FiEdit, FiTrash } from "react-icons/fi";

interface PostProps{
    id: string;
    user_id: string;
    name: string;
    model: string;
    year: string;
    km: string;
    price: string;
    city: string;
    color: string;
    whatsapp: string;
    description: string;
    images: object;
    created_at: Date;
}

export function Dashboard(){
    const [ postCar, setPostCar ] = useState<PostProps[]>([]);
    const { profile } = useContext(AuthContext);

    useEffect(() => {
        async function loadPosts(){
            const { data, error } = await supabase
            .from("posts")
            .select("*")
            .eq("user_id", profile?.id)
            .order("created_at", { ascending: false });

            if(error){
                console.error(error);
                return;
            }

            setPostCar(data);
        }

        loadPosts();
    }, [handleDelete]);

    function formatDate(date: Date) {
        return new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    async function handleDelete(carId: string){
        const { error } = await supabase
            .from("posts")
            .delete()
            .eq("id", carId);

        if (error) {
            console.error("Erro ao deletar carro:", error);
            alert("Erro ao deletar anúncio");
            return;
        }

        alert("Anúncio deletado com sucesso!"); 

    }

    return(
        <Container>
            <PanelHeader/>

            <h1 className="text-center text-2xl font-bold mt-4 mb-5 lg:text-4xl">Meus veículos anunciados</h1>

            <main className="w-full max-w-[300px] md:max-w-2xl lg:max-w-5xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-15">
                
                {postCar.map((car) => (
                   
                    <section 
                        key={car.id}
                        className="w-full bg-white rounded-lg hover:scale-105 transition-all relative"
                    >
                        <div className="absolute flex gap-3 bg-white rounded-lg top-2 left-2 p-1 shadow-2xl">
                            <Link to={`/dashboard/editcar/${car.id}`}>
                                <FiEdit size={28} color="#000" className="cursor-pointer"/>
                            </Link>
                            <FiTrash size={28} color="#000" className="cursor-pointer" onClick={() => handleDelete(car.id)}/>
                        </div>

                        <img 
                            src={car.images[0].url} 
                            alt={car.images[0].name} 
                            className="w-full rounded-lg mb-2 h-60 object-cover"
                        />
                        <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>

                        <div className="flex flex-col px-2">
                            <span className="text-zinc-700 mb-6">{car.year} | {car.km} km</span>
                            <strong className="text-black font-medium text-xl">R$ {car.price}</strong>
                        </div>

                        <div className="w-full h-px bg-slate-300 my-2"></div>

                        <div className="px-2 pb-2 flex flex-col">
                            <span className="text-zinc-700">
                                {car.city}
                            </span>
                            <span className="text-zinc-700 flex gap-3">
                                <p>Data de postagem: </p>
                                {formatDate(car.created_at)}
                            </span>
                        </div>
                    </section>
                    
                ))}
                
            </main>
        </Container>
    )
}