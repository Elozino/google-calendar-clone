// import React from 'react'

import dayjs from "dayjs"
import { Fragment, useContext, useEffect, useState } from "react"
import { getMonth } from '../utils/time'
import GlobalContext from "../context/GlobalContext"

const SmallCalendar = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month())
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex, setSmallCalendarMonth, daySelected,
    setDaySelected } = useContext(GlobalContext)

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex))
  }, [currentMonthIndex]);

  const handlePrevMonth = () => {
    setCurrentMonthIndex(currentMonthIndex - 1)
  }

  const handleNextMonth = () => {
    setCurrentMonthIndex(currentMonthIndex + 1)
  }

  useEffect(() => {
    setCurrentMonthIndex(monthIndex)
  }, [monthIndex])

  function getDayClass(day) {
    const format = 'DD-MM-YY'
    const nowDay = dayjs().format(format)
    const currDay = day.format(format)
    const selectDay = daySelected && daySelected.format(format)
    if (nowDay === currDay) {
      return 'bg-blue-500 rounded-full text-white'
    } else if(currDay === selectDay) {
      return 'bg-blue-100 rounded-full text-blue-600 font-bold'
    } else {
      return ''
    }
  }

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).format('MMMM YYYY')}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <span className="material-icons cursor-pointer text-gray-600 mx-2">
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-icons cursor-pointer text-gray-600 mx-2">
              chevron_right
            </span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, index) => (
          <span key={index} className="text-sm py-1 text-center">
            {day.format('dd').charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <Fragment key={i}>
            {row.map((day, index) => (
              <button
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIndex)
                  setDaySelected(day)
                }}
                key={index} className={`py-1 w-full ${getDayClass(day)}`}>
                <span className="text-sm">
                  {day.format('D')}
                </span>
              </button>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default SmallCalendar