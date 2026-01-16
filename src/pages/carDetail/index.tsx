import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseConnection";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../components/container";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
    images: ImageProps[];
    created_at: Date;
}

export interface ImageProps {
  id: string;
  name: string;
  url: string;
  previewUrl: string;
  path: string;
}

export function CarDetail(){
    const [ car, setCar ] = useState<PostProps>();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadCar(){
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .eq("id", id)
                .single();
            
            if(error){
                console.error("Erro ao carregar veículo:", error);
            
                navigate("/");
                return;
            }

            setCar(data);
        }

        loadCar();
    }, []);

    return(
        <Container>
            <Swiper
                pagination={{ clickable: true }}
                navigation
                className=" rounded-t-2xl"
                loop={true}
                breakpoints={{
                    640: {
                    slidesPerView: 1,
                    },
                    768: {
                    slidesPerView: 2,
                    },
                    1024: {
                    slidesPerView: 2,
                    },
                    1280: {
                    slidesPerView: 2,
                    },
                }}
            >
                { car?.images.map((image) => (
                    <SwiperSlide key={image.id}>
                        <img src={image.url} alt="Imagem do veículo" className="w-full h-94 object-cover center" />
                    </SwiperSlide>
                ))}
            </Swiper>

            { car && (
               <div className="bg-white p-8 flex flex-col gap-7 rounded-b-2xl mb-15">
                    <div className="flex flex-col md:flex-row gap-5 justify-between">
                        <div>
                            <h1 className="font-bold text-3xl">{car.name}</h1>
                            <p>{car.model}</p>
                        </div>

                        <h1 className="font-bold text-3xl">R$ {car.price}</h1>
                    </div>

                    <div className="flex flex-col gap-3 md:flex-row md:justify-between lg:justify-start lg:gap-15">
                        <div>
                            <p>Cidade</p>
                            <h2 className="font-bold">{car.city}</h2>
                        </div>
                        <div>
                            <p>Ano</p>
                            <h2 className="font-bold">{car.year}</h2>
                        </div>
                        <div>
                            <p>Km</p>
                            <h2 className="font-bold">{car.km}</h2>
                        </div>
                    </div>

                    <div>
                        <h2 className="font-bold">Descrição</h2>
                        <p>{car.description}</p>
                    </div>

                    <div>
                        <h2 className="font-bold">Telefone</h2>
                        <p>{car.whatsapp}</p>
                    </div>

                    <a 
                        className="bg-green-700 text-white font-bold p-3 rounded-xl cursor-pointer hover:scale-101 transition-all text-center"
                        href={`https://wa.me/55${car.whatsapp}?text=Olá, tenho interesse no veículo ${car.name} do site WebCarros!`}
                        target="_blank"
                    >Entrar em contato</a>
               </div>
            )}
        </Container>
    )
}