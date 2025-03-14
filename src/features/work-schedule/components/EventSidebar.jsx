import { useMemo } from 'react'
import styled from 'styled-components'
import { monthNames, weekDays } from '../constants'
import SidebarEventItem from './SidebarEventItem'
import { useSelector } from 'react-redux'

const EventSidebar = ({ currentYear, currentMonth, onEditEvent }) => {
  const calendarEvents = useSelector(({ workSchedule }) => workSchedule.calendarEvents)
  const selectedDate = useSelector(({ workSchedule }) => workSchedule.selectedDate)
  const isSidebarOpen = useSelector(({ workSchedule }) => workSchedule.isSidebarOpen)

  // console.log(' selectedDate: ', selectedDate)
  const isEventList = useMemo(() => {
    if (!selectedDate) return []

    return calendarEvents?.filter(
      (event) =>
        event.year === selectedDate.year &&
        event.month === selectedDate.month &&
        event.day === selectedDate.day,
    )
  }, [calendarEvents, selectedDate])
  // console.log(' isEventList ~ isEventList: ', isEventList)

  return (
    <StyledEventSidebar $isSidebarOpen={isSidebarOpen}>
      <div className="sidebarHeader">
        {/* 사이드바에 선택한 날짜(연/월/일/요일) 표시 */}
        <div className="currentDate">
          {selectedDate != null
            ? `${selectedDate.year}년 ${monthNames[selectedDate.month]} ${selectedDate.day}일 (${
                weekDays[selectedDate.weekday]
              })`
            : `${currentYear}년 ${monthNames[currentMonth]}`}
        </div>
      </div>
      <div className="eventList">
        {selectedDate != null ? (
          // 날짜가 선택되었을 때
          isEventList.length > 0 ? (
            // 선택된 날짜에 이벤트가 있는 경우
            isEventList.map((event, index) => <SidebarEventItem key={index} event={event} />)
          ) : (
            // 선택된 날짜에 이벤트가 없는 경우
            <div className="noEventMessage">선택한 날짜에 등록된 일정이 없습니다.</div>
          )
        ) : (
          // 날짜가 선택되지 않았을 때
          <div className="noEventMessage">날짜를 선택하여 일정을 확인하세요.</div>
        )}
      </div>
    </StyledEventSidebar>
  )
}

export default EventSidebar

const StyledEventSidebar = styled.div.withConfig({
  displayName: 'StyledEventSidebar',
})`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .sidebarHeader {
    flex: 0 0 auto;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;

    .currentDate {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1e293b;
    }
  }

  .eventList {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;

      &:hover {
        background: #94a3b8;
      }
    }
  }

  .noEventMessage {
    text-align: center;
    color: #64748b;
    padding: 2rem 1rem;
    font-size: 1.2rem;
  }
`
