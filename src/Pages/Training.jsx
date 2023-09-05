import { BsPlayCircleFill } from "react-icons/bs";
import pushup from "../assets/pushup.jpg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ImCalendar } from "react-icons/im";
import { TbTrash } from "react-icons/tb";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";

export default function Training() {
  const [storedWorkouts, setStoredWorkouts] = useState([]);
  const [modalStates, setModalStates] = useState([]);
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(null);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);

  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem("savedWorkouts")) || [];
    setStoredWorkouts(savedWorkouts);
    setModalStates(savedWorkouts.map(() => false));
  }, []);

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
    setSelectedWorkoutIndex(index);
    const newModalStates = modalStates.map((state, i) => (i === index ? !state : state));
    setModalStates(newModalStates);
  };

  const handleMuscleGroupClick = (group) => {
    if (selectedMuscleGroups.includes(group)) {
      setSelectedMuscleGroups(
        selectedMuscleGroups.filter((selectedGroup) => selectedGroup !== group)
      );
    } else {
      setSelectedMuscleGroups([...selectedMuscleGroups, group]);
    }
  };

  const uniqueMuscleGroups = Array.from(
    new Set(storedWorkouts.flatMap((workout) => getTopMuscleGroups(workout.exercises)))
  );

  const handleRemoveWorkoutClick = (workoutToRemove) => {
    if (confirm("Deseja realmente excluir esse treino?")) {
      const savedWorkouts = JSON.parse(localStorage.getItem("savedWorkouts")) || [];
      const updatedWorkouts = savedWorkouts.filter((workout) => workout.name !== workoutToRemove.name);
      localStorage.setItem("savedWorkouts", JSON.stringify(updatedWorkouts));

      setStoredWorkouts(updatedWorkouts);
    }
    return;
  };

  return (
    <div className="p-3 flex flex-col items-center w-full min-h-[90vh]">
      <div className="flex flex-wrap gap-3 m-3">
        {uniqueMuscleGroups.map((group, index) => (
          <div
            key={index}
            className={`select-none text-xl sm:text-2xl hover:bg-transparent hover:text-[#FFB703] hover:border-[#FFB703] bg-${selectedMuscleGroups.includes(group) ? "[#121212]" : "[#FFB703]"
              } text-${selectedMuscleGroups.includes(group) ? "[#FFB703]" : "[#121212]"} duration-300 ease text-[#121212] rounded-3xl w-[5.5rem] border-2 border-${selectedMuscleGroups.includes(group) ? "[#FFB703]" : "transparent"
              } sm:w-[6rem] px-2 py-[0.15rem] flex items-center justify-center cursor-pointer`}
            onClick={() => handleMuscleGroupClick(group)}
          >
            {group}
          </div>
        ))}
      </div>

      <div className="my-4 px-3 flex flex-wrap gap-4 md:gap-4 lg:gap-8 w-full justify-center items-center">
        {storedWorkouts.length > 0 ? (
          storedWorkouts.map((workout, index) => {
            const topMuscleGroups = getTopMuscleGroups(workout.exercises);
            const isWorkoutVisible =
              selectedMuscleGroups.length === 0 ||
              selectedMuscleGroups.some((group) => topMuscleGroups.includes(group));

            return isWorkoutVisible ? (
              <div key={index} className="card-img w-[26rem] sm:w-[22rem] lg:w-[26rem] rounded-3xl relative flex duration-200 ease hover:shadow-[0px_4px_rgba(255,183,3,0.8)]">
                <img src={pushup} alt="workout-cover" className="rounded-2xl cursor-pointer" onClick={() => handleModal(index)} />
                < BsPlayCircleFill className="absolute top-[40%] left-[45%] text-4xl cursor-pointer" fill="#FFB703" fillOpacity={.4} />
                <span className="absolute bg-black rounded-b-2xl w-full h-[40%] bottom-0 opacity-60"></span>
                <p className="absolute top-[7rem] min-[375px]:top-[8.3rem] min-[425px]:top-[9.7rem] sm:top-[9rem] lg:top-[11rem] left-3 text-2xl">
                  {workout.name}
                </p>
                <p className="absolute top-[7rem] min-[375px]:top-[8.3rem] min-[425px]:top-[9.7rem] sm:top-[9rem] lg:top-[11rem] right-4 text-xl">
                  <TbTrash
                    className="cursor-pointer hover:scale-110 duration-300 ease text-2xl min-[375px]:text-3xl"
                    onClick={() => handleRemoveWorkoutClick(workout)}
                  />
                </p>
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
                  <AiOutlineHeart className="cursor-pointer hover:scale-110 duration-300 ease text-2xl min-[375px]:text-3xl" />
                  <ImCalendar className="cursor-pointer hover:scale-110 duration-300 ease text-2xl min-[375px]:text-3xl" />
                </div>
                <Modal
                  isModalOpen={modalStates[index]}
                  setIsModalOpen={(isOpen) => handleModal(index)}
                  workoutName={workout.name}
                  exercises={workout.exercises}
                />
              </div>
            ) : null;
          })
        ) : (
          <div className="text-2xl p-6 flex flex-col items-center w-full min-h-[90vh]">
            Parece que não há nenhum treino disponível ainda. Acesse exercícios para montar um treino personalizado!
          </div>
        )}
      </div>
    </div>
  );
}
