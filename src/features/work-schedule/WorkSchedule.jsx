import { useState, useCallback } from 'react'
import { thisYear, thisMonth, eventCategories } from './constants'
import styled from 'styled-components'
import Calendar from './components/Calendar'
import CalendarHeader from './components/CalendarHeader'
import EventSidebar from './components/EventSidebar'
import AddEventModal from './components/AddEventModal'
import ContentWrap from '@/shared/components/contemt-wrap/ContentWrap'

export default function WorkSchedule() {
  const [currentYear, setCurrentYear] = useState(() => thisYear) // 현재 연도
  const [currentMonth, setCurrentMonth] = useState(() => thisMonth) // 현재 달
  const [selectedDate, setSelectedDate] = useState(null) // 선택된 날짜
  const [isModalOpen, setIsModalOpen] = useState(false) // 모달 열림 여부
  const [isSidebarOpen, setIsSidebarOpen] = useState(true) // 사이드바 열림 여부
  // 이벤트 목록
  const [calendarEvents, setCalendarEvents] = useState([
    {
      id: '1',
      title: 'King Julien',
      year: thisYear,
      month: 2,
      day: 3,
      eventCategory: 'work',
      description: '오늘은 9to6 근무입니다.',
    },
  ])

  // 달 이동
  const handleMoveMonth = useCallback(
    (direction) => {
      if (direction === 'prevMonth') {
        // 1월에서 이전 달로 가면 전년도 12월로
        if (currentMonth === 0) {
          setCurrentMonth(11)
          setCurrentYear((prevYear) => prevYear - 1)
        } else {
          setCurrentMonth((prev) => prev - 1)
        }
      } else if (direction === 'nextMonth') {
        // 12월에서 다음 달로 가면 다음 연도 1월로
        if (currentMonth === 11) {
          setCurrentMonth(0)
          setCurrentYear((prevYear) => prevYear + 1)
        } else {
          setCurrentMonth((prev) => prev + 1)
        }
      }
    },
    [currentYear, currentMonth],
  )

  // 오늘 날짜로 이동
  const handleMoveToToday = useCallback(() => {
    setCurrentYear(thisYear)
    setCurrentMonth(thisMonth)
  }, [])

  // 날짜 셀 클릭
  const handleDayClick = useCallback(
    (e, { selectedMonth, selectedDay, selectedWeekDay }) => {
      e.preventDefault()

      setIsSidebarOpen(true)
      setSelectedDate({
        day: selectedDay,
        month: selectedMonth,
        year: currentYear,
        weekday: selectedWeekDay,
      })
    },
    [currentYear],
  )

  // 모달 열기
  const handleModalOpen = useCallback(
    (e, { selectedMonth, selectedDay, selectedWeekDay }) => {
      e.preventDefault()
      e.stopPropagation() // 날짜 셀 클릭 이벤트 방지

      setIsModalOpen(true)
      setSelectedDate({
        year: currentYear,
        month: selectedMonth,
        day: selectedDay,
        weekday: selectedWeekDay,
      })
    },
    [currentYear],
  )

  // 모달 닫기
  const handleModalClose = useCallback((e) => {
    e.preventDefault()

    setIsModalOpen(false)
  }, [])

  // 토글 핸들러 추가
  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev)
    if (isSidebarOpen) {
      // 사이드바 닫을 때 선택된 날짜 초기화
      setSelectedDate(null)
    }
  }, [isSidebarOpen])

  // 이벤트 추가
  const handleAddEvent = useCallback(
    (e, scheduleData) => {
      e.preventDefault()
      // console.log(' WorkSchedule ~ scheduleData: ', scheduleData)
      const { year, month, day } = selectedDate
      const { eventCategory, description } = scheduleData

      setCalendarEvents((prev) => [
        ...prev,
        {
          id: `${prev.length + 1}`,
          title: 'Choi',
          year,
          month,
          day,
          eventCategory,
          description,
        },
      ])
      setIsModalOpen(false)
    },
    [selectedDate],
  )

  // 이벤트 수정
  const handleEditEvent = useCallback((eventId, updatedEvent) => {
    console.log(' 수정 ~ eventId: ', eventId)
    // setCalendarEvents((prev) =>
    //   prev.map((event) => (event.id === eventId ? updatedEvent : event)),
    // )
  }, [])

  // 이벤트 삭제
  const handleDeleteEvent = useCallback((eventId) => {
    setCalendarEvents((prev) => prev.filter((event) => event.id !== eventId))
  }, [])

  return (
    <ContentWrap>
      <MainCalendarContainer $isSidebarOpen={isSidebarOpen}>
        <CalendarHeader
          currentYear={currentYear}
          currentMonth={currentMonth}
          handleMoveMonth={handleMoveMonth}
          handleMoveToToday={handleMoveToToday}
        />
        <CalendarContent>
          <Calendar
            currentYear={currentYear}
            currentMonth={currentMonth}
            calendarEvents={calendarEvents}
            handleDayClick={handleDayClick}
            handleModalOpen={handleModalOpen}
            eventCategories={eventCategories}
          />
        </CalendarContent>
      </MainCalendarContainer>

      {/* 일별 이벤트 사이드바 토글 버튼 */}
      <FloatingButton
        onClick={handleToggleSidebar}
        $isSidebarOpen={isSidebarOpen}
        type="button"
        aria-label={isSidebarOpen ? '사이드바 닫기' : '사이드바 열기'}
      />

      {/* 일별 이벤트 목록 */}
      <EventSidebar
        isOpen={isSidebarOpen}
        selectedDate={selectedDate}
        currentYear={currentYear}
        currentMonth={currentMonth}
        calendarEvents={calendarEvents}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
      />

      {/* 이벤트 추가 모달 */}
      <AddEventModal
        isOpen={isModalOpen}
        selectedDate={selectedDate}
        onClose={handleModalClose}
        onAddEvent={handleAddEvent}
      />
    </ContentWrap>
  )
}

// 달력 컨테이너
const CalendarContainer = styled.div.withConfig({
  displayName: 'CalendarContainer',
})`
  display: flex;
  width: 90vw;
  height: 90vh;
  max-height: 90%;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background-color: white;
  padding-bottom: 2.5rem;
  color: #1e293b;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  overflow: hidden;
  position: relative;
`

const MainCalendarContainer = styled.div.withConfig({
  displayName: 'MainCalendarContainer',
})`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: margin-right 0.3s ease-in-out;
  margin-right: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '30%' : '0')};
`

// 캘린더 컨텐츠
const CalendarContent = styled.div`
  flex: 1;
  width: 100%;
  padding: 1rem 1.25rem 0 1.25rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: 640px) {
    padding: 1.5rem 2rem 0 2rem;
  }
`
// 플로팅 버튼
const FloatingButton = styled.button`
  position: fixed;
  right: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '30%' : '0')};
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 48px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-right: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '1px solid #e2e8f0' : 'none')};
  border-radius: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '4px 0 0 4px' : '4px')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 40;
  transition: right 0.3s ease-in-out;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 0;

  &::before {
    content: '';
    width: 16px;
    height: 16px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 18l6-6-6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    transform: ${({ $isSidebarOpen }) => ($isSidebarOpen ? 'rotate(180deg)' : 'rotate(0)')};
    transition: transform 0.3s ease;
  }

  &:hover {
    background-color: #f8fafc;
  }
`
