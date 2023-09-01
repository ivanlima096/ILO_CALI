export default function Modal({ isModalOpen, setIsModalOpen, workoutName, exercises }) {
  return (
    isModalOpen &&
    <div className="z-10 fixed top-0 left-0 w-[100vw] h-screen flex items-center justify-center bg-[#000000d9] duration-900 ease" onClick={() => setIsModalOpen(false)}>

      < div className="p-5 bg-black w-[60%] h-[80%] rounded-3xl " onClick={(e) => e.stopPropagation()}>
        {workoutName}
        <ul>
          {exercises.map((exercise, index) => (
            <li key={index}>{exercise.name}</li>

          ))}
        </ul>
      </div >
    </div >

  )
}