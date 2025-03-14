import moment from 'moment'

interface EventCategory {
  eventCategory: 'work' | 'personal' | 'closed' // 이벤트 카테고리
  categoryName: '개인' | '업무' | '휴무' // 카테고리 이름
  categoryStyle: 'primary' | 'secondary' | 'danger' // 카테고리 스타일
}

// 기본 상수
export const thisYear: number = moment().year() // 이번 년도
export const thisMonth: number = moment().month() // 이번 달
export const today: number = moment().date() // 일

// 달 이름 상수
export const monthNames: string[] = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
]

// 요일 상수
export const weekDays: string[] = ['일', '월', '화', '수', '목', '금', '토']

// 이벤트 분류
export const eventCategories: EventCategory[] = [
  { eventCategory: 'personal', categoryName: '개인', categoryStyle: 'primary' },
  { eventCategory: 'work', categoryName: '업무', categoryStyle: 'secondary' },
  { eventCategory: 'closed', categoryName: '휴무', categoryStyle: 'danger' },
]
