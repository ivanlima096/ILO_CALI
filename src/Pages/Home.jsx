import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home max-w-[100vw] min-h-[95vh] relative flex justify-center">
      <div className="flex  flex-col items-center p-5">
        <h1 className="text-[4rem] min-[400px]:text-[5rem] sm:text-[8.5rem] font-bold my-4 sm:my-0">
          Bem-vindo ao ilo cali
        </h1>
        <h2 className="text-[2rem] min-[400px]:text-[2.5rem] md:text-[3.5rem] font-bold my-4">
          SEU SITE PARA TREINAR CALISTENIA
        </h2>
        <h2 className="text-[1rem] min-[400px]:text-[1.25rem] md:text-[1.75rem] font-bold my-8">
          Faça login para salvar seus treinos favoritos, gerenciar seus treinos, suas receitas e histórico de treinos.
        </h2>
        <div className="flex justify-evenly w-[100%] mt-20 sm:mt-14">
          <Link to="/training"><button className="text-[1rem] min-[400px]:text-[1.6rem] sm:text-[2.5rem] w-[5rem] sm:w-[11rem] bg-[#FFB703] hover:bg-transparent text-[#121212] hover:text-[#FFB703] border-2 border-transparent hover:border-[#FFB703] duration-300 ease font-semibold px-4 py-2 rounded">
            treinar
          </button></Link>
          <Link to="/training"> <button className="text-[1rem] min-[400px]:text-[1.6rem] sm:text-[2.5rem]  w-[5rem] sm:w-[11rem] bg-[#FFB703] hover:bg-transparent text-[#121212] hover:text-[#FFB703] border-2 border-transparent hover:border-[#FFB703] duration-300 ease font-semibold px-4 py-2 rounded">
            login
          </button></Link>

        </div>
      </div>
    </div>
  );
}
