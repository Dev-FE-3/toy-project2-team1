// 공통 utils
export function getDate(part) {
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

// ISO 8601 형식의 날짜 문자열을 'yyyy.mm.dd' 형식으로 변환
export const formatDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};