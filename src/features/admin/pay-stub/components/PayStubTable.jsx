import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getCollectionWithFilter } from '../api/getCollectionWithFilter'
import { useSelector } from 'react-redux'
import { formatNumberWithComma } from '@/shared/utils/comma'
import {
  ADDITIONALALLOWANCE,
  BASICSALARY,
  CALC_EMPLOYMENTINSURANCE,
  CALC_HEALTHINSURANCE,
  CALC_INCOMETAX,
  CALC_LOCALINCOMETAX,
  CALC_LONGTERMCAREINSURANCE,
  CALC_NATIONALPENSION,
  EMPLOYMENTINSURANCE,
  HEALTHINSURANCE,
  INCOMETAX,
  LOCALINCOMETAX,
  LONGTERMCAREINSURANCE,
  MEALALLOWANCE,
  NATIONALPENSION,
} from '../constants/payStub'

export default function PayStubTable({ checkedUsers, setCheckedUsers, isLoading }) {
  const [users, setUsers] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [checkedRows, setcheckedRows] = useState([])
  const date = useSelector((state) => state.payStub.date)

  const checkAll = () => {
    if (!isChecked) {
      const uncheckedRows = users
        .map((user, index) => ({ user, index }))
        .filter(({ user }) => !user.merge)
        .map(({ index }) => index)

      setcheckedRows(uncheckedRows)
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
    updatedUsers[rowIndex][field] = +rawValue

    const paymentItems =
      +updatedUsers[rowIndex][BASICSALARY] +
      +updatedUsers[rowIndex][MEALALLOWANCE] +
      +updatedUsers[rowIndex][ADDITIONALALLOWANCE]

    updatedUsers[rowIndex][NATIONALPENSION] = CALC_NATIONALPENSION(paymentItems) // 국민연금
    updatedUsers[rowIndex][HEALTHINSURANCE] = CALC_HEALTHINSURANCE(paymentItems) // 건강보험
    updatedUsers[rowIndex][LONGTERMCAREINSURANCE] = CALC_LONGTERMCAREINSURANCE(paymentItems) // 장기요양보험
    updatedUsers[rowIndex][EMPLOYMENTINSURANCE] = CALC_EMPLOYMENTINSURANCE(paymentItems) // 고용보험
    updatedUsers[rowIndex][INCOMETAX] = CALC_INCOMETAX(paymentItems) // 근로소득세
    updatedUsers[rowIndex][LOCALINCOMETAX] = CALC_LOCALINCOMETAX(paymentItems) // 지방소득세

    setUsers(updatedUsers)
  }

  useEffect(() => {
    async function getUsers(payDate) {
      const data = await getCollectionWithFilter('payrollManagement', payDate)

      setUsers(data)
    }

    getUsers(date)
  }, [date, isLoading])

  useEffect(() => {
    setCheckedUsers(users.filter((_, index) => checkedRows.includes(index)))
    // setCheckedUsers(checkedRows.map((index) => users[index]))
  }, [checkedRows, users, setCheckedUsers])

  return (
    <TableContainer>
      <StyledTable>
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <TableHeader>
          <tr>
            <StyledTh rowSpan="2">
              <input type="checkbox" checked={isChecked} onChange={checkAll} />
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
        </TableHeader>
        <TableBody>
          {users.map((user, rowIndex) => (
            <tr key={rowIndex}>
              <StyledTd className="align-center">
                <input
                  type="checkbox"
                  checked={checkedRows.includes(rowIndex) || user.merge}
                  onChange={(e) => checkHandler(e, rowIndex)}
                  disabled={!!user.merge}
                />
              </StyledTd>
              <StyledTd className="align-center">
                {formatNumberWithComma(user.employeeName)}
              </StyledTd>
              <StyledTd className="align-center">
                <Input
                  value={formatNumberWithComma(user.basicSalary) /*기본급*/}
                  onChange={(e) => handleCellChange(rowIndex, BASICSALARY, e.target.value)}
                  $userMerged={!!user.merge}
                  disabled={!!user.merge}
                />
              </StyledTd>
              <StyledTd>
                {formatNumberWithComma(user.mealAllowance) /*식비 user.mealAllowance*/}
              </StyledTd>
              <StyledTd className="align-center">
                <Input
                  value={formatNumberWithComma(user.additionalAllowance) /*추가수당*/}
                  onChange={(e) => handleCellChange(rowIndex, ADDITIONALALLOWANCE, e.target.value)}
                  $userMerged={!!user.merge}
                  disabled={!!user.merge}
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
        </TableBody>
        <TableFooter>
          <tr>
            <StyledTd className="align-center">합계</StyledTd>
            <StyledTd className="footer-point-color align-center">{checkedRows.length}명</StyledTd>
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
          </tr>
        </TableFooter>
      </StyledTable>
    </TableContainer>
  )
}

// 테이블 컨테이너 스타일
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--point-gray);
  height: calc(100% - 6rem);
  overflow: auto;
`

const StyledTable = styled.table`
  table-layout: auto;
  text-align: center;
  position: relative;

  border-collapse: separate;
  border-spacing: 0;

  col:nth-child(1) {
    width: 5%;
    min-width: 60px;
  }
  col:nth-child(2) {
    width: 5%;
    min-width: 100px;
    border-right: none;
  }
  col:nth-child(n + 3) {
    width: auto;
    min-width: 120px;
  }

  thead th,
  tfoot td {
    vertical-align: middle;
    padding: 1.8rem 1rem;
  }

  tbody td,
  tfoot td {
    text-align: right;
  }

  .align-center {
    text-align: center;
  }
`
const cellStyle = `
  border-bottom: 1px solid var(--point-gray);
  border-right: 1px solid var(--point-gray);
  padding: 1rem;

  &:last-child {
    border-right: none;
  }
`
const StyledTh = styled.th`
  ${cellStyle}
`

const StyledTd = styled.td`
  ${cellStyle}
`

const Input = styled.input`
  max-width: 14rem;
  padding: 0.6rem 1rem;
  border-radius: 0.8rem;
  border: 1px solid #d9d9d9;
  outline: none;
  background: ${(props) => (props.$userMerged ? 'var(--background-main)' : 'transparent')};
  text-align: right;

  &:disabled {
    color: var(--font-sub);
    cursor: no-drop;
  }
`

const TableHeader = styled.thead`
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--background-main);
`

const TableBody = styled.tbody`
  tr:last-child {
    td {
      border-bottom: none;
    }
  }
`

const TableFooter = styled.tfoot`
  background: var(--background-main);
  font-weight: 600;
  text-align: center;
  position: sticky;
  bottom: 0;
  z-index: 1;

  .footer-point-color {
    color: var(--main);
  }

  td {
    border-top: 1px solid var(--point-gray);
  }
`
