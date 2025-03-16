import styled from 'styled-components'
import Card from '@/shared/components/card/Card'
import { useSelector } from 'react-redux'

export default function LeaveInfo() {
  const { totalLeaves, usedLeaves } = useSelector((state) => state.user)
  return (
    <Card title={'휴가정보'} contentAlign={'center'}>
      <LeaveStatusContainer>
        <LeaveStatus>
          <div className="label">발생</div>
          <StatusValue $color={'--font-sub'}>
            <span>{totalLeaves}</span>
          </StatusValue>
        </LeaveStatus>
        <LeaveStatus>
          <div className="label">사용</div>
          <StatusValue $color={'--point-red'}>
            <span>{usedLeaves}</span>
          </StatusValue>
        </LeaveStatus>
        <LeaveStatus>
          <div className="label">잔여</div>
          <StatusValue $color={'--point-yellow'}>
            <span>{totalLeaves - usedLeaves}</span>
          </StatusValue>
        </LeaveStatus>
      </LeaveStatusContainer>
    </Card>
  )
}

const LeaveStatusContainer = styled.ul`
  display: flex;
  .label {
    color: var(--font-sub);
    font-size: 1.6rem;
    text-align: center;
    line-height: 2rem;
  }
`
const LeaveStatus = styled.li`
  height: 100%;
  padding: 1rem 2.5rem;
  border-right: 1px solid var(--background-main);

  &:last-child {
    border-right: none;
  }
`

const StatusValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 90px;
  border-radius: 0.9rem;
  background: var(--background-main);
  position: relative;
  overflow: hidden;
  margin-top: 1rem;
  aspect-ratio: 1 / 1;

  &::before {
    content: '';
    width: 0.8rem;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: var(${({ $color }) => $color});
  }

  span {
    font-size: 2.4rem;
    font-weight: 700;
  }
`
