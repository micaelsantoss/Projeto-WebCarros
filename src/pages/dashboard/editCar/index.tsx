import { FiTrash, FiUpload } from "react-icons/fi";
import { Container } from "../../../components/container";
import { PanelHeader } from "../../../components/panelHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "../../../components/input";
import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { AuthContext } from "../../../context/authContext";
import { v4 as uuidV4 } from "uuid"
import { supabase } from "../../../services/supabaseConnection";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const schema = z.object({
    name: z.string().nonempty("O nome é veículo obrigatório"),
    model: z.string().nonempty("O modelo do veículo é obrigatório"),
    year: z.string().nonempty("O ano do veículo é obrigatório"),
    km: z.string().nonempty("A quilômetragem veículo é obrigatória"),
    price: z.string().nonempty("O preço do veículo é obrigatório"),
    city: z.string().nonempty("A cidade do veículo é obrigatória"),
    description: z.string().nonempty("A descrição é obrigatória"),
    color: z.string().nonempty("A cor é obrigatória"),
    whatsapp: z.string().nonempty("O campo nome é obrigatório").min(1, "O telefone para contato é obrigatório").refine((value) => /^(\d{11,12})$/.test(value), {
        message: "Número de telefone inválido."
    }),
})

type FormData = z.infer<typeof schema>

interface ImageProps{
    id: string;
    name: string;
    previewUrl: string;
    url: string;
    path: string;
}

export function EditCar(){
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    });
    const { profile } = useContext(AuthContext);
    const [ images, setImages ] = useState<ImageProps[]>([]);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        async function loadCar(){
            const { data, error } = await supabase
            .from("posts")
            .select("*")
            .eq("id", id)
            .single();

            if(error){
                console.error(error);
                return;
            }

            // Preenche o formulário
            reset({
            name: data.name.toUpperCase(),
            model: data.model,
            year: data.year,
            km: data.km,
            price: data.price,
            city: data.city,
            color: data.color,
            whatsapp: data.whatsapp,
            description: data.description,
            });

            // Carrega imagens já existentes
            setImages(
            data.images.map((img: any) => ({
                id: img.id,
                name: img.name,
                previewUrl: img.url,
                url: img.url,
                path: img.path,
            }))
            );
        }

        loadCar();
    }, [id, reset]);

    async function onSubmit(data: FormData){
        if(images.length === 0){
            toast.error("Adicione alguma imagem para esse anúncio!");
            return;
        }

        if (images.length >= 6) {
            toast.error("Máximo de 6 imagens por anúncio");
            return;
        }

        const carListImages = images.map( car => {
            return{
                id: car.id,
                name: car.name,
                url: car.url,
                path: car.path
            }
        });

        const { error } = await supabase
        .from("posts")
        .update([
            {
                user_id: profile?.id,
                name: data.name,
                model: data.model,
                year: data.year,
                km: data.km,
                price: data.price,
                city: data.city,
                color: data.color,
                whatsapp: data.whatsapp,
                description: data.description,
                images: carListImages
            }
        ])
        .eq("id", id);

        if (error) {
            console.error("Erro ao atualizar anúncio:", error);
            toast.error("Erro ao atualizar anúncio");
            return;
        }

        toast.success("Anúncio atualizado com sucesso!");
    
    }

    async function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0]

            if(image.type === "image/jpeg" || image.type === "image/png" || image.type === "image/webp"){
                await handleUpload(image);
            }else{
                alert("Enviar apenas imagem do tipo png ou jpeg");
                return;
            }
        }
    }

    async function handleUpload(image: File){
        if(!profile?.id){
            return;
        }

        const extension = image.name.split(".").pop();
        const userId = profile?.id;
        const imageId = `${uuidV4()}.${extension}`;
        const filePath = `${userId}/${imageId}`;

        // Upload para o Supabase Storage
        const { error } = await supabase.storage
            .from("car-images")
            .upload(filePath, image, {
                cacheControl: "3600",
                upsert: false
            });

        if (error) {
            alert("Erro ao fazer upload da imagem");
            console.error(error);
            return;
        }

        // Pegar URL pública
        const { data } = supabase.storage
            .from("car-images")
            .getPublicUrl(filePath);

        const newImage: ImageProps = {
            id: imageId,
            name: image.name,
            previewUrl: URL.createObjectURL(image),
            url: data.publicUrl,
            path: filePath
        };

        setImages(prev => [...prev, newImage]);

    }

    async function handleDelete(image: ImageProps){
        const { error } = await supabase.storage
        .from("car-images")
        .remove([image.path]);

        if (error) {
            console.error("Erro ao deletar imagem:", error.message);
            return;
        }

        setImages((prev) => prev.filter(img => img.id !== image.id));
    }

    return(
        <Container>
            <PanelHeader/>
            <div className="bg-white rounded-lg p-3 flex flex-col sm:flex-row items-center gap-2">
                <button className="border-2 w-48 rounded-lg flex flex-col items-center justify-center cursor-pointer overflow-hidden h-48">
                    <div className="absolute cursor-pointer">
                        <FiUpload size={30} color="000" className="cursor-pointer"/>
                    </div>
                    <div className="cursor-pointer h-48">
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="opacity-0 cursor-pointer h-48"
                            onChange={handleFile}
                        />
                    </div>
                </button>

                <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.length > 0 && (
                        images.map((img) => (
                            <div key={img.id} className="relative group">
                                <button 
                                    className="
                                    absolute
                                    top-1/2 left-1/2
                                    -translate-x-1/2 -translate-y-1/2
                                    opacity-0
                                    group-hover:opacity-100
                                    transition-opacity
                                    bg-red-600 text-white
                                    rounded-full
                                    p-2
                                    cursor-pointer
                                    z-10000
                                    "
                                    onClick={() => handleDelete(img)}
                                >
                                    <FiTrash size={28} color="#fff"/>
                                </button>
                                <img src={img.previewUrl} alt={img.name} className="rounded-lg w-full h-48 object-cover group-hover:brightness-50"/>
                            </div>
                        ))
                    )}
                </div>
                
            </div>

            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2 mb-10">
                <form
                    className="w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="mb-3">
                        <p className="font-bold">Nome do veículo:</p>
                        <Input
                            name="name"
                            type="text"
                            placeholder="Digite o nome do veículo..."
                            error={errors.name?.message}
                            register={register}
                        />
                    </div>

                    <div className="mb-3">
                        <p className="font-bold">Modelo do veículo:</p>
                        <Input
                            name="model"
                            type="text"
                            placeholder="Ex: Golf 1.6 flex sport..."
                            error={errors.model?.message}
                            register={register}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:gap-5 w-full ">
                        <div className="mb-3 w-full">
                            <p className="font-bold">Ano do veículo:</p>
                            <Input
                                name="year"
                                type="text"
                                placeholder="Ex: 2016/2016..."
                                error={errors.year?.message}
                                register={register}
                            />
                        </div>
                        <div className="mb-3 w-full">
                            <p className="font-bold">Km rodados:</p>
                            <Input
                                name="km"
                                type="text"
                                placeholder="Ex: 10.000..."
                                error={errors.km?.message}
                                register={register}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <p className="font-bold">Valor em R$:</p>
                        <Input
                            name="price"
                            type="text"
                            placeholder="Ex: 30.0000..."
                            error={errors.price?.message}
                            register={register}
                        />
                    </div>

                    <div className="mb-3">
                        <p className="font-bold">Cidade do veículo:</p>
                        <Input
                            name="city"
                            type="text"
                            placeholder="Ex: Uberlândia-MG..."
                            error={errors.city?.message}
                            register={register}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:gap-5 w-full ">
                        <div className="mb-3 w-full">
                            <p className="font-bold">Cor do veículo:</p>
                            <Input
                                name="color"
                                type="text"
                                placeholder="Ex: Branco..."
                                error={errors.color?.message}
                                register={register}
                            />
                        </div>
                        <div className="mb-3 w-full">
                            <p className="font-bold">Whatsapp:</p>
                            <Input
                                name="whatsapp"
                                type="text"
                                placeholder="Ex: 3812121212..."
                                error={errors.whatsapp?.message}
                                register={register}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <p className="font-bold">Descrição:</p>
                        <textarea
                            className="border w-full rounded-md h-24 px-2 outline-0 border-gray-400"
                            id="description"
                            {...register("description")}
                            placeholder="Digite a descrição do carro..."
                        />
                        {errors.description && <p className="text-red-600">{errors.description?.message}</p> }
                    </div>

                    <button 
                        type="submit"
                        className="w-full rounded-lg font-bold text-white bg-zinc-800 h-10 cursor-pointer hover:bg-zinc-600 transition-all"
                    >
                        Atualizar Anúncio
                    </button>
                </form>
            </div>
        </Container>
    )
}