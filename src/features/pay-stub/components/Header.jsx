import styled from 'styled-components'
import Modal from '@/shared/components/modal/Modal'
import Button from '@/shared/components/button/Button'
import CalendarModal from '@/shared/components/calendar/CalendarModal'
import { useCallback, useState } from 'react'

export default function Header({ isShow, date, handleCalendar, handleUpdateDate, isNoData }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

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
        <Button onClick={handleOpenModal} disabled={isNoData}>
          정정신청
        </Button>
      </HeaderContainer>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="정정신청">
        <p>title props를 전달하면 모달 제목이 출력됩니다.</p>
        <p>모달 제목 앞에 데코레이션을 빼고 싶으면 isDecorated props 값을 false로 전달하세요.</p>
      </Modal>
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
