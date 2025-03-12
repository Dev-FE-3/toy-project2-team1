import { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setModalEditMode } from '@/shared/redux/reducer/workScheduleSlice'
import { updateWorkSchedule } from '@/shared/api/firebase/services/workScheduleService'
import { eventCategories, weekDays } from '../constants'
import styled from 'styled-components'
import Modal from '@/shared/components/modal/Modal'
import Button from '@/shared/components/button/Button'
import { useWorkSchedule } from '@/shared/hooks/useWorkSchedule'
import { EventModalCatLabel } from './AddEventModal'

export default function EditEventModal() {
  const dispatch = useDispatch()
  const modalEditMode = useSelector(({ workSchedule }) => workSchedule.modalEditMode)
  const editEventId = useSelector(({ workSchedule }) => workSchedule.editEventId)
  const calendarEvents = useSelector(({ workSchedule }) => workSchedule.calendarEvents)
  const editEvent = calendarEvents.find((event) => event.docId === editEventId)
  const { fetchWorkSchedules } = useWorkSchedule()

  const {
    description: editDescription,
    eventCategory: editEventCategory,
    name,
    year,
    month,
    day,
    weekday: editWeekday,
  } = editEvent
  const inputRef = useRef(null) // 일정 설명 input box focus 용
  const [description, setDescription] = useState(() => editDescription) // 일정 설명
  const [selectedCategory, setSelectedCategory] = useState(() => editEventCategory) // 선택된 카테고리

  // 모달 제목(연/월/일/요일)
  const handleTitle = useMemo(() => {
    if (!modalEditMode) return null

    return `${year}년 ${month + 1}월 ${day}일 (${weekDays[editWeekday]})`
  }, [editEvent])
  1
  // 일정 수정 submit
  const handleEditEvent = useCallback(() => {
    const editWorkSchedule = {
      editEventId,
      editEventData: {
        id: editEventId,
        name,
        year,
        month,
        day,
        weekday: editWeekday,
        eventCategory: selectedCategory,
        description,
      },
    }

    updateWorkSchedule(editWorkSchedule)
      .then(() => {
        fetchWorkSchedules()
      })
      .catch((error) => {
        console.error('문서 추가 중 오류 발생:', error)
      })

    // 입력 필드 초기화 후 모달 닫기
    setDescription('')
    setSelectedCategory('personal')
    dispatch(setModalEditMode(false))
  }, [editEvent, editEventId, description, selectedCategory])

  useEffect(() => {
    // 모달 열리면 description 필드 포커스 주기
    if (modalEditMode && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus()
      }, 100)
    }
  }, [modalEditMode])

  if (!modalEditMode || !editEvent) return null
  return (
    <Modal
      isOpen={modalEditMode}
      onClose={() => dispatch(setModalEditMode(false))}
      title={handleTitle}
      width="50rem"
    >
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
          <Button className="modalAddEventButton" variant="primary" onClick={handleEditEvent}>
            일정 수정
          </Button>
        </div>
      </ModalChildren>
    </Modal>
  )
}

const ModalChildren = styled.div.withConfig({
  displayName: 'modal-edit-mode-children',
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
