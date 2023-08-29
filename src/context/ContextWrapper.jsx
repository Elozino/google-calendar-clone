/* eslint-disable react/prop-types */
import { useEffect, useReducer, useState } from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs'

// reducer
function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case 'push':
      return [...state, payload];
    case 'update':
      return state.map(event => event.id === payload.id ? payload : event)
    case 'delete':
      return state.filter(event => event.id !== payload.id);
    default:
      throw new Error()
  }
}

//initializer
function initEvent() {
  const storageEvents = localStorage.getItem('savedEvents')
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : []
  return parsedEvents
}
const ContextWrapper = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month())
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null)
  const [daySelected, setDaySelected] = useState(dayjs())
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [savedEvents, dispatchEvent] = useReducer(savedEventsReducer, [], initEvent)


  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify([...savedEvents]))
  }, [savedEvents])

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth)
    }
  }, [smallCalendarMonth])
  return (
    <GlobalContext.Provider value={{
      monthIndex,
      setMonthIndex,
      smallCalendarMonth,
      setSmallCalendarMonth,
      daySelected,
      setDaySelected,
      showEventModal,
      setShowEventModal,
      dispatchEvent,
      savedEvents,
      selectedEvent,
      setSelectedEvent,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default ContextWrapper