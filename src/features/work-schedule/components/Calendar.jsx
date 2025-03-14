import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { thisYear } from '../constants'
import { generateDaysInYear, generateCalendarWeeks } from '../utils'
import DayCell from './DayCell'

const Calendar = ({ currentMonth }) => {
  const calendarEvents = useSelector(({ workSchedule }) => workSchedule.calendarEvents)
  const generatorCalendar = useMemo(() => {
    // 달력 데이터 생성
    const calendarData = generateDaysInYear(thisYear)

    // 달력 데이터를 주 단위로 그룹화
    const groupOfWeeks = generateCalendarWeeks(calendarData)

    // 현재 달의 주 데이터만 필터링
    const activeMonth = groupOfWeeks.filter((week) =>
      week.some((item) => item.month === currentMonth),
    )

    // 현재 달 렌더링(1달씩 렌더링)
    return activeMonth?.map((week, weekIndex) => (
      <WeekRow key={`week-${weekIndex}`}>
        {week.map(({ month: cellMonth, day: cellDay }, weekdayIdx) => (
          <DayCell
            key={`${cellMonth}-${cellDay}`}
            cellMonth={cellMonth}
            cellDay={cellDay}
            weekdayIdx={weekdayIdx}
            currentMonth={currentMonth}
          />
        ))}
      </WeekRow>
    ))
  }, [thisYear, currentMonth, calendarEvents])

  return <>{generatorCalendar}</>
}

export default Calendar

const WeekRow = styled.div.withConfig({
  displayName: 'WeekRow',
})`
  display: flex;
  width: 100%;
  flex: 1;
  justify-content: space-between;
`
