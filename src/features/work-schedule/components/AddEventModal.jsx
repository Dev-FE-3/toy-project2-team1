import styled from 'styled-components'
import { weekDays, eventCategories } from '../constants'

const AddEventModal = ({
  isOpen,
  selectedDate,
  selectedCategory,
  setSelectedCategory,
  onClose,
  onAddEvent,
}) => {
  if (!isOpen || !selectedDate) return null

  return (
    <Modal>
      <div className="modalContent">
        <button className="modalCloseButton" onClick={onClose}>
          {/* 모달 닫기 버튼 */}
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
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="modalTitle">
          {`${selectedDate.year}년 ${selectedDate.month + 1}월 ${selectedDate.day}일 (${
            weekDays[selectedDate.weekday]
          })`}
        </div>

        <div className="modalDescription">{`이 날의 일정을 추가하거나 확인하세요.`}</div>

        <div className="categorySelector">
          {eventCategories.map((category) => (
            <button
              key={category.eventCategory}
              className={`categoryButton ${
                selectedCategory === category.eventCategory ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory(category.eventCategory)}
              style={{ backgroundColor: category.categoryColor }}
            >
              {category.categoryName}
            </button>
          ))}
        </div>

        <div className="modalButtonContainer">
          <button className="cancelButton" onClick={onClose}>
            취소
          </button>

          <button className="modalAddEventButton" onClick={onAddEvent}>
            일정 추가
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default AddEventModal

const Modal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  .modalContent {
    position: relative;
    width: 100%;
    max-width: 28rem;
    border-radius: 0.5rem;
    background-color: white;
    padding: 1.5rem;
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);

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
        color: white;
        font-size: 1.2rem;
        opacity: 0.7;
        transition: all 0.2s;

        &:hover {
          opacity: 0.9;
        }

        &.active {
          opacity: 1;
        }
      }
    }

    .modalButtonContainer {
      display: flex;
      justify-content: flex-end;

      .cancelButton {
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

      .modalAddEventButton {
        border-radius: 0.5rem;
        background-image: linear-gradient(to right, #06b6d4, #3b82f6);
        padding: 0.5rem 1rem;
        font-size: 1.2rem;
        font-weight: 500;
        color: white;

        &:hover {
          background-image: linear-gradient(to bottom left, #06b6d4, #3b82f6);
        }
      }
    }
  }
`
