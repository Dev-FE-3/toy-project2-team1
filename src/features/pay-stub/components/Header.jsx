import styled from 'styled-components'
import Notification from './Notification'
import Modal from '@/shared/components/modal/Modal'
import Button from '@/shared/components/button/Button'
import CalendarModal from '@/shared/components/calendar/CalendarModal'
import { addDocument } from '@/shared/api/firebase/firestore'
import { useCallback, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Header({ isShow, date, handleCalendar, handleUpdateDate, isNoData }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFail, setIsFail] = useState(false)
  const textareaRef = useRef(null)

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setIsSuccess(false)
    setIsFail(false)
  }, [])

  const userData = useSelector((state) => state.user)
  const handleFormSubmit = async () => {
    try {
      const docId = await addDocument('payrollCorrections', {
        approvalStatus: '결재대기',
        uid: userData.uid,
        employeeName: userData.name,
        requestContent: textareaRef.current.value,
        requestDate: new Date(),
        requestType: '정정신청',
      })

      if (docId) {
        setIsSuccess(true)
      } else {
        setIsFail(true)
      }
    } catch (error) {
      return <div>{error}</div>
    }
  }

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
        <Button type="button" onClick={handleOpenModal} disabled={isNoData}>
          정정신청
        </Button>
      </HeaderContainer>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="정정신청" width="550px">
        <Textarea ref={textareaRef} placeholder="신청 사유를 입력해주세요"></Textarea>
        <ButtonWrap>
          <Button type="button" onClick={handleFormSubmit}>
            제출
          </Button>
        </ButtonWrap>
        <Notification isSuccess={isSuccess} isFail={isFail} handleCloseModal={handleCloseModal} />
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

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  max-height: 300px;
  padding: 10px;
  margin-top: 1rem;
  border: 1px solid var(--point-gray);
  border-radius: 0.8rem;
  line-height: 1.5; /* 줄 높이 */
  resize: none; /* 크기 조절 불가능 */
  transition: border-color 0.3s; /* 테두리 색상 변화에 애니메이션 추가 */

  &:focus {
    border-color: var(--main); /* 포커스 시 테두리 색상 변경 */
    outline: none; /* 기본 아웃라인 제거 */
  }
`
const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`
