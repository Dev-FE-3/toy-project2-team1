import { useEffect, useState } from 'react';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '@/shared/api/firebase/firebase'
import styled from 'styled-components'

export function Table() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const employeeId = 'EMP011'; // 추후 로그인 정보에서 employeeId 값 가져올 예정
        const q = query(
          collection(db, "payrollCorrections"),
          where('employeeId', '==', employeeId),
        )
        const querySnapshot = await getDocs(q);
        
        const fetchedData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(fetchedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // 상태에 따라 라벨 색상 결정
  const getColorByStatus = (approvalStatus) => {
    switch (approvalStatus) {
      case "승인":
        return "purple";
      case "반려":
        return "red";
      default:
        return "gray"; // 기본 색상
    }
  };

  if (isLoading) return console.log('로딩중입니다.')
  if (error) return console.error('error: ',error)

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
          {data.map((item) => (
            <Tr key={item.id}>
              <Td width='10%'><span>{item.requestType}</span></Td>
              <Td width='16%'><span>{formatDate(item.requestDate)}</span></Td>
              <Td width='62%'><span>{item.requestContent}</span></Td>
              <Td width='10rem'>
                <Label color={getColorByStatus(item.approvalStatus)}>{item.approvalStatus}</Label>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableWrap>
    </TableContainer>
  )
}

const TableContainer = styled.div`
  margin-top: 1.2rem;
  max-height: 58rem;
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
  height: 5.2rem;
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