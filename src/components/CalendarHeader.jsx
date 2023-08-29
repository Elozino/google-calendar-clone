import { useContext } from 'react'
import logo from '../assets/logo.svg'
import GlobalContext from '../context/GlobalContext'
import dayjs from 'dayjs'

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext)

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1)
  }
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1)
  }
  const handleResetToCurrentMonth = () => {
    setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month())
  }

  return (
    <div className="px-4 py-2 flex items-center">
      <img src={logo} alt="calendar-logo" className="mr-1 w-10 h-10" />
      <h1 className="mr-10 text-xl text-gray font-bold">Calendar</h1>
      <button
        onClick={handleResetToCurrentMonth}
        className="border rounded py-2 px-4 mr5">
        Today
      </button>
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
      <h2 className='ml-4 text-xl text-gray-500 font-bold'>
        {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
      </h2>
    </div>
  )
}

export default CalendarHeader 