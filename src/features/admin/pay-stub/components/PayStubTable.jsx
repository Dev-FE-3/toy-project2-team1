import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getCollectionWithFilter } from '../api/getCollectionWithFilter'
import { useSelector } from 'react-redux'
import { formatNumberWithComma } from '@/shared/utils/comma'

export default function PayStubTable({ checkedUsers, setCheckedUsers }) {
  const [users, setUsers] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [checkedRows, setcheckedRows] = useState([])
  const date = useSelector((state) => state.payStub.date)

  const checkAll = () => {
    if (!isChecked) {
      const length = users.length
      setcheckedRows(Array.from({ length }, (_, i) => i))
    } else {
      setcheckedRows([])
    }
    setIsChecked((prev) => !prev)
  }

  const checkHandler = (e, rowIndex) => {
    if (e.target.checked) {
      setcheckedRows((prev) => [...prev, rowIndex]) // 체크된 row 추가
    } else {
      setcheckedRows((prev) => prev.filter((index) => index !== rowIndex)) // 체크 해제된 row 제거
    }
  }

  const handleCellChange = (rowIndex, field, value) => {
    const rawValue = value.replace(/,/g, '')

    const updatedUsers = [...users]
    updatedUsers[rowIndex][field] = rawValue

    const paymentItems =
      +updatedUsers[rowIndex]['basicSalary'] +
      +updatedUsers[rowIndex]['mealAllowance'] +
      +updatedUsers[rowIndex]['additionalAllowance']

    updatedUsers[rowIndex]['nationalPension'] = Math.ceil(paymentItems * 0.045) // 국민연금
    updatedUsers[rowIndex]['healthInsurance'] = Math.ceil(paymentItems * 0.03545) // 건강보험
    updatedUsers[rowIndex]['longTermCareInsurance'] = Math.ceil(paymentItems * 0.00459) // 장기요양보험
    updatedUsers[rowIndex]['employmentInsurance'] = Math.ceil(paymentItems * 0.009) // 고용보험
    updatedUsers[rowIndex]['incomeTax'] = Math.ceil(paymentItems * 0.05) // 근로소득세
    updatedUsers[rowIndex]['localIncomeTax'] = Math.ceil(paymentItems * 0.005) // 지방소득세

    setUsers(updatedUsers)
  }

  useEffect(() => {
    async function getUsers(payDate) {
      const data = await getCollectionWithFilter('payrollManagement', payDate)

      setUsers(data)
    }

    getUsers(date)
  }, [date])

  useEffect(() => {
    setCheckedUsers(users.filter((_, index) => checkedRows.includes(index)))
    // setCheckedUsers(checkedRows.map((index) => users[index]))
  }, [checkedRows, users, setCheckedUsers])

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh rowSpan="2" style={{ width: '90px' }}>
              <input type="checkbox" checked={isChecked} onChange={checkAll} />
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
                  checked={checkedRows.includes(rowIndex)}
                  onChange={(e) => checkHandler(e, rowIndex)}
                />
              </StyledTd>
              <StyledTd>{formatNumberWithComma(user.employeeName)}</StyledTd>
              <StyledTd>
                <Input
                  value={formatNumberWithComma(user.basicSalary) /*기본급*/}
                  onChange={(e) => handleCellChange(rowIndex, 'basicSalary', e.target.value)}
                />
              </StyledTd>
              <StyledTd>
                {formatNumberWithComma(user.mealAllowance) /*식비 user.mealAllowance*/}
              </StyledTd>
              <StyledTd>
                <Input
                  value={formatNumberWithComma(user.additionalAllowance) /*추가수당*/}
                  onChange={(e) =>
                    handleCellChange(rowIndex, 'additionalAllowance', e.target.value)
                  }
                />
              </StyledTd>
              <StyledTd>{formatNumberWithComma(user.nationalPension) /*국민연금*/}</StyledTd>
              <StyledTd>{formatNumberWithComma(user.healthInsurance) /*건강보험*/} </StyledTd>
              <StyledTd>
                {formatNumberWithComma(user.longTermCareInsurance) /*장기요양보험*/}
              </StyledTd>
              <StyledTd>{formatNumberWithComma(user.employmentInsurance) /*고용보험*/}</StyledTd>
              <StyledTd>{formatNumberWithComma(user.incomeTax) /*근로소득세*/}</StyledTd>
              <StyledTd>{formatNumberWithComma(user.localIncomeTax) /*지방소득세*/}</StyledTd>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <FooterRow>
            <StyledTd>합계</StyledTd>
            <StyledTd className="footer-point-color">{checkedRows.length}명</StyledTd>
            <StyledTd>
              {formatNumberWithComma(
                checkedUsers.reduce((acc, user) => acc + +user.basicSalary, 0),
              )}
            </StyledTd>
            <StyledTd>
              {formatNumberWithComma(
                checkedUsers.reduce((acc, user) => acc + +user.mealAllowance, 0),
              )}
            </StyledTd>
            <StyledTd>
              {formatNumberWithComma(
                checkedUsers.reduce((acc, user) => acc + +user.additionalAllowance, 0),
              )}
            </StyledTd>
            <StyledTd>
              {formatNumberWithComma(
                checkedUsers.reduce((acc, user) => acc + +user.nationalPension, 0),
              )}
            </StyledTd>
            <StyledTd>
              {formatNumberWithComma(
                checkedUsers.reduce((acc, user) => acc + +user.healthInsurance, 0),
              )}
            </StyledTd>
            <StyledTd>
              {formatNumberWithComma(
                checkedUsers.reduce((acc, user) => acc + +user.longTermCareInsurance, 0),
              )}
            </StyledTd>
            <StyledTd>
              {formatNumberWithComma(
                checkedUsers.reduce((acc, user) => acc + +user.employmentInsurance, 0),
              )}
            </StyledTd>
            <StyledTd>
              {formatNumberWithComma(checkedUsers.reduce((acc, user) => acc + +user.incomeTax, 0))}
            </StyledTd>
            <StyledTd>
              {formatNumberWithComma(
                checkedUsers.reduce((acc, user) => acc + +user.localIncomeTax, 0),
              )}
            </StyledTd>
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
  padding-left: 1rem;
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
