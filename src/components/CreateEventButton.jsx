// import React from 'react'

import { useContext } from "react"
import GlobalContext from "../context/GlobalContext"

const CreateEventButton = () => {
  const { setShowEventModal } = useContext(GlobalContext)
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border p-2 px-4 rounded-full flex items-center shadow-md hover:shadow-2xl">
      <span className="material-icons text-xl text-gray">add</span>
      <span className="pl-3 pr-7">Create</span>
    </button>
  )
}

export default CreateEventButton