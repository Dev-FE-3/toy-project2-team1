import styled from 'styled-components'
import summary from '../utils/payStubSummary'

export default function PayDetail({ data }) {
  return (
    <Details>
      <DetailItem>
        <DetailItemTitle>지급내역</DetailItemTitle>
        <DetailItemContent>
          <li>
            <span className="label">기본급</span>
            <span className="amount">{data.basicSalary.toLocaleString()}원</span>
          </li>
          <li>
            <span className="label">식비</span>
            <span className="amount">{data.mealAllowance.toLocaleString()}원</span>
          </li>
          <li>
            <span className="label">추가수당</span>
            <span className="amount">{data.additionalAllowance.toLocaleString()}원</span>
          </li>
          <li className="total">
            <span className="label">지급 총액</span>
            <span className="amount">{summary(data).totalPayment.toLocaleString()}원</span>
          </li>
        </DetailItemContent>
      </DetailItem>
      <DetailItem>
        <DetailItemTitle>공제내역</DetailItemTitle>
        <DetailItemContent>
          <li>
            <span className="label">국민연금</span>
            <span className="amount">{data.nationalPension.toLocaleString()}원</span>
          </li>
          <li>
            <span className="label">건강보험</span>
            <span className="amount">{data.healthInsurance.toLocaleString()}원</span>
          </li>
          <li>
            <span className="label">장기요양보험</span>
            <span className="amount">{data.longTermCareInsurance.toLocaleString()}원</span>
          </li>
          <li>
            <span className="label">고용보험</span>
            <span className="amount">{data.employmentInsurance.toLocaleString()}원</span>
          </li>
          <li>
            <span className="label">근로소득세</span>
            <span className="amount">{data.incomeTax.toLocaleString()}원</span>
          </li>
          <li>
            <span className="label">지방소득세</span>
            <span className="amount">{data.localIncomeTax.toLocaleString()}원</span>
          </li>
          <li className="total">
            <span className="label">공제 총액</span>
            <span className="amount">{summary(data).totalDeduction.toLocaleString()}원</span>
          </li>
        </DetailItemContent>
      </DetailItem>
    </Details>
  )
}

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
`
const DetailItem = styled.div`
  width: 50%;
  min-width: 250px;
  padding: 4rem 2.4rem;
  flex: 1;
`
const DetailItemTitle = styled.div`
  position: relative;
  height: 24px;
  line-height: 24px;
  font-size: 2rem;
  font-weight: 700;
  padding-left: 1.5rem;
  margin-bottom: 3rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 24px;
    background-color: var(--point-red);
  }
`
const DetailItemContent = styled.ul`
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 0;
  }
  li:not(:last-child) {
    border-bottom: 1px solid #f3f3f5;
  }
  .amount {
    font-weight: 500;
  }
  .label {
    color: var(--font-sub);
  }
  li.total > * {
    font-weight: 700;
  }
`
