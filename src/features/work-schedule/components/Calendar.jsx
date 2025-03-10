import { useMemo } from 'react'
import styled from 'styled-components'
import { thisYear } from '../constants'
import { generateDaysInYear, generateCalendarWeeks } from '../utils'
import DayCell from './DayCell'

const Calendar = ({
  currentYear,
  currentMonth,
  calendarEvents,
  handleDayClick,
  handleModalOpen,
  eventCategories,
}) => {
  const calendar = useMemo(() => {
    // 달력 데이터 생성
    const calendarData = generateDaysInYear(currentYear)

    // 달력 데이터를 주 단위로 그룹화
    const groupOfWeeks = generateCalendarWeeks(calendarData)

    // 현재 달의 주 데이터만 필터링
    const activeMonth = groupOfWeeks.filter((week) =>
      week.some((item) => item.month === currentMonth),
    )

    return activeMonth?.map((week, weekIndex) => (
      <WeekRow key={`week-${weekIndex}`}>
        {week.map(({ month: cellMonth, day: cellDay }, weekdayIdx) => (
          <DayCell
            key={`${cellMonth}-${cellDay}`}
            cellMonth={cellMonth}
            cellDay={cellDay}
            weekdayIdx={weekdayIdx}
            currentMonth={currentMonth}
            currentYear={currentYear}
            thisYear={thisYear}
            calendarEvents={calendarEvents}
            handleDayClick={handleDayClick}
            handleModalOpen={handleModalOpen}
            eventCategories={eventCategories}
          />
        ))}
      </WeekRow>
    ))
  }, [currentYear, currentMonth, calendarEvents, handleDayClick, handleModalOpen, eventCategories])

  return <>{calendar}</>
}

export default Calendar

const WeekRow = styled.div.withConfig({
  displayName: 'WeekRow',
})`
  display: flex;
  width: 100%;
  flex: 1;
  justify-content: space-between;
  min-height: 0;
`
