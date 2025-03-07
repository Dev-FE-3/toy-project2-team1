import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getCollectionWithFilter } from '../api/getCollectionWithFilter'
import { useSelector } from 'react-redux'
import { formatNumberWithComma } from '@/shared/utils/comma'

export default function PayStubTable() {
  const cols = 11

  const [users, setUsers] = useState([])
  const [rows, setRows] = useState(0)
  const [checkedList, setCheckedList] = useState([])
  const date = useSelector((state) => state.payStub.date)

  const checkHandler = (e, rowIndex) => {
    if (e.target.checked) {
      setCheckedList((prev) => [...prev, rowIndex]) // 체크된 row 추가
    } else {
      setCheckedList((prev) => prev.filter((index) => index !== rowIndex)) // 체크 해제된 row 제거
    }
  }

  const handleCellChange = (rowIndex, field, value) => {
    const rawValue = value.replace(/,/g, '')
    const formattedValue = formatNumberWithComma(rawValue)

    const updatedUsers = [...users]
    updatedUsers[rowIndex][field] = formattedValue

    setUsers(updatedUsers)
  }

  const handleSubmit = () => {
    const selectedUsers = users.filter((_, index) => checkedList.includes(index))
    console.log('선택된 사용자:', selectedUsers)

    // 여기에서 API 요청으로 데이터 전송 가능
  }

  useEffect(() => {
    async function getUsers(payDate) {
      const data = await getCollectionWithFilter('payrollManagement', payDate)

      setUsers(data)
      setRows(data.length)
    }

    getUsers(date)
  }, [date])

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh rowSpan="2" style={{ width: '90px' }}>
              <input type="checkbox" />
            </StyledTh>
            <StyledTh rowSpan="2" style={{ width: '103px' }}>
              이름
            </StyledTh>
            <StyledTh colSpan="3" style={{ width: '540px' }}>
              지급항목
            </StyledTh>
            <StyledTh colSpan="6" style={{ width: '750px' }}>
              공제항목
            </StyledTh>
          </tr>
          <tr>
            <StyledTh style={{ width: '180px' }}>기본급</StyledTh>
            <StyledTh>식비</StyledTh>
            <StyledTh style={{ width: '180px' }}>추가수당</StyledTh>
            <StyledTh>국민연금</StyledTh>
            <StyledTh>건강보험</StyledTh>
            <StyledTh>장기요양보험</StyledTh>
            <StyledTh>고용보험</StyledTh>
            <StyledTh>근로소득세</StyledTh>
            <StyledTh>지방소득세</StyledTh>
          </tr>
        </thead>
        <tbody>
          {users.map((user, rowIndex) => (
            <tr key={rowIndex}>
              <StyledTd>
                <input
                  type="checkbox"
                  checked={checkedList.includes(rowIndex)}
                  onChange={(e) => checkHandler(e, rowIndex)}
                />
              </StyledTd>
              <StyledTd>{formatNumberWithComma(user.employeeName)}</StyledTd>
              <StyledTd>
                <Input
                  value={formatNumberWithComma(user.basicSalary)}
                  onChange={(e) => handleCellChange(rowIndex, 'basicSalary', e.target.value)}
                />
              </StyledTd>
              <StyledTd>{formatNumberWithComma(user.mealAllowance)}</StyledTd>
              <StyledTd>
                <Input
                  value={formatNumberWithComma(user.additionalAllowance)}
                  onChange={(e) =>
                    handleCellChange(rowIndex, 'additionalAllowance', e.target.value)
                  }
                />
              </StyledTd>
              <StyledTd>{formatNumberWithComma(user.nationalPension)}</StyledTd>
              <StyledTd>{formatNumberWithComma(user.healthInsurance)}</StyledTd>
              <StyledTd>{formatNumberWithComma(user.longTermCareInsurance)}</StyledTd>
              <StyledTd>{formatNumberWithComma(user.employmentInsurance)}</StyledTd>
              <StyledTd>{formatNumberWithComma(user.incomeTax)}</StyledTd>
              <StyledTd>{formatNumberWithComma(user.localIncomeTax)}</StyledTd>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <FooterRow>
            <StyledTd>합계</StyledTd>
            <StyledTd className="footer-point-color">{rows}명</StyledTd>
            {Array.from({ length: cols - 2 }).map((_, index) => (
              <StyledTd key={index}>계산</StyledTd>
            ))}
          </FooterRow>
        </tfoot>
      </StyledTable>
    </TableContainer>
  )
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
