import styled from 'styled-components'
import Notification from './Notification'
import Modal from '@/shared/components/modal/Modal'
import Button from '@/shared/components/button/Button'
import CalendarModal from '@/shared/components/calendar/CalendarModal'
import { addDocument } from '@/shared/api/firebase/firestore'
import { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDate, toggleIsShow } from '@/shared/redux/reducer/userPayStubSlice'

export default function Header() {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState([])
  const [isEmpty, setIsEmpty] = useState(false)
  const textareaRef = useRef(null)

  // redux 상태 가져오기
  const userData = useSelector((state) => state.user)
  const { isShow, date, isNoData } = useSelector((state) => state.userPayStub)

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setIsNotificationOpen(false)
    setIsSuccess(false)
    setIsEmpty(false)
  }, [])

  const handleFormSubmit = async () => {
    if (!textareaRef.current.value) {
      setIsEmpty(true)
      return
    }
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
        setMessage(['정상적으로 제출 되었습니다', '진행 상태는 내 문서함에서 확인할 수 있습니다'])
      } else {
        setMessage(['현재 정정신청이 불가능합니다', '인사팀에 문의하세요'])
      }
      setIsNotificationOpen(true)
    } catch (error) {
      return <div>{error}</div>
    }
  }

  const handleCalendar = () => {
    dispatch(toggleIsShow())
  }

  const handleUpdateDate = (value) => {
    dispatch(setDate(value))
    dispatch(toggleIsShow())
    handleCloseModal()
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
        <FormWrap>
          <Textarea ref={textareaRef} placeholder="신청 사유를 입력해주세요" />
          {isEmpty && (
            <EmptyMessage>
              정정신청 사유를 작성하신 후, 제출 버튼을 눌러 주시기 바랍니다
            </EmptyMessage>
          )}
        </FormWrap>
        <ButtonWrap>
          <Button type="button" onClick={handleFormSubmit}>
            제출
          </Button>
        </ButtonWrap>
        {isNotificationOpen && (
          <Notification
            isSuccess={isSuccess}
            handleCloseModal={handleCloseModal}
            messageList={message}
          ></Notification>
        )}
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

const FormWrap = styled.div`
  position: relative;
  height: 100%;
`
const EmptyMessage = styled.p`
  position: absolute;
  bottom: -15px;
  left: 5px;
  font-size: 1.2rem;
  color: var(--point-red);
`
