import pushup from "../assets/pushup.jpg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ImCalendar } from "react-icons/im";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";

export default function Training() {
  const [storedWorkouts, setStoredWorkouts] = useState([])
  const [modalStates, setModalStates] = useState([])
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(null)


  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem("savedWorkouts")) || []
    setStoredWorkouts(savedWorkouts)
    setModalStates(savedWorkouts.map(() => false))
  }, [])

  function getTopMuscleGroups(exercises) {
    const muscleGroupsCount = {};

    exercises.forEach((exercise) => {
      exercise.muscleGroup.forEach((group) => {
        muscleGroupsCount[group] = (muscleGroupsCount[group] || 0) + 1;
      });
    });

    const sortedMuscleGroups = Object.entries(muscleGroupsCount).sort((a, b) => b[1] - a[1]);

    const topMuscleGroups = sortedMuscleGroups.slice(0, 3).map((entry) => entry[0]);

    return topMuscleGroups;
  }

  const handleModal = (index) => {
    setSelectedWorkoutIndex(index)
    const newModalStates = modalStates.map((state, i) => (i === index ? !state : state))
    setModalStates(newModalStates)
  }

  const handleMuscleGroup = () => {
    console.log("recebido");
  }

  if (storedWorkouts.length === 0) {
    return (
      <div className="text-2xl p-6 flex flex-col items-center w-full min-h-[90vh]">Parece que não há nenhum treino disponível ainda. Acesse exercícios para montar um treino personalizado!</div>
    )
  }

  return (
    <div className="p-3 flex flex-col items-center w-full min-h-[90vh]">
      <div className="flex flex-wrap gap-4 m-3">
        <div
          className="sm:text-2xl hover:bg-transparent hover:text-[#FFB703] bg-[#FFB703] duration-300 ease
          text-[#121212] rounded-3xl w-[3.5rem] border-2 border-[#FFB703] sm:w-[6rem] px-1 py-[0.15rem] flex items-center justify-center cursor-pointer"
        >
          FAVORITOS
        </div>
      </div>

      <div className="my-4 px-3 flex flex-wrap gap-4 md:gap-4 lg:gap-8 w-full justify-center items-center">
        {storedWorkouts.map((workout, index) => {
          const topMuscleGroups = getTopMuscleGroups(workout.exercises)
          return (
            <div key={index} className="card-img w-[26rem] sm:w-[22rem] lg:w-[26rem] rounded-3xl relative flex">
              <img src={pushup} alt="workout-cover" className="rounded-2xl cursor-pointer" onClick={() => handleModal(index)} />
              <span className="absolute bg-black rounded-b-2xl w-full h-[50%] bottom-0 opacity-60"></span>
              <p className="absolute top-[6rem] min-[375px]:top-[7rem] min-[425px]:top-[8rem] sm:top-[7.5rem] lg:top-[9rem] left-3 text-2xl">
                {workout.name}
              </p>
              <p className="absolute top-[7.6rem] min-[375px]:top-[9rem] min-[425px]:top-[10rem] sm:top-[9.5rem] lg:top-[11rem] left-3 text-xl">20Min</p>
              <div className="absolute bottom-1 left-3 text-xl flex gap-3">
                {topMuscleGroups.map((group, index) => (
                  <p
                    key={index}
                    className="text-sm min-[425px]:text-md sm:text-lg bg-[#FFB703] text-[#121212] rounded-3xl w-[2.7rem] min-[425px]:w-[3.5rem] border-2 border-[#FFB703] sm:w-[4rem] px-1 flex items-center justify-center"
                  >
                    {group}
                  </p>
                ))}
              </div>
              <div className="absolute bottom-1 right-4 text-xl flex items-center gap-3">
                <AiOutlineHeart size={33} className="cursor-pointer hover:scale-110 duration-300 ease" />
                <ImCalendar size={28} className="cursor-pointer hover:scale-110 duration-300 ease" />
              </div>
              <Modal
                isModalOpen={modalStates[index]}
                setIsModalOpen={(isOpen) => handleModal(index)}
                workoutName={workout.name}
                exercises={workout.exercises}
              />
            </div>

          )
        })}
      </div>
    </div >
  )
}
