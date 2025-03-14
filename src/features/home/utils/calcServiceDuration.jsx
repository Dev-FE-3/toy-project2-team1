export default function calcServiceDuration(today, hireDate) {
  // 근무 기간 계산
  const yearsDiff = today.getFullYear() - hireDate.getFullYear()
  const monthsDiff = today.getMonth() - hireDate.getMonth()
  const daysDiff = today.getDate() - hireDate.getDate()

  // 전체 근무 기간을 연도, 월, 일로 계산
  let years = yearsDiff
  let months = monthsDiff
  let days = daysDiff

  // 월 차이가 음수인 경우
  if (months < 0) {
    years -= 1 // 연도를 하나 줄임
    months += 12 // 12개월을 더함
  }

  // 일 차이가 음수인 경우
  if (days < 0) {
    months -= 1 // 월을 하나 줄임
    // 이전 월의 마지막 날을 구하여 일 수를 계산
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += lastMonth.getDate() // 이전 월의 일 수를 더함
  }

  return { years, months, days }
}
