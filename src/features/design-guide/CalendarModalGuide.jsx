import CalendarModal from '@/shared/components/calendar/CalendarModal'
import { useState } from 'react'
import getDate from '../../shared/utils/utils'

function CalendarModalGuide() {
  const [show, setShow] = useState(false)
  const [date, setDate] = useState(() => {
    const year = getDate('year')
    const month = String(getDate('month')).padStart(2, '0')
    return `${year}${month}`
  })

  const handleCalendar = () => {
    setShow((current) => !current)
  }

  const handleYearAndMonth = (value) => {
    setDate(value)
    setShow((current) => !current)
  }

  return (
    <>
      <button onClick={handleCalendar}>Click!</button>
      <CalendarModal
        isShow={show}
        onChange={handleYearAndMonth}
        top="17"
        left="-148"
        date={date}
      ></CalendarModal>
      <span> 그대가 선택한 날짜: {date}</span>
    </>
  )
}

export default CalendarModalGuide
