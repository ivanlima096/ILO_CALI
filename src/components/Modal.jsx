import { BsFillPauseCircleFill, BsPlayCircleFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";

export default function Modal({ isModalOpen, setIsModalOpen, workoutName, exercises }) {
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [exerciseTime, setExerciseTime] = useState(exercises[0]?.duration || exercises[0]?.reps * 5);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isPaused, setIsPaused] = useState(false);


  const startWorkout = () => {
    setIsWorkoutStarted(true);
    setCurrentExerciseIndex(0);
    setCurrentRound(1);
    setElapsedTime(0);
    setExerciseTime(exercises[0]?.duration || exercises[0]?.reps * 5);
    setRestTime(0);
    setCountdown(5);
  };

  const finishWorkout = () => {
    setIsWorkoutStarted(false);
    setCurrentExerciseIndex(0);
    setCurrentRound(1);
    setElapsedTime(0);
    setExerciseTime(0);
    setRestTime(0);
    setIsResting(false);
    setCountdown(0);
  };

  useEffect(() => {
    let interval;

    if (isWorkoutStarted && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);

        if (countdown > 0) {
          setCountdown((prevCountdown) => prevCountdown - 1);
        } else if (isResting && restTime > 0) {
          setRestTime((prevRestTime) => prevRestTime - 1);
        } else if (isResting && restTime === 0 && currentRound < currentExercise.rounds) {
          setIsResting(false);
          setCurrentRound((prevRound) => prevRound);
        } else if (isResting && restTime === 0 && currentRound === currentExercise.rounds) {
          setIsResting(false);
        } else if (currentExerciseIndex === exercises.length - 1 && currentRound === currentExercise.rounds && exerciseTime === 0) {
          finishWorkout();
        } else if (currentExerciseIndex !== exercises.length - 1 && currentRound === currentExercise.rounds && exerciseTime === 0) {
          setIsResting(true); // Defina isResting como true após o descanso
          setRestTime(2); // 60 segundos de descanso
          setCurrentExerciseIndex((prevIndex) => prevIndex + 1)
          setCurrentRound((prevRound) => prevRound = 1);
          setExerciseTime(exercises[currentExerciseIndex]?.duration || exercises[0]?.reps * 5);

        }
        else if (exerciseTime > 0) {
          setExerciseTime((prevExerciseTime) => prevExerciseTime - 1);
        } else {
          if (currentRound < currentExercise.rounds) {
            setExerciseTime(exercises[currentExerciseIndex]?.duration || exercises[0]?.reps * 5);
            setCurrentRound((prevRound) => prevRound + 1);
            setRestTime(exercises[currentExerciseIndex]?.rest || 0);
            setIsResting(true);
          } else if (currentExerciseIndex < exercises.length - 1) {
            setCurrentRound(1);
            setExerciseTime(exercises[currentExerciseIndex + 1]?.duration || exercises[0]?.reps * 5);
            setRestTime(0);
            setIsResting(false);
            setCurrentExerciseIndex((prevIndex) => prevIndex + 1)
          } else if (currentExerciseIndex === exercises.length - 1 && currentRound === currentExercise.rounds) {
            finishWorkout();
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isWorkoutStarted, isPaused, exerciseTime, currentExerciseIndex, exercises, currentRound, restTime, isResting, countdown]);

  const currentExercise = exercises[currentExerciseIndex];

  return isModalOpen ? (
    <div className="z-10 fixed top-0 left-0 w-[100vw] h-screen flex items-center justify-center bg-[#000000d9]" onClick={() => setIsModalOpen(false)}>
      <div className="modalBg p-5 bg-black w-[80%] sm:w-[60%] sm:h-[90%] rounded-3xl flex flex-col items-center border-2 border-[#FFB703] absolute" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-4xl mb-8">{workoutName}</h1>

        {isWorkoutStarted ? (
          <>
            {countdown > 0 ? (
              <div className="text-6xl font-bold mb-4 flex flex-col items-center">
                <p>Prepare-se!</p>
                {countdown}
              </div>
            ) : (
              <>
                <div className="text-2xl mb-4">
                  Exercício {currentExerciseIndex + 1} de {exercises.length}
                </div>

                <div className="flex flex-col w-[100%] gap-5 items-center h-[30rem] sm:h-[44rem]">
                  <img src={currentExercise.img} alt="exercise-img" className="w-[90%] sm:w-[80%] lg:w-[60%] xl:w-[45%] 2xl:w-[30%] object-cover aspect-auto rounded-xl" />
                  <div className="flex flex-col items-center justify-center">
                    {!isResting ? (
                      <>
                        <p className="text-3xl min-[375px]:text-4xl text-center">{currentExercise.name}</p>
                        <p className="text-xl min-[375px]:text-2xl text-center">Rounds: {currentRound} de {currentExercise.rounds}</p>
                        <p className="mb-10 sm:mb-1 text-xl min-[375px]:text-2xl text-center">Reps: {currentExercise.reps}</p>
                        <p className="flex justify-center items-center bg-[#FFB703] w-14 h-14 rounded-[50%] text-[#121212] text-3xl p-10">{exerciseTime}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-3xl min-[375px]:text-4xl text-center mb-5">Descanso:</p>
                        <p className="flex justify-center items-center bg-[#FFB703] w-14 h-14 rounded-[50%] text-[#121212] text-3xl p-10">{restTime}</p>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col gap-5 items-center justify-center absolute bottom-5">
                    <button
                      onClick={() => {
                        setIsPaused((prevIsPaused) => !prevIsPaused);
                      }}
                      className="text-[2.3rem] sm:text-[3.2rem] hover:bg-transparent text-[#121212] hover:text-[#FFB703] duration-300 ease font-semibold px-6 py-[0.1rem] rounded">
                      {isPaused ? <BsPlayCircleFill /> : <BsFillPauseCircleFill />}
                    </button>
                    <button
                      onClick={() => {
                        if (isResting) {
                          setIsResting(false);
                          setRestTime(0);
                        } else {
                          if (currentRound < currentExercise.rounds) {
                            setExerciseTime(exercises[currentExerciseIndex]?.duration || exercises[0]?.reps * 5);
                            setCurrentRound((prevRound) => prevRound + 1);
                            setRestTime(exercises[currentExerciseIndex]?.rest || 60);
                            setIsResting(true);
                          } else if (!currentExerciseIndex < exercises.length - 1) {
                            // Verifique se é o último round do último exercício
                            if (currentExerciseIndex !== exercises.length - 1 && currentRound === currentExercise.rounds) {
                              // Adicione o tempo de descanso antes de iniciar o próximo exercício
                              setIsResting(true); // Defina isResting como true após o descanso
                              setRestTime(2); // 60 segundos de descanso
                              setCurrentRound(1);
                              setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
                              setExerciseTime(exercises[currentExerciseIndex]?.duration || exercises[0]?.reps * 5);
                            } else {
                              setCurrentRound(1);
                              setExerciseTime(exercises[currentExerciseIndex + 1]?.duration || exercises[0]?.reps * 5);
                              setRestTime(0);
                              setIsResting(false);
                              setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
                            }
                          } else {
                            finishWorkout();
                          }
                        }
                      }}
                      className="text-[1.6rem] sm:text-[2.2rem] sm:w-[22rem] bg-[#FFB703] hover:bg-transparent text-[#121212] hover:text-[#FFB703] border-2 border-transparent hover:border-[#FFB703] duration-300 ease font-semibold px-6 py-[0.1rem] rounded">
                      {isResting ? "Pular Descanso" : (currentRound < currentExercise.rounds ? "Próximo Round" : (currentExerciseIndex < exercises.length - 1 ? "Próximo Exercício" : "Finalizar Treino"))}
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="overflow-y-auto overflow-x-hidden">
            {exercises.map((exercise, index) => (
              <div key={index} className="flex m-2 w-[100%] gap-5">
                <img src={exercise.img} alt="exercise-img" className="w-28 sm:w-40 xl:w-56  object-cover aspect-auto rounded-xl " />
                <div>
                  <p className="text-xl min-[375px]:text-2xl">{exercise.name}</p>
                  <p>Rounds: {exercise.rounds}</p>
                  <p>Reps: {exercise.reps}</p>
                  {exercise.rest && <p>Descanso: {exercise.rest}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {!isWorkoutStarted && (
          <button
            onClick={startWorkout}
            className="m-3 text-[1.6rem] sm:text-[2.2rem] sm:w-[22rem] bg-[#FFB703] hover:bg-transparent text-[#121212] hover:text-[#FFB703] border-2 border-transparent hover.border-[#FFB703] duration-300 ease font-semibold px-6 py-[0.1rem] rounded absolute bottom-5">
            Iniciar Treino
          </button>
        )}
      </div>
    </div>
  ) : null;
}
