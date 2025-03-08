import styled from 'styled-components'
import { eventCategories } from '../constants'
import { getEventCategoryColor } from '../utils'

const SidebarEventItem = ({ event, onDelete }) => {
  console.log(' EventItem ~ categoryColor: ', event)
  return (
    <StyledEventItem
      key={event.id}
      className="eventItem"
      $categoryColor={getEventCategoryColor(eventCategories, event.eventCategory)}
    >
      <span className="eventDot" aria-hidden="true" />
      <article className="eventInfo">
        <header>
          <h3 className="eventTitle">{event.title}</h3>
        </header>
        <p className="eventDescription">{event.description || '설명이 없습니다.'}</p>
      </article>
      <button className="deleteButton" onClick={() => onDelete(event.id)} aria-label="일정 삭제">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
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
  padding: 0.75rem;
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  position: relative;

  .eventDot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: ${({ $categoryColor }) => ($categoryColor ? $categoryColor : '#3b82f6')};
  }

  .eventInfo {
    flex: 1;
    padding-right: 2rem;

    .eventTitle {
      font-weight: 500;
      color: #1e293b;
      margin-bottom: 0.25rem;
    }

    .eventDescription {
      font-size: 1.2rem;
      color: #64748b;
    }
  }

  .deleteButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    /* height: 3.5rem; */
    color: var(--point-gray);
    background-color: transparent;
    border-radius: 0.375rem;
    transition: all 0.2s;
    border: none;
    cursor: pointer;

    &:hover {
      color: var(--point-red);
    }
  }
`
