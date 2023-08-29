/* eslint-disable react/prop-types */
import { useEffect, useMemo, useReducer, useState } from 'react'
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
  const [labels, setLabels] = useState([])
  const [savedEvents, dispatchEvent] = useReducer(savedEventsReducer, [], initEvent)

  const filterEvents = useMemo(() => {
    return savedEvents.filter(evt =>
      labels
        .filter(lbl => lbl.checked)
        .map(lbl => lbl.label)
        .includes(evt.label))
  }, [labels, savedEvents])

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify([...savedEvents]))
  }, [savedEvents])

  useEffect(() => {
    setLabels(prev => ([...new Set(savedEvents.map(event => event.label))].map(label => {
      const currentLabel = prev.find(item => item.label === label)
      return {
        label,
        checked: currentLabel ? currentLabel.checked : true,
      }
    })))
  }, [savedEvents])

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth)
    }
  }, [smallCalendarMonth])

  function updateLabel(label) {
    setLabels(labels.map(lbl => lbl.label === label.label ? label : lbl))
  }
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
      labels,
      setLabels,
      updateLabel,
      filterEvents,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default ContextWrapper