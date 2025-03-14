import Card from '@/shared/components/card/Card'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'

export default function AverageWorkTime() {
  const { name } = useSelector((state) => state.user)

  const [isAnimated, setIsAnimated] = useState(false)
  useEffect(() => {
    setIsAnimated(true)
  }, []) // 컴포넌트가 마운트되고나서

  const getMonthData = (today, monthsAgo) => {
    const date = new Date(today)
    date.setMonth(today.getMonth() - monthsAgo)

    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      team: parseInt(Math.random() * 10) + 1,
      user: parseInt(Math.random() * 10) + 1,
    }
  }
  const ChartData = Array(6)
    .fill(0)
    .map((_, index) => getMonthData(new Date(), index))

  return (
    <Card title={'평균 근무시간'}>
      <ChartContainer>
        <ChartHeader>
          <Legend>
            <LegendItem $label={'team'}>
              <span className="dot"></span>
              <span>팀</span>
            </LegendItem>
            <LegendItem $label={'user'}>
              <span className="dot"></span>
              <span>{name}님</span>
            </LegendItem>
          </Legend>
          <WorkTime>
            <span>{'155.68'}</span>
            <span>시간</span>
          </WorkTime>
        </ChartHeader>
        <ChartContent>
          {ChartData.reverse().map(({ year, month, team, user }, index) => (
            <ChartItem key={month}>
              <BarGroup>
                <BarStack className="team">
                  <Bar
                    $height={`${(team / 10) * 100}%`}
                    $label="team"
                    $isAnimated={isAnimated}
                    $delay={index * 0.1}
                  />
                </BarStack>
                <BarStack className="user">
                  <Bar
                    $height={`${(user / 10) * 100}%`}
                    $label="user"
                    $isAnimated={isAnimated}
                    $delay={index * 0.1}
                  />
                </BarStack>
              </BarGroup>
              <span className="date">{`${year}.${month}`}</span>
            </ChartItem>
          ))}
        </ChartContent>
      </ChartContainer>
    </Card>
  )
}

const legendColors = {
  team: css`
    background-color: #feecc0;
    border: 1px solid var(--point-yellow);
  `,
  user: css`
    background-color: #facbca;
    border: 1px solid var(--point-red);
  `,
}

const ChartContainer = styled.div`
  width: 100%;
  padding: 0 2rem;
`

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6rem;
  margin-bottom: 1.7rem;
`

const Legend = styled.div`
  display: flex;
  gap: 1.6rem;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  color: var(--font-sub);

  .dot {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;

    ${({ $label }) => legendColors[$label]};
  }
`

const WorkTime = styled.div`
  span:first-child {
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 130%;
    margin-right: 0.9rem;
  }
  span:last-child {
    line-height: 130%;
  }
`

const ChartContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  gap: 1.5rem;
  margin-top: 2rem;
`

const ChartItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;

  .date {
    font-size: 1.4rem;
    color: var(--font-sub);
  }
`

const BarGroup = styled.div`
  display: flex;
  gap: 0.8rem;
`

const BarStack = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 1.5vw;
  min-width: 20px;
  height: 100px;
  &.team {
    opacity: 0.8;
  }
`

const Bar = styled.div`
  width: 100%;
  height: ${({ $height }) => $height};
  border-radius: 0.4rem;
  ${({ $label }) => legendColors[$label]};

  // 애니메이션 효과
  transform-origin: bottom;
  animation: ${({ $isAnimated }) => ($isAnimated ? 'growBar' : 'none')} 0.8s ease forwards;
  animation-delay: ${({ $delay }) => $delay}s;
  opacity: 0;

  @keyframes growBar {
    0% {
      opacity: 0;
      transform: scaleY(0);
    }
    100% {
      opacity: 1;
      transform: scaleY(1);
    }
  }
`
