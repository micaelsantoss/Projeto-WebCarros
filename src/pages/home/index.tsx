import { Container } from "../../components/container";

export function Home(){
    return(
        <Container>
            <div className="bg-white w-full max-w-3xl p-4 rounded-lg mx-auto flex justify-center items-center gap-4">
                <input 
                    className="bg-white rounded px-2 py-1 outline-0 border border-zinc-400 w-full max-w-xl"
                    type="text" 
                    placeholder="Digite o nome do carro..."
                />
                <button className="bg-red-600 px-4 rounded py-1 font-semibold text-white hover:bg-red-900 cursor-pointer">
                    Buscar
                </button>
            </div>

            <h1 className="text-center text-2xl font-bold mt-4 mb-5 lg:text-4xl">Carros novos e usados em todo o Brasil</h1>

            <main className="w-full max-w-[300px] md:max-w-2xl lg:max-w-5xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <section className="w-full bg-white rounded-lg hover:scale-105 transition-all">
                    <img 
                        src="https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/12/BMW-320i-made-in-Brazil.jpg?w=1200&h=900&crop=1" 
                        alt="Imagem do carro" 
                        className="w-full rounded-lg mb-2 max-h-72"
                    />
                    <p className="font-bold mt-1 mb-2 px-2">BMW 320i</p>

                    <div className="flex flex-col px-2">
                        <span className="text-zinc-700 mb-6">Ano 2016/2016 | 23.000 km</span>
                        <strong className="text-black font-medium text-xl">R$ 190.000</strong>
                    </div>

                    <div className="w-full h-px bg-slate-300 my-2"></div>

                    <div className="px-2 pb-2">
                        <span className="text-zinc-700">
                            Uberlândia - MG
                        </span>
                    </div>
                </section>
                
            </main>
        </Container>
    )
}