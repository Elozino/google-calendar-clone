// import React from 'react'

import { useContext, useState } from "react"
import GlobalContext from "../context/GlobalContext"

const labelClasses = ['orange', 'blue', 'yellow', 'purple', 'green']

const EventModal = () => {
  const { setShowEventModal, daySelected, dispatchEvent, selectedEvent } = useContext(GlobalContext)
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '')
  const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : '')
  const [selectedLabel, setSelectedLabel] = useState(selectedEvent ? labelClasses.find(label => label === selectedEvent.label) : labelClasses[0])

  function handleSubmit(e) {
    e.preventDefault()
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now()
    }

    if (selectedEvent) {
      dispatchEvent({ type: 'update', payload: calendarEvent })
    }
    else {
      dispatchEvent({ type: 'push', payload: calendarEvent })
    }
    setShowEventModal(false)
  }


  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form action="" className="bg-white rounded-lg shadow-2xl lg:w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchEvent({ type: 'delete', payload: selectedEvent })
                  setShowEventModal(false)
                }}
                className="material-icons text-gray-400 cursor-pointer">
                delete
              </span>
            )}
            <button
              type="button"
              onClick={() => setShowEventModal(false)}
            >
              <span className="material-icons text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Add title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
            />
            <span className="material-icons text-gray-400">
              schedule
            </span>
            <p>{daySelected.format('dddd, MMMM DD')}</p>
            <span className="material-icons text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Add a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
            />
            <span className="material-icons text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelClasses.map((labelClass, index) => (
                <span key={index}
                  onClick={() => setSelectedLabel(labelClass)}
                  className={`bg-${labelClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === labelClass && (
                    <span className="material-icons text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer
          className="flex justify-end border-t p-3 mt-5"
        >
          <button type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 text-white rounded">
            Save
          </button>

        </footer>
      </form>
    </div>
  )
}

export default EventModal