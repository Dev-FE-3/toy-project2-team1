import moment from 'moment'
import styled from 'styled-components'
import { monthNames } from '@/features/work-schedule/constants'
import { getEventCategoryColor } from '@/features/work-schedule/utils'
const DayCell = ({
  cellMonth,
  cellDay,
  weekdayIdx,
  currentMonth,
  currentYear,
  thisYear,
  calendarEvents,
  handleDayClick,
  handleModalOpen,
  eventCategories,
}) => {
  // 달의 첫 날짜인 경우 달 이름 표시용
  const isMonthStart = cellDay === 1 && cellMonth >= 0 && cellMonth <= 11
  // 오늘이면 날짜에 동그라미 표시용
  const isCellToday =
    thisYear === currentYear && cellMonth === moment().month() && cellDay === moment().date()
  // 일별 이벤트 목록
  const dayEvents = calendarEvents.filter(
    (event) => event.day === cellDay && event.month === cellMonth && event.year === currentYear,
  )
  // 일별 이벤트 존재 여부
  const hasEvents = dayEvents.length > 0

  // 요일에 따른 배경색 스타일
  const getDayStyle = () => {
    // 토요일이나 일요일이면 연한 회색
    if (weekdayIdx === 6 || weekdayIdx === 0) {
      return { backgroundColor: '#f5f5f5' }
    }
    return {}
  }

  return (
    <StyledDayCell
      data-month={cellMonth}
      data-day={cellDay}
      onClick={(e) =>
        handleDayClick(e, {
          selectedMonth: cellMonth,
          selectedDay: cellDay,
          selectedWeekDay: weekdayIdx,
        })
      }
      style={getDayStyle()}
    >
      {/* 날짜 */}
      <DayNumber $isActiveMonth={cellMonth === currentMonth} $isToday={isCellToday}>
        {cellDay}
      </DayNumber>
      {/* 달의 첫 날짜인 경우 달 이름 표시 */}
      {isMonthStart && <MonthLabel>{monthNames[cellMonth]}</MonthLabel>}
      {/* 이벤트 컨테이너 */}
      {hasEvents && (
        <EventsContainer>
          {/* 이벤트 목록 중 처음 2개만 표시 */}
          {dayEvents?.slice(0, 2).map((item) => (
            <EventItem
              className="eventItem"
              key={item.id}
              $categoryColor={getEventCategoryColor(eventCategories, item.eventCategory)}
              style={{
                backgroundColor:
                  eventCategories.find((cat) => cat.eventCategory === item.eventCategory)
                    ?.categoryStyle || '#3b82f6',
              }}
            >
              {item.title}
            </EventItem>
          ))}
          {/* 이벤트 개수가 2개 이상인 경우 더보기 레이블 표시 */}
          {dayEvents.length > 2 && (
            <div className="eventsCountLabel">+{dayEvents.length - 2}개</div>
          )}
        </EventsContainer>
      )}
      {/* 일별 이벤트 추가 버튼 */}
      <AddButtonIcon>
        <svg
          className="addIcon"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          onClick={(e) =>
            handleModalOpen(e, {
              selectedMonth: cellMonth,
              selectedDay: cellDay,
              selectedWeekDay: weekdayIdx,
            })
          }
        >
          <path
            fillRule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
            clipRule="evenodd"
          />
        </svg>
      </AddButtonIcon>
    </StyledDayCell>
  )
}

export default DayCell

const StyledDayCell = styled.div`
  position: relative;
  z-index: 10;
  aspect-ratio: 1 / 1;
  width: calc(100% / 7);
  height: auto;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  font-weight: 500;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  cursor: pointer;

  &:hover {
    z-index: 20;
    border-color: #22d3ee;
  }

  @media (min-width: 640px) {
  }

  @media (min-width: 1024px) {
  }
`

const DayNumber = styled.span`
  position: absolute;
  left: 0.25rem;
  top: 0.25rem;
  display: flex;
  width: 1.25rem;
  height: 1.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-size: 1.2rem;
  background-color: ${({ $isToday }) => ($isToday ? 'var(--main)' : 'transparent')};
  color: ${({ $isToday, $isActiveMonth }) =>
    $isToday ? 'white' : $isActiveMonth ? '#1e293b' : '#94a3b8'};
  font-weight: ${({ $isToday }) => ($isToday ? '600' : 'normal')};

  @media (min-width: 640px) {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    left: 0.5rem;
    top: 0.5rem;
    width: 2rem;
    height: 2rem;
    font-size: 1.2rem;
  }
`

const MonthLabel = styled.span`
  position: absolute;
  left: 0;
  bottom: 0.125rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 0.375rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #cbd5e1;

  @media (min-width: 640px) {
    bottom: 0;
    font-size: 1.2rem;
  }

  @media (min-width: 1024px) {
    bottom: 0.625rem;
    left: 1.2rem;
    width: fit-content;
    padding: 0;
    font-size: 1.2rem;
    margin-bottom: -0.25rem;
  }

  @media (min-width: 1536px) {
    margin-bottom: -1px;
    font-size: 1.5rem;
  }
`

const EventsContainer = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  right: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow: hidden;

  .eventsCountLabel {
    text-align: left;
    font-size: 1.2rem;
    color: #64748b;
    padding: 0 0.5rem;
  }
`

const EventItem = styled.div`
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 1.2rem;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: ${({ $categoryColor }) => $categoryColor};
`

const AddButtonIcon = styled.button`
  opacity: 0;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  .addIcon {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--main);
    fill: currentColor;
    transform: scale(0.9);
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;

    ${StyledDayCell}:focus-within & {
      transform: scale(1);
    }
  }

  &:hover .addIcon {
    transform: scale(1.1);
  }

  ${StyledDayCell}:hover & {
    opacity: 1;
  }
`
