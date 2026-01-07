import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../components/container";
import { Input } from "../../components/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../../services/supabaseConnection";
import { useEffect } from "react";

const schema = z.object({
    email: z.string().email("Insira um email válido").nonempty("O campo é obrigatório."),
    password: z.string().nonempty("O campo senha obrigatória.")
})

type FormData = z.infer<typeof schema>

export function Login(){
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
        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password
        }); 

        if(error){
            alert("Email ou senha inválidos");
            return;
        }

        alert("Logado com sucesso!");
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
                        name="email"
                        type="text"
                        placeholder="Digite seu Email..."
                        error={errors.email?.message}
                        register={register}
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Digite sua Senha..."
                        error={errors.password?.message}
                        register={register}
                    />

                    <button className="bg-red-800 py-1.5 rounded-md text-white font-bold cursor-pointer hover:bg-red-600">
                        Entrar
                    </button>

                    <p className="text-center mt-3">Ainda não tem cadastro? <Link to={"/register"} className="text-red-500">Registre-se</Link></p>
                </form>
                
            </div>
        </Container>
        
    )
}