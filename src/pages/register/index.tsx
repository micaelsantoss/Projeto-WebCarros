import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../components/container";
import { Input } from "../../components/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../../services/supabaseConnection";
import { useEffect } from "react";

const schema = z.object({
    name: z.string().nonempty("O campo nome é obrigatório.").min(10, "Digite um nome com pelo menos 10 caracteres"),
    email: z.string().email("Insira um email válido").nonempty("O campo email é obrigatório."),
    password: z.string().nonempty("O campo senha obrigatória.").min(12, "Digite uma senha com pelo menos 12 caracteres")
})

type FormData = z.infer<typeof schema>

export function Register(){
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    });
    const navigate = useNavigate();

    useEffect(() => {
        async function logOut(){
            await supabase.auth.signOut();
        }

        logOut();
    }, []);

    async function onSubmit(data: FormData){
        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    name: data.name,
                }
            }
        });

        if (error) {
            alert(error.message);
            return;
        }

        alert("Conta criada!");
        navigate("/dashboard");
    }

    return(
        <Container>
            <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
                <Link to={"/"} className="mb-6 max-w-sm w-full">
                    <img 
                        src="/logo.svg" 
                        alt="Logo do site" 
                        className="w-full max-w-72 md:max-w-xl lg:max-w-full m-auto "
                    />
                </Link>
                <form 
                    className="max-w-xl w-full rounded-lg px-10 py-5 flex flex-col gap-2"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        name="name"
                        type="text"
                        placeholder="Digite seu nome completo..."
                        error={errors.name?.message}
                        register={register}
                    />
                    <Input
                        name="email"
                        type="text"
                        placeholder="Digite seu email..."
                        error={errors.email?.message}
                        register={register}
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Digite sua senha..."
                        error={errors.password?.message}
                        register={register}
                    />

                    <button className="bg-red-800 py-1.5 rounded-md text-white font-bold cursor-pointer hover:bg-red-600">
                        Registrar
                    </button>

                    <p className="text-center mt-3">Já tem cadastro? <Link to={"/login"} className="text-red-500">Faça login</Link></p>
                </form>
                
            </div>
        </Container>
        
    )
}