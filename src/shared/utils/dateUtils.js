// ISO 8601 형식의 날짜 문자열을 'yyyy.mm.dd' 형식으로 변환
const formatDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export default formatDate