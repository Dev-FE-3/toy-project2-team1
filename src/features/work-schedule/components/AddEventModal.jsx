import { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import styled, { css } from 'styled-components'
import { weekDays, eventCategories } from '../constants'
import Modal from '@/shared/components/modal/Modal'
import Button from '@/shared/components/button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { setModalAddMode } from '../../../shared/redux/reducer/workScheduleSlice'
import { addWorkSchedule } from '../../../shared/api/firebase/services/workScheduleService'
import { useWorkSchedule } from '@/shared/hooks/useWorkSchedule'

const AddEventModal = () => {
  const [description, setDescription] = useState('') // 일정 설명
  const [selectedCategory, setSelectedCategory] = useState('personal') // 선택된 카테고리
  const inputRef = useRef(null) // 일정 설명 input box focus 용
  const dispatch = useDispatch()
  const userInfo = useSelector(({ user }) => user)
  const selectedDate = useSelector(({ workSchedule }) => workSchedule.selectedDate)
  const modalAddMode = useSelector(({ workSchedule }) => workSchedule.modalAddMode)
  const { fetchWorkSchedules } = useWorkSchedule()

  // 모달 제목(연/월/일/요일)
  const handleTitle = useMemo(() => {
    if (!modalAddMode || !selectedDate) return null

    return `${selectedDate.year}년 ${selectedDate.month + 1}월 ${selectedDate.day}일 (${
      weekDays[selectedDate.weekday]
    })`
  }, [selectedDate])

  const handleAddEvent = useCallback(
    async (e) => {
      e.preventDefault()
      const { year, month, day, weekday } = selectedDate
      const workSchedule = {
        uid: userInfo.uid,
        name: userInfo.name,
        year,
        month,
        day,
        weekday,
        eventCategory: selectedCategory,
        description,
      }

      addWorkSchedule(workSchedule)
        .then((docRef) => {
          // console.log('문서 추가 성공:', docRef)
          fetchWorkSchedules()
        })
        .catch((error) => {
          console.error('문서 추가 중 오류 발생:', error)
        })

      // 입력 필드 초기화
      setDescription('')
      setSelectedCategory('personal')
    },
    [userInfo.uid, selectedDate, selectedCategory, description],
  )

  const handleCloseModal = useCallback(() => {
    dispatch(setModalAddMode(false))
  }, [dispatch])

  useEffect(() => {
    // 모달 열리면 description 필드 포커스 주기
    if (modalAddMode && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus()
      }, 100)
    }
  }, [modalAddMode])

  if (!modalAddMode || !selectedDate) return null

  return (
    <Modal isOpen={modalAddMode} onClose={handleCloseModal} title={handleTitle} width="50rem">
      <ModalChildren>
        <input
          ref={inputRef}
          type="text"
          className="descriptionInput"
          placeholder="일정에 대한 설명을 입력하세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="categorySelector">
          {/* 카테고리 선택 버튼 */}
          {eventCategories.map((category) => (
            <EventModalCatLabel
              key={category.eventCategory}
              $labelType={category.categoryStyle}
              className={`categoryButton ${
                selectedCategory === category.eventCategory ? 'active' : 'inactive'
              }`}
              onClick={() => setSelectedCategory(category.eventCategory)}
            >
              {category.categoryName}
            </EventModalCatLabel>
          ))}
        </div>

        <div className="modalButtonContainer">
          <Button className="modalAddEventButton" variant="primary" onClick={handleAddEvent}>
            일정 추가
          </Button>
        </div>
      </ModalChildren>
    </Modal>
  )
}

export default AddEventModal

export const getCategoryColor = {
  primary: css`
    background-color: var(--background-sub);
    color: var(--main);
  `,
  secondary: css`
    background-color: #fbc02d33;
    color: var(--point-yellow);
  `,
  danger: css`
    background-color: rgba(238, 83, 79, 0.1);
    color: var(--point-red);
  `,
}

export const EventModalCatLabel = styled.span`
  border-radius: 0.4rem;
  display: inline-block;
  width: 9rem;
  padding: 0.6rem 0;
  font-weight: 500;
  text-align: center;
  ${({ $labelType }) => getCategoryColor[$labelType]};
`

const ModalChildren = styled.div.withConfig({
  displayName: 'modal-children',
})`
  width: 100%;
  border-radius: 0.5rem;
  background-color: white;
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  .descriptionInput {
    width: 100%;
    padding: 8px 4px;
    margin-bottom: 16px;
    font-size: 1.2rem;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    transition: border-bottom-color 0.3s;

    &:focus {
      border-bottom-color: #6200ee;
    }

    &::placeholder {
      color: #aaa;
    }
  }

  .modalTitle {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 700;
    padding-right: 2rem; /* 닫기 버튼 공간 확보 */
  }

  .modalCloseButton {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    color: #6b7280;
    transition: all 0.2s;
    background-color: white;

    &:hover {
      background-color: #f3f4f6;
      color: #374151;
    }

    svg {
      width: 1.5rem;
      height: 1.5rem;
      stroke-width: 2;
    }
  }

  .modalDescription {
    margin-bottom: 1rem;
  }

  .categorySelector {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;

    .categoryButton {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 1.2rem;
      transition: all 0.2s;
      opacity: 0.7;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }

      &.inactive {
        opacity: 0.3;
      }

      &.active {
        opacity: 1;
      }
    }
  }

  .modalButtonContainer {
    display: flex;
    justify-content: flex-end;
  }
`
