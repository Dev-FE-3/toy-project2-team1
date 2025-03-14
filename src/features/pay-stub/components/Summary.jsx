import styled from 'styled-components'
import summary from '../utils/payStubSummary'
import { useSelector } from 'react-redux'

export default function Summary() {
  const { filteredData } = useSelector((state) => state.userPayStub)
  return (
    <SummaryContainer>
      <SummaryItem>
        <div className="title">지급 총액</div>
        <div className="amount">{summary(filteredData).totalPayment.toLocaleString()}원</div>
      </SummaryItem>
      <Operator>-</Operator>
      <SummaryItem>
        <div className="title">공제 총액</div>
        <div className="amount">{summary(filteredData).totalDeduction.toLocaleString()}원</div>
      </SummaryItem>
      <Operator>=</Operator>
      <SummaryItem>
        <div className="title received">실 수령액</div>
        <div className="amount">
          {(
            summary(filteredData).totalPayment - summary(filteredData).totalDeduction
          ).toLocaleString()}
          원
        </div>
      </SummaryItem>
    </SummaryContainer>
  )
}

const SummaryContainer = styled.ul`
  display: flex;
  align-items: flex-end;
  gap: 2rem;
  padding: 4rem 3.2rem;
  margin-top: 4rem;
  border-bottom: 1px solid #f3f3f5;
`

const SummaryItem = styled.li`
  .title:not(.received) {
    color: var(--font-sub);
  }
  .amount {
    font-size: 1.8rem;
    font-weight: 700;
    margin-top: 1rem;
    padding: 0.3rem 0;
  }
`

const Operator = styled.div`
  color: var(--font-sub);
  font-size: 2.4rem;
  font-weight: 500;
`
