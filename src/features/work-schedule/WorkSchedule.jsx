import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initSelectedDate, setIsSidebarOpen } from '@/shared/redux/reducer/workScheduleSlice'
import { getWorkScheduleByUid } from '@/shared/api/firebase/services/workScheduleService'
import { thisYear, thisMonth } from './constants'
import styled from 'styled-components'
import Calendar from './components/Calendar'
import CalendarHeader from './components/CalendarHeader'
import EventSidebar from './components/EventSidebar'
import AddEventModal from './components/AddEventModal'
import EditEventModal from './components/EditEventModal'
import ContentWrap from '@/shared/components/contemt-wrap/ContentWrap'
import { useWorkSchedule } from '@/shared/hooks/useWorkSchedule'

export default function WorkSchedule() {
  const [currentYear, setCurrentYear] = useState(() => thisYear) // 현재 연도
  const [currentMonth, setCurrentMonth] = useState(() => thisMonth) // 현재 달
  const dispatch = useDispatch()
  const { isSidebarOpen, modalAddMode, modalEditMode } = useSelector(
    ({ workSchedule }) => workSchedule,
  )
  const { loading, error, fetchWorkSchedules } = useWorkSchedule()

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
    [currentMonth],
  )

  // 오늘 날짜로 이동
  const handleMoveToToday = useCallback(() => {
    setCurrentYear(thisYear)
    setCurrentMonth(thisMonth)
  }, [])

  // 토글 핸들러 추가
  const handleToggleSidebar = useCallback(() => {
    dispatch(setIsSidebarOpen(!isSidebarOpen))
    if (isSidebarOpen) {
      // 사이드바 닫을 때 선택된 날짜 초기화
      // setSelectedDate(null)
      dispatch(initSelectedDate())
    }
  }, [isSidebarOpen])

  useEffect(() => {
    fetchWorkSchedules()
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
          <Calendar currentMonth={currentMonth} />
        </CalendarContent>
      </MainCalendarContainer>

      <SidebarContainer $isSidebarOpen={isSidebarOpen}>
        {/* 일별 이벤트 사이드바 토글 버튼 */}
        <FloatingButton
          type="button"
          aria-label={isSidebarOpen ? '사이드바 닫기' : '사이드바 열기'}
          $isSidebarOpen={isSidebarOpen}
          onClick={handleToggleSidebar}
        />

        {/* 일별 이벤트 목록 */}
        <EventSidebar currentYear={currentYear} currentMonth={currentMonth} />
      </SidebarContainer>

      {/* 이벤트 '추가' 모달 */}
      {modalAddMode && <AddEventModal />}
      {/* 이벤트 '수정' 모달 */}
      {modalEditMode && <EditEventModal />}
    </ContentWrap>
  )
}

// 달력 컨테이너
// const CalendarContainer = styled.div.withConfig({
//   displayName: 'CalendarContainer',
// })`
//   display: flex;
//   width: 90vw;
//   height: 90vh;
//   max-height: 90%;
//   border-top-left-radius: 1rem;
//   border-top-right-radius: 1rem;
//   background-color: white;
//   padding-bottom: 2.5rem;
//   color: #1e293b;
//   box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
//   overflow: hidden;
//   position: relative;
// `

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
// 사이드바 컨테이너
const SidebarContainer = styled.div.withConfig({
  displayName: 'SidebarContainer',
})`
  display: flex;
  flex: 0 0 30%;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  border-left: 1px solid #e2e8f0;
  background-color: #f8fafc;
  transform: translateX(${({ $isSidebarOpen }) => ($isSidebarOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  z-index: 30;
`

// 플로팅 버튼
const FloatingButton = styled.button`
  position: fixed;
  top: 50%;
  left: -2rem;
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
    transform: ${({ $isSidebarOpen }) => ($isSidebarOpen ? 'rotate(0)' : 'rotate(180deg)')};
    transition: transform 0.3s ease;
  }

  &:hover {
    background-color: #f8fafc;
  }
`
