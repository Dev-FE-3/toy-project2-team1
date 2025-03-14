import styled from 'styled-components/'
import { monthNames, weekDays } from '../constants'
import Button from '@/shared/components/button/Button'
const CalendarHeader = ({ currentYear, currentMonth, handleMoveMonth, handleMoveToToday }) => {
  return (
    <HeaderContainer>
      <div className="yearMonthContainer">
        {/* 이전 달 버튼 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="prevMonthBtn lucide lucide-chevron-left"
          onClick={() => handleMoveMonth('prevMonth')}
        >
          <path
            d="M10.4142 12L15.7071 6.70711C16.0976 6.31658 16.0976 5.68342 15.7071 5.29289C15.3166 4.90237 14.6834 4.90237 14.2929 5.29289L8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L14.2929 18.7071C14.6834 19.0976 15.3166 19.0976 15.7071 18.7071C16.0976 18.3166 16.0976 17.6834 15.7071 17.2929L10.4142 12Z"
            fill="#2D3648"
          />
        </svg>
        <h1 className="yearText">{`${currentYear}년 ${monthNames[currentMonth]}`}</h1>
        {/* 다음 달 버튼 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="nextMonthBtn lucide lucide-chevron-right"
          onClick={() => handleMoveMonth('nextMonth')}
        >
          <path
            d="M9.70711 5.29289C9.31658 4.90237 8.68342 4.90237 8.29289 5.29289C7.90237 5.68342 7.90237 6.31658 8.29289 6.70711L13.5858 12L8.29289 17.2929C7.90237 17.6834 7.90237 18.3166 8.29289 18.7071C8.68342 19.0976 9.31658 19.0976 9.70711 18.7071L15.7071 12.7071C16.0976 12.3166 16.0976 11.6834 15.7071 11.2929L9.70711 5.29289Z"
            fill="#2D3648"
          />
        </svg>
      </div>
      {/* 오늘 버튼 */}
      <HeaderBtn className="headerBtn" type="button" variant="primary" onClick={handleMoveToToday}>
        오늘
      </HeaderBtn>
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
  padding-bottom: 1.5rem;
  background-color: white;

  .yearMonthContainer {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 3.8rem;

    .yearText {
      font-size: 2rem;
      font-weight: 600;
      color: #1e293b;
      display: flex;
      align-items: center;
    }

    .prevMonthBtn,
    .nextMonthBtn {
      align-self: center;
      cursor: pointer;
    }
  }
`

const HeaderBtn = styled(Button)`
  cursor: pointer;
  padding: 0.4rem 0.8rem;
  font-size: 1.2rem;

  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`

const WeekdaysContainer = styled.section`
  display: flex;
  width: 100%;
  margin-top: 2.5rem;
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
