import { useEffect, useState } from 'react'
import { styled, css } from 'styled-components'
import { getDate } from '../../utils/date'

export default function CalendarModal({ isShow, date, handleUpdateDate, top, left }) {
  const [year, setYear] = useState(date.year)
  const currentYear = getDate('year')
  const currentMonth = getDate('month')
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] //상수화?

  const handleMonthClick = (targetDate) => {
    handleUpdateDate({ ...targetDate })
  }

  const changeYear = (option) => {
    if (option === 'prev') {
      setYear((current) => current - 1)
    } else if (year < currentYear && option === 'next') {
      setYear((current) => current + 1)
    }
  }

  useEffect(() => {
    setYear(date.year)
  }, [isShow, date])

  return (
    <CalendarDialog $isShow={isShow} $top={top} $left={left}>
      <CalendarContainer>
        <CalendarTop>
          <CalendarBackward onClick={() => changeYear('prev')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M10.4142 12L15.7071 6.70711C16.0976 6.31658 16.0976 5.68342 15.7071 5.29289C15.3166 4.90237 14.6834 4.90237 14.2929 5.29289L8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L14.2929 18.7071C14.6834 19.0976 15.3166 19.0976 15.7071 18.7071C16.0976 18.3166 16.0976 17.6834 15.7071 17.2929L10.4142 12Z"
                fill="#2D3648"
              />
            </svg>
          </CalendarBackward>
          <CalendarYear>{year}</CalendarYear>
          <CalendarForward onClick={() => changeYear('next')} $isDisabled={year === currentYear}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9.70711 5.29289C9.31658 4.90237 8.68342 4.90237 8.29289 5.29289C7.90237 5.68342 7.90237 6.31658 8.29289 6.70711L13.5858 12L8.29289 17.2929C7.90237 17.6834 7.90237 18.3166 8.29289 18.7071C8.68342 19.0976 9.31658 19.0976 9.70711 18.7071L15.7071 12.7071C16.0976 12.3166 16.0976 11.6834 15.7071 11.2929L9.70711 5.29289Z"
                fill={year === currentYear ? '#BDBDBD' : '#2D3648'}
              />
            </svg>
          </CalendarForward>
        </CalendarTop>
        <CalendarBottom>
          <CalendarUl>
            {months
              .map((_, index) => (
                <CalendarLi key={index}>
                  {months.slice(index, index + 3).map((month) => {
                    const targetDate = { year, month }
                    const isDisabled = year === currentYear && month > currentMonth
                    return (
                      <CalendarMonth
                        key={month}
                        onClick={() => !isDisabled && handleMonthClick(targetDate)}
                        className={year === date.year && month === date.month ? 'selected' : ''}
                        $isDisabled={isDisabled}
                      >
                        {month}월
                      </CalendarMonth>
                    )
                  })}
                </CalendarLi>
              ))
              .filter((_, i) => i % 3 === 0)}
          </CalendarUl>
        </CalendarBottom>
      </CalendarContainer>
    </CalendarDialog>
  )
}

const CalendarDialog = styled.dialog`
  display: ${({ $isShow }) => ($isShow ? 'block' : 'none')};
  top: ${({ $top }) => ($top ? $top + 'rem' : '0')};
  left: ${({ $left }) => ($left ? $left + 'rem' : '0')};
  margin: 0;
  position: absolute;
  padding: 2rem;
  background: var(--box-container);
  border-radius: 1.2rem;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);
  border: none;
  font-weight: 600;
  font-size: 1.8rem;
  color: var(--font-main);
  z-index: 9;
`

const CalendarContainer = styled.section`
  display: flex;
  flex-direction: column;
`

const CalendarTop = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.7rem;
`
const CalendarBackward = styled.div`
  display: flex;
  margin-right: 0.4rem;
  cursor: pointer;
`
const CalendarForward = styled.div`
  display: flex;
  margin-left: 0.4rem;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
`
const CalendarYear = styled.div`
  width: 5rem;
`
const CalendarBottom = styled.div``

const CalendarUl = styled.ul``
const CalendarLi = styled.li`
  display: flex;
  justify-content: space-between;
`
const CalendarMonth = styled.div`
  display: flex;
  width: 8rem;
  height: 5rem;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
  border-radius: 0.8rem;
  font-size: 1.6rem;
  font-weight: 400;

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      color: var(--point-gray);
      cursor: not-allowed;
    `}

  &.selected {
    color: var(--box-container);
    background-color: var(--main);
  }

  ${({ $isDisabled }) =>
    !$isDisabled &&
    css`
      &:hover {
        cursor: pointer;
        color: var(--box-container);
        background-color: var(--main);
      }
    `}
`
