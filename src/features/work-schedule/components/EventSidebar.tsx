import { useMemo } from 'react'
import styled from 'styled-components'
import { monthNames, weekDays } from '@/features/work-schedule/constants'
import SidebarEventItem from './SidebarEventItem'
import { useSelector } from 'react-redux'
import { RootState } from '@/shared/redux/store'

interface EventSidebarProps {
  currentYear: number
  currentMonth: number
  onEditEvent: (eventId: string) => void
}

interface CalendarEvent {
  id: string
  uid: string
  name: string
  year: number
  month: number
  day: number
  weekday: number
  eventCategory?: string
  description?: string
}

const EventSidebar: React.FC<EventSidebarProps> = ({ currentYear, currentMonth, onEditEvent }) => {
  const calendarEvents = useSelector((state: RootState) => state.workSchedule.calendarEvents)
  const selectedDate = useSelector((state: RootState) => state.workSchedule.selectedDate)
  const isSidebarOpen = useSelector((state: RootState) => state.workSchedule.isSidebarOpen)

  const isEventList = useMemo(() => {
    if (!selectedDate) return []

    return calendarEvents?.filter(
      (event: CalendarEvent) =>
        event.year === selectedDate.year &&
        event.month === selectedDate.month &&
        event.day === selectedDate.day,
    )
  }, [calendarEvents, selectedDate])

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
        {isEventList && isEventList.length > 0 ? (
          isEventList.map((event: CalendarEvent) => (
            <SidebarEventItem key={event.id} event={event} onEditEvent={onEditEvent} />
          ))
        ) : (
          <div className="noEventMessage">
            {selectedDate ? '등록된 일정이 없습니다.' : '날짜를 선택해주세요.'}
          </div>
        )}
      </div>
    </StyledEventSidebar>
  )
}

interface StyledEventSidebarProps {
  $isSidebarOpen: boolean
}

const StyledEventSidebar = styled.div<StyledEventSidebarProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .sidebarHeader {
    padding: 20px;
    border-bottom: 1px solid #e2e8f0;
    background-color: #f8fafc;
  }

  .currentDate {
    font-weight: 600;
    font-size: 18px;
    color: #334155;
  }

  .eventList {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
  }

  .noEventMessage {
    padding: 20px;
    text-align: center;
    color: #64748b;
  }
`

export default EventSidebar
