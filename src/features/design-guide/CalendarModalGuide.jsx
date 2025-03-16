import CalendarModal from '@/shared/components/calendar/CalendarModal'
import { useState } from 'react'
import { getDate } from '../../shared/utils/date'

function CalendarModalGuide() {
  const [show, setShow] = useState(false)
  const [date, setDate] = useState({
    year: getDate('year'),
    month: getDate('month'),
  })

  const handleCalendar = () => {
    setShow((current) => !current)
  }

  const handleYearAndMonth = (value) => {
    setDate(value)
    setShow((current) => !current)
  }

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={handleCalendar}>Click!</button>
      <CalendarModal
        isShow={show}
        handleUpdateDate={handleYearAndMonth}
        top="3"
        left="0"
        date={date}
      ></CalendarModal>
      <span>
        그대가 선택한 날짜: {date.year}년 {date.month}월
      </span>
    </div>
  )
}

export default CalendarModalGuide
