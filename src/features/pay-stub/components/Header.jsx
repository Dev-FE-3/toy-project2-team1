import styled from 'styled-components'
import Button from '@/shared/components/button/Button'
import CalendarModal from '@/shared/components/calendar/CalendarModal'

export default function Header({ isShow, date, handleCalendar, handleUpdateDate }) {
  return (
    <>
      <HeaderContainer>
        <DateSelectorWrap>
          <DateSelector onClick={handleCalendar}>{`${date.year}년 ${date.month}월`}</DateSelector>
          <CalendarModal
            id="calendar-modal"
            isShow={isShow}
            handleUpdateDate={handleUpdateDate}
            top="4"
            left="0"
            date={date}
          ></CalendarModal>
        </DateSelectorWrap>
        <Button>정정신청</Button>
      </HeaderContainer>
    </>
  )
}

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DateSelectorWrap = styled.div`
  display: flex;
  gap: 1rem;
`
const DateSelector = styled.div`
  font-size: 2rem;
  line-height: 2.4rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.8rem 1rem;
  border-radius: 0.4rem;

  &:hover {
    background: var(--background-main);
  }
`
