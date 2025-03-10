// timestamp => 'yyyy.mm.dd' 변환 함수
const formatDate = (timestamp) => {
  if(!timestamp || !timestamp.toDate) {
    return ''; // 유효하지 않은 timestamp일 경우 빈 문자열 반환
  }
  const date = timestamp.toDate();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default formatDate