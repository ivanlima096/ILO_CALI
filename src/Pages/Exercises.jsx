import pushup from "../assets/pushup.jpg"
import inclinePushup from "../assets/inclinePushup.png"
import pullup from "../assets/pullup.png"
import { AiFillPlusSquare } from "react-icons/ai"
import { MdDragIndicator } from "react-icons/md"
import { useState } from "react"

export default function Exercises() {
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);

  const exercises = [
    {
      name: "Push Up",
      img: pushup,
      rounds: 4,
      reps: 12,
      muscleGroup: ["Peito", "Triceps", "Ombro"]
    },
    {
      name: "Incline Push Up",
      img: inclinePushup,
      rounds: 4,
      reps: 12,
      muscleGroup: ["Peito", "Triceps", "Ombro"]
    },
    {
      name: "Pull Up",
      img: pullup,
      rounds: 4,
      reps: 8,
      muscleGroup: ["Costas", "Biceps"]
    },

  ]

  const uniqueMuscleGroups = Array.from(
    new Set(exercises.flatMap((exercise) => exercise.muscleGroup))
  )

  const filteredExercises = exercises.filter((exercise) => {

    return exercise.muscleGroup.some((group) =>
      selectedMuscleGroups.includes(group)
    )
  })

  const handleMuscleGroupClick = (group) => {
    if (selectedMuscleGroups.includes(group)) {
      setSelectedMuscleGroups(
        selectedMuscleGroups.filter((selectedGroup) => selectedGroup !== group)
      );
    } else {
      setSelectedMuscleGroups([...selectedMuscleGroups, group]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-100% p-3 mx-auto">
      <div className="w-full mx-auto flex flex-col items-center justify-between">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-2">
          {
            uniqueMuscleGroups.map((group, index) => (
              <div
                key={index}
                className={`text-xl sm:text-2xl hover:bg-transparent hover:text-[#FFB703] bg-${selectedMuscleGroups.includes(group) ? '[#121212]' : '[#FFB703]'} text-${selectedMuscleGroups.includes(group) ? '[#FFB703]' : '[#121212]'}
                 duration-300 ease text-[#121212] rounded-3xl w-[5.5rem] border-2 border-${selectedMuscleGroups.includes(group) ? '[#FFB703]' : 'transparent'} sm:w-[6rem] px-2 py-[0.15rem] flex items-center justify-center cursor-pointer`}
                onClick={() => handleMuscleGroupClick(group)}
              >
                {group}
              </div>
            ))}
        </div>
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise) => (
            <div key={exercise.name} className="mx-auto my-2 card-img w-[95%] max-w-[40rem] rounded-3xl flex justify-between items-center border-2 border-[#FFB703]">
              <img src={exercise.img} alt="workout-cover" className="rounded-2xl w-[6.5rem] sm:w-[12rem] m-2" />
              <div className="flex flex-col justify-evenly">
                <p className="text-lg md:text-2xl ">{exercise.name}</p>
                <p className="text-md md:text-xl">4 Séries X 12 Reps</p>
                <div className="flex gap-2">
                  {exercise.muscleGroup.map((group, index) => (
                    <div className="text-md sm:text-lg bg-[#FFB703] text-[#121212] rounded-3xl w-[4.5rem] border-2 border-[#FFB703] sm:w-[5rem] px-1  py-[0.1rem] flex  items-center justify-center">
                      {group}
                    </div>
                  ))}
                </div>

              </div>
              <AiFillPlusSquare size={48} className="border-l-2 p-1 border-[#FFB703] cursor-pointer hover:scale-110 duration-300 ease m-3" />
            </div>
          ))
        ) : (
          exercises.map((exercise) => (
            <div key={exercise.name} className="mx-auto my-2 card-img w-[95%] max-w-[40rem] rounded-3xl flex justify-between items-center border-2 border-[#FFB703]">
              <img src={exercise.img} alt="workout-cover" className="rounded-2xl w-[6.5rem] sm:w-[12rem] m-2" />
              <div className="flex flex-col justify-evenly">

                <p className="text-lg md:text-2xl ">{exercise.name}</p>
                <p className="text-md md:text-xl">4 Séries X 12 Reps</p>
                <div className="flex gap-2">

                  {exercise.muscleGroup.map((group, index) => (
                    <div className="text-md sm:text-lg bg-[#FFB703] text-[#121212] rounded-3xl w-[4.5rem] border-2 border-[#FFB703] sm:w-[5rem] px-1  py-[0.1rem] flex  items-center justify-center">
                      {group}
                    </div>
                  ))}
                </div>

              </div>
              <AiFillPlusSquare size={48} className="border-l-2 p-1 border-[#FFB703] cursor-pointer hover:scale-110 duration-300 ease m-3" />
            </div>
          )))}

        < button className="m-3 text-[1.3rem] min-[400px]:text-[1.6rem] sm:text-[2.2rem] sm:w-[22rem] bg-[#FFB703] hover:bg-transparent text-[#121212] hover:text-[#FFB703] border-2 border-transparent hover:border-[#FFB703] duration-300 ease font-semibold px-6 py-[0.1rem] rounded" >
          Cadastrar um Exercicio
        </button>
      </div>

      {/* SEGUNDA COLUNA */}
      <div>
        <div className="w-full h-full border-2 rounded-xl border-[#FFB703] flex flex-col items-center justify-between">
          <div className="flex flex-col items-center">

            <h1 className="mt-3 text-[3rem] lg:text-[5.2rem]">Monte Seu Treino</h1>
            <h4 className="text-[1.4rem] lg:text-[2.2rem]">Adicione seus Exercícios Aqui</h4>
            <input type="text" placeholder="Dê um nome ao seu treino.." className="bg-transparent opacity-100 text-[#FFB703] placeholder:text-[#FFB703] placeholder:opacity-50 border-b-2 border-[#FFB703]" />
          </div>

          <div className="mx-auto my-2 card-img w-[95%] max-w-[40rem] rounded-3xl flex justify-between items-center border-2 border-[#FFB703]">
            <img src={pushup} alt="workout-cover" className="rounded-2xl w-[4rem] sm:w-[7rem] aspect-square m-2" />
            <div className="flex flex-col justify-evenly">

              <p className="text-lg md:text-2xl ">TREINO DE PEITO/tríceps</p>
              <p className="text-md md:text-xl">4 Séries X 12 Reps</p>

            </div>
            <MdDragIndicator size={48} className="border-l-2 p-1 border-[#FFB703] cursor-pointer hover:scale-110 duration-300 ease m-3" />
          </div>

          <button className="m-3 text-[1.3rem] min-[400px]:text-[1.6rem] sm:text-[2.2rem] sm:w-[22rem] bg-[#FFB703] hover:bg-transparent text-[#121212] hover:text-[#FFB703] border-2 border-transparent hover:border-[#FFB703] duration-300 ease font-semibold px-6 py-[0.1rem] rounded">
            salvar
          </button>
        </div>
      </div>

    </div>
  )
}