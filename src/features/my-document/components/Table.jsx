import styled from 'styled-components'

export function Table() {
  const data = [
    { category: '급여정정', date: '2025.02.24', content: '지난달 근무 내역 확인 요청', status: '결재대기' },
    { category: '급여정정', date: '2025.02.24', content: '지난달 근무 내역 확인 요청', status: '결재대기' },
    { category: '급여정정', date: '2025.02.24', content: '지난달 근무 내역 확인 요청', status: '결재대기' },
    { category: '급여정정', date: '2025.02.24', content: '지난달 근무 내역 확인 요청', status: '반려' },
    { category: '급여정정', date: '2025.02.24', content: '지난달 근무 내역 확인 요청', status: '승인' },
    { category: '급여정정', date: '2025.02.24', content: '지난달 근무 내역 확인 요청', status: '승인' },
    { category: '급여정정', date: '2025.02.24', content: '지난달 근무 내역 확인 요청', status: '승인' },
    { category: '급여정정', date: '2025.02.24', content: '지난달 근무 내역 확인 요청', status: '반려' },
    { category: '급여정정', date: '2025.02.24', content: '지난달 근무 내역 확인 요청', status: '승인' },
    { category: '급여정정', date: '2025.02.24', content: '지난달 근무 내역 확인 요청', status: '승인' },
  ]

  // 상태에 따라 라벨 색상 결정
  const getColorByStatus = (status) => {
    switch (status) {
      case "승인":
        return "purple";
      case "반려":
        return "red";
      default:
        return "gray"; // 기본 색상
    }
  };

  return (
    <TableContainer>
      <TableWrap>
        <Thead>
          <Tr>
            <Th width='10%'><span>분류</span></Th>
            <Th width='16%'><span>신청일</span></Th>
            <Th width='62%'><span>내용</span></Th>
            <Th width='10rem'><span>결재상태</span></Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* firebase 데이터 불러올 예정 */}
          {data.slice(0, 10).map((item, index) => (
            <Tr key={index}>
              <Td width='10%'><span>{item.category}</span></Td>
              <Td width='16%'><span>{item.date}</span></Td>
              <Td width='62%'><span>{item.content}</span></Td>
              <Td width='10rem'>
                <Label color={getColorByStatus(item.status)}>{item.status}</Label>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableWrap>
    </TableContainer>
  )
}

const TableContainer = styled.div`
  margin-top: 1.8rem;
  max-height: 60rem;
  overflow-y: auto;
  overflow-x: hidden;
`
const TableWrap = styled.table`
  width: 100%;
  font-size: 1.4rem;
`
const Thead = styled.thead`
  background-color: var(--background-main);
  font-weight: 600;
  border-top: 1px solid var(--point-gray);
`
const Tbody = styled.tbody`
`
const Tr = styled.tr`
  display: flex;
  align-items: center;
  height: 5.4rem;
  border-bottom: 1px solid var(--point-gray);
  &:last-child td {
    border-bottom: none;
  }
`
const Th = styled.th`
  flex: ${props => props.width ? `0 0 ${props.width}` : '1'};
  text-align: center;
  
`
const Td = styled.td`
  flex: ${props => props.width ? `0 0 ${props.width}` : '1'};
  text-align: center;
`
const Label = styled.span`
  border-radius: .4rem;
  display: inline-block;
  width: 9rem;
  padding: .6rem 0;
  font-weight: 500;
  ${props => {
  switch(props.color) {
    case 'red':
      return `
        background-color:rgba(238, 83, 79, 0.10);
        color:var(--point-red);
      `;
    case 'purple':
      return `
        background-color:var(--background-sub);
        color:var(--main);
      `;
    default:
      return `
        background-color: var(--background-main);
        color: var(--font-sub);
      `;
  }
}}
`