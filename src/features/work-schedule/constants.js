import moment from 'moment'

// 기본 상수
export const thisYear = moment().year() // 이번 년도
export const thisMonth = moment().month() // 이번 달
export const today = moment().date() // 일

// 달 이름 상수
export const monthNames = [
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
export const weekDays = ['일', '월', '화', '수', '목', '금', '토']

// 이벤트 분류
export const eventCategories = [
  { eventCategory: 'personal', categoryName: '개인 일정', categoryColor: '#ef4444' },
  { eventCategory: 'work', categoryName: '업무', categoryColor: '#3b82f6' },
  { eventCategory: 'closed', categoryName: '휴무', categoryColor: '#44e93c' },
]
