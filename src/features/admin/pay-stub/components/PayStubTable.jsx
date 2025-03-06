import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getCollectionWithFilter } from '../api/getCollectionWithFilter'
import { useSelector } from 'react-redux'

async function getUsers(payDate) {
  await getCollectionWithFilter('payrollManagement', payDate)
}

export default function PayStubTable() {
  const date = useSelector((state) => state.payStub.date)

  const rows = 20
  const cols = 11
  // 초기 데이터 생성
  const initialData = Array.from({ length: rows }, () => Array(cols).fill(''))

  const [data, setData] = useState(initialData)

  // 셀 값 변경 핸들러
  const handleCellChange = (row, col, value) => {
    const newData = [...data]
    newData[row][col] = value
    setData(newData)
  }

  useEffect(() => {
    console.log(date)
  }, [date])

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh rowSpan="2">
              <input type="checkbox" />
            </StyledTh>
            <StyledTh rowSpan="2">이름</StyledTh>
            <StyledTh colSpan="3">지급항목</StyledTh>
            <StyledTh colSpan="6">공제항목</StyledTh>
          </tr>
          <tr>
            <StyledTh>기본급</StyledTh>
            <StyledTh>식비</StyledTh>
            <StyledTh>추가수당</StyledTh>
            <StyledTh>국민연금</StyledTh>
            <StyledTh>건강보험</StyledTh>
            <StyledTh>장기요양보험</StyledTh>
            <StyledTh>고용보험</StyledTh>
            <StyledTh>근로소득세</StyledTh>
            <StyledTh>지방소득세</StyledTh>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* 체크박스 컬럼 */}
              <StyledTd width="9rem">
                <input type="checkbox" />
              </StyledTd>

              {/* 실제 데이터 컬럼 (체크박스 제외) */}
              {row.slice(1).map((cell, colIndex) => {
                // Determine if this column should render an Input component
                const isEditable = colIndex === 1 || colIndex === 3 // 기본급 (2), 추가수당 (4)

                return (
                  <StyledTd key={colIndex + 1} width={getColumnWidth(colIndex + 1)}>
                    {isEditable ? (
                      <Input
                        value={cell}
                        onChange={(e) => handleCellChange(rowIndex, colIndex + 1, e.target.value)}
                      />
                    ) : (
                      (cell, '더미') // Render just the text for other columns
                    )}
                  </StyledTd>
                )
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <FooterRow>
            <StyledTd>합계</StyledTd>
            <StyledTd className="footer-point-color">{rows}명</StyledTd>
            {Array.from({ length: cols - 2 }).map((_, index) => (
              <StyledTd key={index} width="1.8rem">
                계산
              </StyledTd>
            ))}
          </FooterRow>
        </tfoot>
      </StyledTable>
    </TableContainer>
  )
}

// 각 열의 width를 반환하는 함수
const getColumnWidth = (colIndex) => {
  switch (colIndex) {
    case 1:
      return '10.3rem'
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      return '18rem'
    default:
      return 'auto'
  }
}

// 테이블 컨테이너 스타일
const TableContainer = styled.div`
  width: 1484px;
  height: 763px;
  border: 1px solid #ddd;
  overflow-y: auto;
  position: relative;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 1.6rem;
  position: relative;

  thead th {
    vertical-align: middle;
  }
`

const StyledTh = styled.th`
  background: var(--background-main);
  border: 1px solid var(--point-gray);
  padding: 1.8rem 2rem;
`

const StyledTd = styled.td`
  border: 1px solid var(--point-gray);
  padding: 1.8rem 2rem;
  width: ${(props) => props.width || 'auto'}; // width 값 적용
`

const Input = styled.input`
  width: 14rem;
  height: 3.4rem;
  border-radius: 0.8rem;
  border: 1px solid #d9d9d9;
  color: var(--font-sub);
  outline: none;
  background: transparent;
  font-size: 1.6rem;
`

const FooterRow = styled.tr`
  background: var(--background-main);
  font-weight: 600;
  text-align: center;
  position: sticky;
  bottom: 0;
  z-index: 1;

  .footer-point-color {
    color: var(--main);
  }
`
