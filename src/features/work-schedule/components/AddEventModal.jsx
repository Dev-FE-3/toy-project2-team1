import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { weekDays, eventCategories } from '../constants'
import Modal from '@/shared/components/modal/Modal'
import Button from '@/shared/components/button/Button'

const AddEventModal = ({ isOpen, selectedDate, onClose, onAddEvent }) => {
  const [description, setDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('personal') // 선택된 카테고리

  const handleTitle = useMemo(() => {
    if (!isOpen || !selectedDate) return null

    return `${selectedDate.year}년 ${selectedDate.month + 1}월 ${selectedDate.day}일 (${
      weekDays[selectedDate.weekday]
    })`
  }, [selectedDate])

  const handleAddEvent = (e) => {
    const { year, month, day } = selectedDate

    // 입력 필드 초기화
    setDescription('')
    setSelectedCategory('personal')

    // 이벤트 추가
    onAddEvent(e, {
      year,
      month,
      day,
      eventCategory: selectedCategory,
      description,
    })
  }

  if (!isOpen || !selectedDate) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={handleTitle} width="50rem">
      <ModalChildren>
        <input
          type="text"
          className="descriptionInput"
          placeholder="일정에 대한 설명을 입력하세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="categorySelector">
          {/* 카테고리 선택 버튼 */}
          {eventCategories.map((category) => (
            <Button
              key={category.eventCategory}
              $variant={category.categoryStyle}
              className={`categoryButton ${
                selectedCategory === category.eventCategory ? 'active' : 'inactive'
              }`}
              onClick={() => setSelectedCategory(category.eventCategory)}
            >
              {category.categoryName}
            </Button>
          ))}
        </div>

        <div className="modalButtonContainer">
          <button className="cancelButton" onClick={onClose}>
            취소
          </button>

          <button className="modalAddEventButton" onClick={handleAddEvent}>
            일정 추가
          </button>
        </div>
      </ModalChildren>
    </Modal>
  )
}

export default AddEventModal

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
        /* background-color: red; */
      }
    }
  }

  .modalButtonContainer {
    display: flex;
    justify-content: flex-end;

    .cancelButton,
    .modalAddEventButton {
      margin-right: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid #d1d5db;
      background-color: white;
      padding: 0.5rem 1rem;
      font-size: 1.2rem;
      font-weight: 500;
      color: #6b7280;

      &:hover {
        background-color: #f3f4f6;
      }
    }
  }
`
