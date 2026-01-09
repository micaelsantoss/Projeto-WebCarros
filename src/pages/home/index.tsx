import { useEffect, useState } from "react";
import { Container } from "../../components/container";
import { PanelHeader } from "../../components/panelHeader";
import { supabase } from "../../services/supabaseConnection";
import { Link } from "react-router-dom";

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

export function Home(){
    const [ postCar, setPostCar ] = useState<PostProps[]>([]);

    useEffect(() => {
        async function loadPosts(){
            const { data, error } = await supabase
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false });

            if(error){
                console.error(error);
                return;
            }

            setPostCar(data);
        }

        loadPosts();
    }, []);

    function formatDate(date: Date) {
        return new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    return(
        <Container>
            <PanelHeader/>

            <h1 className="text-center text-2xl font-bold mt-4 mb-5 lg:text-4xl">Carros novos e usados em todo o Brasil</h1>

            <div className="bg-white w-full max-w-3xl p-4 rounded-lg mx-auto flex justify-center items-center gap-4 mb-10">
                <input 
                    className="bg-white rounded px-2 py-1 outline-0 border border-zinc-400 w-full max-w-xl"
                    type="text" 
                    placeholder="Digite o nome do carro..."
                />
                <button className="bg-red-600 px-4 rounded py-1 font-semibold text-white hover:bg-red-900 cursor-pointer">
                    Buscar
                </button>
            </div>

            <main className="w-full max-w-[300px] md:max-w-2xl lg:max-w-5xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-15">
                
                {postCar.map((car) => (
                    <Link key={car.id} to={`/car/${car.id}`}>
                        <section 
                            className="w-full bg-white rounded-lg hover:scale-105 transition-all"
                        >
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
                    </Link>
                ))}
                
            </main>
        </Container>
    )
}