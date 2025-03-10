import styled from 'styled-components'
import { eventCategories } from '../constants'
import { getEventCategoryColor } from '../utils'
import { useDispatch } from 'react-redux'
import { setModalEditMode, setEditEventId } from '@/shared/redux/reducer/workScheduleSlice'
import { deleteWorkSchedule } from '@/shared/api/firebase/services/workScheduleService'

const SidebarEventItem = ({ event }) => {
  const dispatch = useDispatch()

  // 일정 수정 모달 활성화
  const handleEditEvent = (e) => {
    e.preventDefault()
    dispatch(setEditEventId({ id: event.docId }))
    dispatch(setModalEditMode(true))
  }

  // 일정 삭제
  const handleDeleteEvent = () => {
    deleteWorkSchedule(event.docId).then(() => {
      // 삭제 후 일정 목록 갱신
      // dispatch(deleteCalendarEvents({ docId: event.docId }))
    })
  }

  return (
    <StyledEventItem
      className="eventItem"
      $categoryColor={getEventCategoryColor(eventCategories, event.eventCategory)}
    >
      {/* 일정 카테고리에 따른 색상 표현 */}
      <span className="eventDot" aria-hidden="true" />
      <article className="eventInfo">
        <header>
          <h3 className="eventTitle">{event.name}</h3>
        </header>
        <p className="eventDescription">{event.description || '설명이 없습니다.'}</p>
      </article>
      {/* 일정 수정 버튼 */}
      <div className="btnContainer">
        <button className="editButton" onClick={handleEditEvent} aria-label="일정 수정">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={`2`}
            aria-hidden="true"
          >
            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
          </svg>
        </button>
        {/* 일정 삭제 버튼 */}
        <button className="deleteButton" onClick={handleDeleteEvent} aria-label="일정 삭제">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </StyledEventItem>
  )
}

export default SidebarEventItem

const StyledEventItem = styled.article.withConfig({
  displayName: 'StyledEventItem',
})`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.8rem;
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  position: relative;

  .eventDot {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: ${({ $categoryColor }) => ($categoryColor ? $categoryColor : '#3b82f6')};
  }

  .eventInfo {
    flex: 1;
    margin-left: 0.8rem;
    min-width: 0;

    & header {
      margin-bottom: 0.8rem;
    }

    .eventTitle {
      font-weight: 500;
      color: #1e293b;
      margin-bottom: 0.25rem;
    }

    .eventDescription {
      font-size: 1.2rem;
      color: #64748b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }
  }

  .btnContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    .editButton,
    .deleteButton {
      width: 3rem;
      /* height: 3.5rem; */
      color: var(--point-gray);
      background-color: transparent;
      border-radius: 0.375rem;
      transition: all 0.2s;
      border: none;
      cursor: pointer;
    }

    .editButton {
      &:hover {
        color: var(--point-yellow);
      }
    }

    .deleteButton {
      &:hover {
        color: var(--point-red);
      }
    }
  }
`
