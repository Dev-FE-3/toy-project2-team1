// 공통 utils
function getDate(part) {
  const date = new Date()

  switch (part) {
    case 'year':
      return date.getFullYear()
    case 'month':
      return date.getMonth() + 1 // JavaScript 월은 0부터 시작하므로 +1 필요
    case 'day':
      return date.getDate()
    default:
      throw new Error("Invalid parameter. Use 'year', 'month', or 'day'.")
  }
}

export default getDate
