import moment from 'moment'

// 해당 연도의 모든 날짜 생성
export const generateDaysInYear = (targetYear) => {
  const daysInYear = []

  // 1. 해당 연도 1월 1일의 요일 구하기 (0: 일요일 ~ 6: 토요일)
  const firstDayOfYear = moment([targetYear, 0, 1]).day()

  // 2. 첫 주의 이전 달 날짜 채우기
  if (firstDayOfYear > 0) {
    // 이전 달(12월)의 마지막 날짜들
    const prevMonth = moment([targetYear - 1, 11])
    const daysInPrevMonth = prevMonth.daysInMonth()

    for (let i = 0; i < firstDayOfYear; i++) {
      const day = daysInPrevMonth - firstDayOfYear + i + 1
      daysInYear.push({ month: -1, day })
    }
  }

  // 3. 현재 연도의 모든 날짜 추가 (1월~12월)
  for (let m = 0; m < 12; m++) {
    // 해당 월의 총 일수 계산
    const daysInMonth = moment([targetYear, m]).daysInMonth()

    // 해당 월의 모든 날짜 추가
    for (let d = 1; d <= daysInMonth; d++) {
      daysInYear.push({ month: m, day: d })
    }
  }

  // 4. 마지막 주 채우기 (다음 달 날짜로)
  const remainingDays = daysInYear.length % 7
  if (remainingDays > 0) {
    const daysToAdd = 7 - remainingDays
    for (let d = 1; d <= daysToAdd; d++) {
      daysInYear.push({ month: 12, day: d }) // 다음 해 1월
    }
  }

  return daysInYear
}

// 달력 데이터를 주 단위로 그룹화
export const generateCalendarWeeks = (data) => {
  const weeksOfYear = []
  for (let i = 0; i < data.length; i += 7) {
    weeksOfYear.push(data.slice(i, i + 7))
  }

  return weeksOfYear
}

// 이벤트 카테고리 색상 반환 함수
export const getEventCategoryColor = (eventCategory, categories) => {
  const cat = categories.find((c) => c.eventCategory === eventCategory)
  return cat ? cat.categoryColor : '#676767'
}
