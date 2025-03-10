import styled from 'styled-components/'
import { monthNames, weekDays } from '../constants'
import Button from '@/shared/components/button/Button'
const CalendarHeader = ({ currentYear, currentMonth, handleMoveMonth, handleMoveToToday }) => {
  return (
    <HeaderContainer>
      <div className="yearMonthContainer">
        <h1 className="yearText">{`${currentYear}년 ${monthNames[currentMonth]}`}</h1>
      </div>
      <nav className="headerBtnGroup">
        {/* 이전 달 버튼 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="prevMonthBtn lucide lucide-chevron-left"
          onClick={() => handleMoveMonth('prevMonth')}
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        {/* 오늘 버튼 */}
        <HeaderBtn
          className="headerBtn"
          type="button"
          variant="primary"
          onClick={handleMoveToToday}
        >
          오늘
        </HeaderBtn>
        {/* 다음 달 버튼 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="nextMonthBtn lucide lucide-chevron-right"
          onClick={() => handleMoveMonth('nextMonth')}
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        {/* <button
          className="headerBtn"
          onClick={() => handleMoveMonth('nextMonth')}
          aria-label="다음 달"
        ></button> */}
      </nav>
      {/* 요일 레이블 */}
      <WeekdaysContainer>
        {weekDays.map((weekday, idx) => (
          <div key={`weekday-${idx}`} className="weekdayItem" data-weekday-idx={idx}>
            {weekday}
          </div>
        ))}
      </WeekdaysContainer>
    </HeaderContainer>
  )
}

export default CalendarHeader

const HeaderContainer = styled.header.withConfig({
  displayName: 'HeaderContainer',
})`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 1rem 1.5rem 0;
  background-color: white;

  .yearMonthContainer {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;

    .yearText {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e293b;
      display: flex;
      align-items: center;
    }
  }

  .headerBtnGroup {
    display: flex;
    gap: 0.25rem;

    .prevMonthBtn,
    .nextMonthBtn {
      align-self: center;
    }
  }
`
const HeaderBtn = styled(Button)`
  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`

const WeekdaysContainer = styled.section`
  display: flex;
  width: 100%;
  margin-top: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.75rem;

  .weekdayItem {
    width: calc(100% / 7);
    text-align: center;
    font-weight: 600;
    color: #475569;
    font-size: 1.2rem;

    &[data-weekday-idx='0'] {
      color: #f43f5e; /* 일요일 빨간색 */
    }

    &[data-weekday-idx='6'] {
      color: #3b82f6; /* 토요일 파란색 */
    }
  }
`
