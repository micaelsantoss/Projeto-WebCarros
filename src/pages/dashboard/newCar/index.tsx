import { FiUpload } from "react-icons/fi";
import { Container } from "../../../components/container";
import { PanelHeader } from "../../../components/panelHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "../../../components/input";

const schema = z.object({
    name: z.string().nonempty("O nome é veículo obrigatório"),
    model: z.string().nonempty("O modelo do veículo é obrigatório"),
    year: z.string().nonempty("O ano do veículo é obrigatório"),
    km: z.string().nonempty("A quilômetragem veículo é obrigatória"),
    price: z.string().nonempty("O preço do veículo é obrigatório"),
    city: z.string().nonempty("A cidade do veículo é obrigatória"),
    description: z.string().nonempty("A descrição é obrigatória"),
    whatsapp: z.string().nonempty("O campo nome é obrigatório").min(1, "O telefone para contato é obrigatório").refine((value) => /^(\d{10, 11})$/.test(value), {
        message: "Número de telefone inválido."
    }),
})

type FormData = z.infer<typeof schema>

export function NewCar(){
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    function onSubmit(){

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
                        <input type="file" accept="image/*" className="opacity-0 cursor-pointer h-48"/>
                    </div>
                </button>
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
                            placeholder="Digite o modelo do veículo..."
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
                                placeholder="Digite o ano do veículo..."
                                error={errors.year?.message}
                                register={register}
                            />
                        </div>
                        <div className="mb-3 w-full">
                            <p className="font-bold">Km rodados:</p>
                            <Input
                                name="km"
                                type="text"
                                placeholder="Digite a quilômetragem do veículo..."
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
                            placeholder="Digite o valor do veículo..."
                            error={errors.price?.message}
                            register={register}
                        />
                    </div>

                    <div className="mb-3">
                        <p className="font-bold">Cidade do veículo:</p>
                        <Input
                            name="city"
                            type="text"
                            placeholder="Digite a cidade do veículo..."
                            error={errors.city?.message}
                            register={register}
                        />
                    </div>

                    <div className="mb-3">
                        <p className="font-bold">Whatsapp:</p>
                        <Input
                            name="whatsapp"
                            type="text"
                            placeholder="Digite seu número de telefone..."
                            error={errors.whatsapp?.message}
                            register={register}
                        />
                    </div>

                    <div className="mb-3">
                        <p className="font-bold">Descrição:</p>
                        <Input
                            name="description"
                            type="text"
                            placeholder="Digite a descrição..."
                            error={errors.description?.message}
                            register={register}
                        />
                    </div>
                </form>
            </div>
        </Container>
    )
}