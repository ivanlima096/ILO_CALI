import React, { useState, useEffect } from "react";

export default function Modal({ isModalOpen, setIsModalOpen, workoutName, exercises }) {
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentRound, setCurrentRound] = useState(1); // Contador de rounds
  const [elapsedTime, setElapsedTime] = useState(0);
  const [exerciseTime, setExerciseTime] = useState(120); // Tempo padrão de 120 segundos

  const startWorkout = () => {
    setIsWorkoutStarted(true);
    setCurrentExerciseIndex(0);
    setCurrentRound(1);
    setElapsedTime(0);
    setExerciseTime(exercises[0]?.duration || 120); // Definir tempo com base no primeiro exercício
  };

  const finishWorkout = () => {
    setIsWorkoutStarted(false);
    setCurrentExerciseIndex(0);
    setCurrentRound(1);
    setElapsedTime(0);
    setExerciseTime(0);
  };

  useEffect(() => {
    let interval;

    if (isWorkoutStarted) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);

        if (exerciseTime > 0) {
          setExerciseTime((prevExerciseTime) => prevExerciseTime - 1);
        } else {
          // Quando o tempo do exercício atual acabar, verificar se há mais rounds para o exercício
          if (currentRound < currentExercise.rounds) {
            // Se houver mais rounds, resetar o tempo para o valor do próximo round
            setExerciseTime(exercises[currentExerciseIndex]?.duration || 120);
            setCurrentRound((prevRound) => prevRound + 1);
          } else if (currentExerciseIndex < exercises.length - 1) {
            // Se não houver mais rounds para este exercício, avançar para o próximo exercício
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setCurrentRound(1);
            setExerciseTime(exercises[currentExerciseIndex + 1]?.duration || 120); // Definir o tempo com base no próximo exercício
          } else {
            // Se não houver mais exercícios, finalizar o treino
            finishWorkout();
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isWorkoutStarted, exerciseTime, currentExerciseIndex, exercises, currentRound]);

  const currentExercise = exercises[currentExerciseIndex];

  return isModalOpen ? (
    <div className="z-10 fixed top-0 left-0 w-[100vw] h-screen flex items-center justify-center bg-[#000000d9]" onClick={() => setIsModalOpen(false)}>
      <div className="modalBg p-2 bg-black w-[80%] sm:w-[60%] h-[80%] rounded-3xl flex flex-col items-center  border-2 border-[#FFB703] absolute" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-4xl mb-2">{workoutName}</h1>

        {isWorkoutStarted ? (
          <div className="w-[100%] flex flex-col items-center">
            <div className="text-2xl mb-4">
              Exercício {currentExerciseIndex + 1} de {exercises.length}
            </div>

            <div className="flex flex-col w-[100%] gap-5 items-center h-[30rem] sm:h-[44rem]">
              <img src={currentExercise.img} alt="exercise-img" className="w-[90%] object-cover aspect-auto rounded-xl" />
              <div className="flex flex-col items-center justify-center">
                <p className="text-3xl min-[375px]:text-4xl text-center">{currentExercise.name}</p>
                <p className="text-xl min-[375px]:text-2xl text-center">Rounds: {currentRound} de {currentExercise.rounds}</p>
                <p className="mb-10 text-xl min-[375px]:text-2xl text-center">Reps: {currentExercise.reps}</p>
                <p className="flex justify-center items-center bg-[#FFB703] w-16 h-16 rounded-[50%] text-[#121212] text-4xl p-12">{exerciseTime}</p>
              </div>
              <button
                onClick={() => {
                  // Quando o tempo do exercício atual acabar, verificar se há mais rounds para o exercício
                  if (currentRound < currentExercise.rounds) {
                    // Se houver mais rounds, resetar o tempo para o valor do próximo round
                    setExerciseTime(exercises[currentExerciseIndex]?.duration || 120);
                    setCurrentRound((prevRound) => prevRound + 1);
                  } else if (currentExerciseIndex < exercises.length - 1) {
                    // Se não houver mais rounds para este exercício, avançar para o próximo exercício
                    setCurrentExerciseIndex(currentExerciseIndex + 1);
                    setCurrentRound(1);
                    setExerciseTime(exercises[currentExerciseIndex + 1]?.duration || 120); // Definir o tempo com base no próximo exercício
                  } else {
                    // Se não houver mais exercícios, finalizar o treino
                    finishWorkout();
                  }
                }}
                className="m-3 text-[1.6rem] sm:text-[2.2rem] sm:w-[22rem] bg-[#FFB703] hover:bg-transparent text-[#121212] hover:text-[#FFB703] border-2 border-transparent hover:border-[#FFB703] duration-300 ease font-semibold px-6 py-[0.1rem] rounded absolute bottom-0">
                {currentRound < currentExercise.rounds ? "Próximo Round" : (currentExerciseIndex < exercises.length - 1 ? "Próximo Exercício" : "Finalizar Treino")}
              </button>
            </div>
          </div>
        ) : (
          exercises.map((exercise, index) => (
            <div key={index} className="flex m-2 w-[100%] gap-5">
              <img src={exercise.img} alt="exercise-img" className="w-28 sm:w-40 object-cover aspect-auto rounded-xl" />
              <div>
                <p className="text-xl min-[375px]:text-2xl">{exercise.name}</p>
                <p>Rounds: {exercise.rounds}</p>
                <p>Reps: {exercise.reps}</p>
              </div>
            </div>
          ))
        )}

        {!isWorkoutStarted && (
          <button
            onClick={startWorkout}
            className="m-3 text-[1.6rem] sm:text-[2.2rem] sm:w-[22rem] bg-[#FFB703] hover:bg-transparent text-[#121212] hover:text-[#FFB703] border-2 border-transparent hover:border-[#FFB703] duration-300 ease font-semibold px-6 py-[0.1rem] rounded absolute bottom-0">
            Iniciar Treino
          </button>
        )}
      </div>
    </div>
  ) : null;
}
