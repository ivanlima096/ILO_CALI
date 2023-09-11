import { useExercises } from "../context/ExercisesContext";
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ExerciseForm({ exerciseToUpdate }) {

  const defaultExercise = {
    id: Math.floor(Math.random() * 1000000),
    name: "",
    img: "",
    rounds: 3,
    reps: 12,
    duration: false,
    rest: 60,
    muscleGroup: []
  }

  const { setExercises } = useExercises();
  const [exercises, setLocalExercises] = useState(exerciseToUpdate ? exerciseToUpdate : defaultExercise)
  const navigate = useNavigate()

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    if (name === "muscleGroup") {
      const muscleGroupsArray = value
        .split(",")
        .map((group) => group.trim().toLowerCase());

      setLocalExercises((currentState) => ({
        ...currentState,
        [name]: muscleGroupsArray,
      }));
    } else {
      setLocalExercises((currentState) => ({
        ...currentState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const savedExercises = JSON.parse(localStorage.getItem("savedExercises")) || [];

    if (exerciseToUpdate) {
      const updatedExercises = savedExercises.map((exercise) => {
        if (exercise.id === exerciseToUpdate.id) {
          return { ...exercise, ...exercises }
        } else {
          return exercise
        }
      })
      localStorage.setItem("savedExercises", JSON.stringify(updatedExercises));
      setExercises(updatedExercises);
    } else {
      savedExercises.push(exercises);
      localStorage.setItem("savedExercises", JSON.stringify(savedExercises));
      setExercises(savedExercises);
    }
    navigate("/exercises")

  }

  return (
    <main className="container mx-auto mt-3 h-[80vh] ">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-[#000] shadow-lg rounded-2xl text-[#FFB703]">
        <div className="mb-4 ">
          <label htmlFor="name" className="block text-[#FFB703]">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Push up"
            required
            className="w-full px-4 py-2 border border-transparent rounded focus:outline-none focus:border-[#FFB703] bg-[#121212]"
            value={exercises.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="img" className="block ">Link do Exercício</label>
          <input
            type="url"
            name="img"
            placeholder="https://images.pexels.com/photos/18112398/pexels-photo-18112398/free-photo-of-atleta-esportista-jogador-preto-e-branco.jpeg?auto=compress&cs=tinysrgb&w=1600"
            id="img"
            required
            className="w-full px-4 py-2 border border-transparent rounded focus:outline-none focus:border-[#FFB703]  bg-[#121212]"
            value={exercises.img}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rounds" className="block ">Rounds</label>
          <input
            type="number"
            name="rounds"
            id="rounds"
            required
            min="0"
            step="1"
            className="w-full px-4 py-2 border border-transparent rounded focus:outline-none focus:border-[#FFB703] bg-[#121212]"
            value={exercises.rounds}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reps" className="block ">Repetições</label>
          <input
            type="number"
            name="reps"
            id="reps"
            required
            min="0"
            step="1"
            className="w-full px-4 py-2 border border-transparent rounded focus:outline-none focus:border-[#FFB703] bg-[#121212]"
            value={exercises.reps}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block ">Duração (Deixar em Branco caso não se encaixe)</label>
          <input
            type="number"
            name="duration"
            id="duration"
            min="0"
            step="1"
            className="w-full px-4 py-2 border border-transparent rounded focus:outline-none focus:border-[#FFB703] bg-[#121212]"
            value={exercises.duration}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rest" className="block ">Tempo de Descanso</label>
          <input
            type="number"
            name="rest"
            id="rest"
            required
            min="0"
            step="1"
            className="w-full px-4 py-2 border border-transparent rounded focus:outline-none focus:border-[#FFB703] bg-[#121212]"
            value={exercises.rest}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4 ">
          <label htmlFor="muscleGroup" className="block text-[#FFB703]">Grupos Musculares Treinados</label>
          <input
            type="text"
            name="muscleGroup"
            id="muscleGroup"
            required
            placeholder="Peito, Tríceps, Ombro"
            className="w-full px-4 py-2 border border-transparent rounded focus:outline-none focus:border-[#FFB703] bg-[#121212]"
            value={exercises.muscleGroup}
            onChange={handleChange}
          />
        </div>
        <div className="text-center">
          <button
            id="button"
            type="submit"
            className="m-6 text-[1.3rem] min-[400px]:text-[1.6rem] sm:text-[2.2rem] sm:w-[22rem] bg-[#FFB703] hover:bg-transparent text-[#121212] hover:text-[#FFB703] border-2 border-transparent hover:border-[#FFB703] duration-300 ease font-semibold px-6 py-[0.1rem] rounded"
          >
            Salvar
          </button>
        </div>
      </form>
    </main>
  )
}