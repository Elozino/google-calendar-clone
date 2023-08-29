/* eslint-disable react/prop-types */

import dayjs from "dayjs"
import { useContext, useEffect, useState } from "react"
import GlobalContext from "../context/GlobalContext"


const Day = ({ day, rowIdx }) => {
  const { setShowEventModal, setDaySelected, filterEvents, setSelectedEvent } = useContext(GlobalContext)
  const [dayEvents, setDayEvents] = useState([])

  useEffect(() => {
    const events = filterEvents.filter(event => dayjs(event.day).format('DD-MM-YY') === day.format('DD-MM-YY'))
    setDayEvents(events)
  }, [day, filterEvents])

  function getCurrentDayClass() {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'bg-blue-600 text-white rounded-full w-7' : ''
  }
  return (
    <div
      className="border border-gray-200 flex flex-col items-center">
      <header
        className="flex flex-col items-center cursor-pointer">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format('ddd').toUpperCase()}
          </p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </header>
      <div
        onClick={() => {
          setDaySelected(day)
          setShowEventModal(true)
        }}
        className="flex-1 cursor-pointer w-full">
        {dayEvents.map((item, index) => (
          <div key={index}
            onClick={() => setSelectedEvent(item)}
            className={`bg-blue-200 p-1 mx-1 text-center text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Day