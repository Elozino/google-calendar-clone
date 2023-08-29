import { useContext, useEffect, useState } from "react";
import { CalendarHeader, EventModal, Month, Sidebar } from "./components";
import { getMonth } from "./utils/time"
import GlobalContext from "./context/GlobalContext";

export default function App() {
  const { monthIndex, showEventModal } = useContext(GlobalContext)
  const [currentMonth, setCurrentMonth] = useState(getMonth())

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])

  return (
    <>
      {showEventModal && <EventModal />}
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  )
}