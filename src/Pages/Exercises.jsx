import pushup from "../assets/pushup.jpg"
import inclinePushup from "../assets/inclinePushup.png"
import pullup from "../assets/pullup.png"
import { AiFillPlusSquare } from "react-icons/ai"
import { MdDragIndicator } from "react-icons/md"
import { TbTrash } from "react-icons/tb"
import { useState } from "react"
import { useWorkout } from "../context/WorkoutContext";

export default function Exercises() {
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([])
  const [workoutExercises, setWorkoutExercises] = useState([])
  const [workoutName, setWorkoutName] = useState("");
  const { setWorkout } = useWorkout()

  const exercises = [
    {
      name: "Push Up",
      img: pushup,
      rounds: 4,
      reps: 12,
      duration: false,
      rest: 60,
      muscleGroup: ["Peito", "Triceps", "Ombro"]
    },
    {
      name: "Incline Push Up",
      img: inclinePushup,
      rounds: 4,
      reps: 12,
      duration: false,
      rest: 60,
      muscleGroup: ["Peito", "Triceps", "Ombro"]
    },
    {
      name: "Pull Up",
      img: pullup,
      rounds: 4,
      reps: 8,
      duration: false,
      rest: 90,
      muscleGroup: ["Costas", "Biceps"]
    },
    {
      name: "Marine Pull Up",
      img: pullup,
      rounds: 4,
      reps: 8,
      duration: false,
      rest: 90,
      muscleGroup: ["Costas", "Biceps"]
    },
    {
      name: "Australian Pull Up",
      img: pullup,
      rounds: 4,
      reps: 8,
      duration: false,
      rest: 90,
      muscleGroup: ["Costas", "Biceps"]
    },
    {
      name: "Australian Marine Pull Up",
      img: pullup,
      rounds: 4,
      reps: 8,
      duration: false,
      rest: 5,
      muscleGroup: ["Costas", "Biceps"]
    },
    {
      name: "Bar Hold",
      img: pullup,
      rounds: 2,
      reps: 1,
      duration: 5,
      rest: 90,
      muscleGroup: ["Costas", "Grip"]
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
      )
    } else {
      setSelectedMuscleGroups([...selectedMuscleGroups, group])
    }
  }

  const handleAddExerciseClick = (exercise) => {
    const newExercise = { ...exercise, id: Math.floor(Math.random() * 10000) }

    if (workoutExercises.length === 0 || workoutExercises[workoutExercises.length - 1].name !== exercise.name) {
      const newWorkoutExercises = [...workoutExercises, newExercise];
      setWorkoutExercises(newWorkoutExercises);
    }
  };

  const handleRemoveExerciseClick = (exerciseToRemove) => {
    const newWorkoutExercises = workoutExercises.filter((exercise) => exercise.id !== exerciseToRemove.id);
    setWorkoutExercises(newWorkoutExercises);
  };

  const handleSaveWorkout = () => {
    const newWorkout = {
      name: workoutName,
      exercises: workoutExercises,
    };

    setWorkoutName("")
    setWorkoutExercises([])

    setWorkout(newWorkout)
    const savedWorkouts = JSON.parse(localStorage.getItem("savedWorkouts")) || [];

    savedWorkouts.push(newWorkout);

    localStorage.setItem("savedWorkouts", JSON.stringify(savedWorkouts));
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-100% p-3 mx-auto">
      <div className="w-full mx-auto flex flex-col items-center justify-between">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-2">
          {
            uniqueMuscleGroups.map((group, index) => (
              <div
                key={index}
                className={`select-none text-xl sm:text-2xl hover:bg-transparent hover:text-[#FFB703] hover:border-[#FFB703] bg-${selectedMuscleGroups.includes(group) ? '[#121212]' : '[#FFB703]'} text-${selectedMuscleGroups.includes(group) ? '[#FFB703]' : '[#121212]'}
                 duration-300 ease text-[#121212] rounded-3xl w-[5.5rem] border-2 border-${selectedMuscleGroups.includes(group) ? '[#FFB703]' : 'transparent'} sm:w-[6rem] px-2 py-[0.15rem] flex items-center justify-center cursor-pointer`}
                onClick={() => handleMuscleGroupClick(group)}
              >
                {group}
              </div>
            ))}
        </div>
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise) => (
            <div key={exercise.name} className="py-4 h-full mx-auto my-2 w-[100%] max-w-[40rem]  rounded-3xl flex justify-between items-center border-2 border-[#FFB703]">
              <img src={exercise.img} alt="workout-cover" className="rounded-2xl w-[4rem] aspect-square object-cover sm:w-[12rem] m-2 sm:ml-6 min-[425px]:w-[5.5rem]" />
              <div className="flex flex-col justify-evenly items-start sm:ml-5 w-[50%]">
                <p className="text-lg md:text-2xl ">{exercise.name}</p>
                {exercise.duration !== false ? (
                  <p className="text-md md:text-xl">{exercise.rounds} Séries X {exercise.duration} Seg</p>
                ) : (
                  <p className="text-md md:text-xl">{exercise.rounds} Séries X {exercise.reps} Reps</p>
                )}

                <div className="flex gap-2">
                  {exercise.muscleGroup.map((group, index) => (
                    <div key={index} className="text-sm min-[425px]:text-lg sm:text-lg bg-[#FFB703] text-[#121212] rounded-3xl w-[2.5rem] min-[425px]:w-[3.5rem] border-2 border-[#FFB703] sm:w-[5rem] px-1 flex  items-center justify-center">
                      {group}
                    </div>
                  ))}
                </div>

              </div>
              <button>
                <AiFillPlusSquare
                  size={48}
                  className="border-l-2 p-1 border-[#FFB703] cursor-pointer hover:scale-110 duration-300 ease m-3"
                  onClick={() => handleAddExerciseClick(exercise)}
                />
              </button>

            </div>
          ))
        ) : (
          exercises.map((exercise) => (
            <div key={exercise.name} className="py-4 h-full mx-auto my-2 w-[100%] max-w-[40rem] rounded-3xl flex justify-between items-center border-2 border-[#FFB703]">
              <img src={exercise.img} alt="workout-cover" className="rounded-2xl w-[4rem] aspect-square object-cover sm:w-[12rem] m-2 sm:ml-6 min-[425px]:w-[5.5rem]" />
              <div className="flex flex-col justify-evenly items-start sm:ml-5 w-[50%]">
                <p className="text-lg md:text-2xl ">{exercise.name}</p>
                {exercise.duration !== false ? (
                  <p className="text-md md:text-xl">{exercise.rounds} Séries X {exercise.duration} Seg</p>
                ) : (
                  <p className="text-md md:text-xl">{exercise.rounds} Séries X {exercise.reps} Reps</p>
                )}
                <div className="flex gap-2">
                  {exercise.muscleGroup.map((group, index) => (
                    <div key={index} className="text-sm min-[425px]:text-lg sm:text-lg bg-[#FFB703] text-[#121212] rounded-3xl w-[2.5rem] min-[425px]:w-[3.5rem] border-2 border-[#FFB703] sm:w-[5rem] px-1 flex  items-center justify-center">
                      {group}
                    </div>
                  ))}
                </div>

              </div>

              <button>

                <AiFillPlusSquare
                  size={48}
                  className="border-l-2 p-1 border-[#FFB703] cursor-pointer hover:scale-110 duration-300 ease m-3"
                  onClick={() => handleAddExerciseClick(exercise)}
                />
              </button>
            </div>
          )))}

        < button className="m-6 text-[1.3rem] min-[400px]:text-[1.6rem] sm:text-[2.2rem] sm:w-[22rem] bg-[#FFB703] hover:bg-transparent text-[#121212] hover:text-[#FFB703] border-2 border-transparent hover:border-[#FFB703] duration-300 ease font-semibold px-6 py-[0.1rem] rounded" >
          Cadastrar um Exercicio
        </button>
      </div>

      {/* SEGUNDA COLUNA */}
      <div>
        <div className="w-full h-full border-2 rounded-xl border-[#FFB703] flex flex-col items-center justify-between">
          <div className="flex flex-col items-center">

            <h1 className="mt-3 text-[3rem] lg:text-[5.2rem]">Monte Seu Treino</h1>
            <h4 className="text-[1.4rem] lg:text-[2.2rem]">Adicione seus Exercícios Aqui</h4>
            <input
              type="text"
              placeholder="Dê um nome ao seu treino.."
              className="bg-transparent opacity-100 text-[#FFB703] placeholder:text-[#FFB703] placeholder:opacity-50 border-b-2 border-[#FFB703] text-[1.2rem] lg:text-[1.8rem]"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
            />
          </div>

          <div className="mt-4 flex flex-col justify-start h-[90%] gap-2 w-[95%] sm:w-[70%]">

            {workoutExercises.map((workoutExercise) => (

              <div key={workoutExercise.id} className="mt-2 w-[100%] max-w-[40rem] rounded-3xl flex  items-center border-2 border-[#FFB703]">
                <img src={workoutExercise.img} alt="workout-cover" className="rounded-2xl w-[4rem] min-[375px]:w-[6rem] sm:w-[7rem] lg:w-[10rem]  m-2 object-cover" />
                <div className="flex justify-between items-center w-full">

                  <div className="flex flex-col justify-evenly">

                    <p className="text-lg md:text-2xl ">{workoutExercise.name}</p>
                    <p className="text-md md:text-xl">
                      <input
                        className="bg-transparent border-b-4 border-[#FFB703] w-10"
                        type="number"
                        value={workoutExercise.rounds}
                        onChange={(e) => {
                          const newRounds = parseInt(e.target.value, 10)
                          if (!isNaN(newRounds)) {
                            workoutExercise.rounds = newRounds
                            setWorkoutExercises([...workoutExercises]);
                          }
                        }}
                      />
                      Séries x
                      {workoutExercise.duration !== false ? (
                        <input
                          className="ml-1 bg-transparent border-b-4 border-[#FFB703] w-10"
                          type="number"
                          value={workoutExercise.duration}
                          onChange={(e) => {
                            const newDuration = parseInt(e.target.value, 10)
                            if (!isNaN(newDuration)) {
                              workoutExercise.duration = newDuration
                              setWorkoutExercises([...workoutExercises]);
                            }
                          }}
                        />

                      ) : (
                        <input
                          className="ml-1 bg-transparent border-b-4 border-[#FFB703] w-10"
                          type="number"
                          value={workoutExercise.reps}
                          onChange={(e) => {
                            const newReps = parseInt(e.target.value, 10)
                            if (!isNaN(newReps)) {
                              workoutExercise.reps = newReps
                              setWorkoutExercises([...workoutExercises]);
                            }
                          }}
                        />
                      )}

                      {workoutExercise.duration !== false ? "Segs" : "Reps"}</p>

                  </div>
                  <TbTrash size={30}
                    className="cursor-pointer hover:scale-110 duration-300 ease"
                    onClick={() => handleRemoveExerciseClick(workoutExercise)}
                  />
                </div>
                <MdDragIndicator size={48} className="border-l-2 p-1 border-[#FFB703] cursor-pointer hover:scale-110 duration-300 ease m-3" />
              </div>

            ))}

          </div>
          <button
            style={{
              opacity: !workoutName || workoutExercises.length < 1 ? 0.5 : 1,
            }}
            disabled={!workoutName || workoutExercises.length < 1}
            onClick={handleSaveWorkout}
            className="m-3 text-[1.3rem] min-[400px]:text-[1.6rem] sm:text-[2.2rem] sm:w-[22rem] bg-[#FFB703] hover:bg-transparent text-[#121212] hover:text-[#FFB703] border-2 border-transparent hover:border-[#FFB703] duration-300 ease font-semibold px-6 py-[0.1rem] rounded">
            salvar
          </button>
        </div>
      </div>

    </div>
  )
}