import pushup from "../assets/pushup.jpg"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { ImCalendar } from "react-icons/im"
import { useWorkout } from "../context/WorkoutContext"

export default function Training() {
  const { workout } = useWorkout()
  console.log(workout);

  if (!workout) {
    return <div>Parece que não há nenhum treino disponível ainda. Acesse exercícios para montar um treino personalizado!</div>
  }
  return (
    <div className="p-3 flex flex-col items-center w-full">
      <div className="flex flex-wrap gap-4 m-3">
        <div
          className="sm:text-2xl hover:bg-transparent hover:text-[#FFB703]  bg-[#FFB703] duration-300 ease
        text-[#121212] rounded-3xl w-[3.5rem] border-2 border-[#FFB703] sm:w-[6rem] px-1  py-[0.15rem] flex items-center justify-center cursor-pointer"
        >
          FAVORITOS
        </div>

      </div>

      <div className="my-4 px-3 flex flex-wrap gap-4 md:gap-4 lg:gap-8 w-full justify-center items-center">

        <div className="card-img w-[26rem] sm:w-[22rem] lg:w-[26rem] rounded-3xl relative flex ">
          <img src={pushup} alt="workout-cover" className="rounded-2xl " />
          <span className="absolute bg-black rounded-b-2xl w-full h-[50%] bottom-0 opacity-60">
          </span>
          <p className="absolute top-[6rem] min-[375px]:top-[7rem] min-[425px]:top-[8rem] sm:top-[7.5rem] lg:top-[9rem] left-3 text-2xl">{workout.name}</p>

          <p className="absolute top-[7.6rem] min-[375px]:top-[9rem] min-[425px]:top-[10rem] sm:top-[9.5rem]  lg:top-[11rem] left-3 text-xl">20Min</p>
          <div className="absolute bottom-1 left-3 text-xl flex gap-3">
            <p >20Min</p>
            <p >20Min</p>
          </div>
          <div className="absolute bottom-1 right-4 text-xl flex items-center gap-3">
            < AiOutlineHeart size={33} className=" cursor-pointer hover:scale-110 duration-300 ease" />
            < ImCalendar size={28} className=" cursor-pointer hover:scale-110 duration-300 ease" />
          </div>
        </div>

      </div>
    </div >
  )
}