import { useState } from 'react'
import CalendarModal from './CalendarModal'
import styled from 'styled-components'
import { getDate } from '../../utils/date'

export default {
  title: 'Components/Calendar/CalendarModal',
  component: CalendarModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isShow: { control: 'boolean' },
    date: { control: 'object' },
    handleUpdateDate: { action: 'dateUpdated' },
    top: { control: 'number' },
    left: { control: 'number' },
  },
}

const CalendarDemo = ({
  initialIsShow = true,
  initialDate = { year: getDate('year'), month: getDate('month') },
  top,
  left,
}) => {
  const [isShow, setIsShow] = useState(initialIsShow)
  const [selectedDate, setSelectedDate] = useState(initialDate)

  const handleToggle = () => {
    setIsShow((prev) => !prev)
  }

  const handleUpdateDate = (newDate) => {
    setSelectedDate(newDate)
    // 보통은 선택 후 모달을 닫지만, 스토리북에서는 열린 상태로 유지
  }

  return (
    <DemoContainer>
      <Button onClick={handleToggle}>{isShow ? '캘린더 닫기' : '캘린더 열기'}</Button>

      <SelectedDateDisplay>
        선택된 날짜: {selectedDate.year}년 {selectedDate.month}월
      </SelectedDateDisplay>

      <CalendarContainer>
        <CalendarModal
          isShow={isShow}
          date={selectedDate}
          handleUpdateDate={handleUpdateDate}
          top={top}
          left={left}
        />
      </CalendarContainer>
    </DemoContainer>
  )
}

const DemoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  min-height: 400px;
`

const Button = styled.button`
  padding: 10px 20px;
  background-color: var(--main);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`

const SelectedDateDisplay = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`

const CalendarContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  /* 캘린더가 이 컨테이너 내에 절대 위치로 표시됩니다 */
`

export const 기본캘린더 = {
  render: () => <CalendarDemo initialIsShow={true} />,
}

export const 현재년월캘린더 = {
  render: () => {
    const currentYear = getDate('year')
    const currentMonth = getDate('month')

    return (
      <CalendarDemo initialIsShow={true} initialDate={{ year: currentYear, month: currentMonth }} />
    )
  },
}

export const 작년캘린더 = {
  render: () => {
    const currentYear = getDate('year')

    return <CalendarDemo initialIsShow={true} initialDate={{ year: currentYear - 1, month: 1 }} />
  },
}

export const 위치조정캘린더_상단 = {
  render: () => <CalendarDemo initialIsShow={true} top={0} left={10} />,
}

export const 위치조정캘린더_중앙 = {
  render: () => <CalendarDemo initialIsShow={true} top={10} left={10} />,
}

export const 토글가능캘린더 = {
  render: () => {
    const [isVisible, setIsVisible] = useState(false)
    const [selectedDate, setSelectedDate] = useState({
      year: getDate('year'),
      month: getDate('month'),
    })

    const handleUpdateDate = (newDate) => {
      setSelectedDate(newDate)
      setIsVisible(false) // 날짜 선택 시 닫힘

      // 1초 후 다시 열기 (스토리북 데모용)
      setTimeout(() => {
        setIsVisible(true)
      }, 1000)
    }

    return (
      <DemoContainer>
        <Button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? '캘린더 닫기' : '캘린더 열기'}
        </Button>

        <SelectedDateDisplay>
          선택된 날짜: {selectedDate.year}년 {selectedDate.month}월
        </SelectedDateDisplay>

        <CalendarContainer>
          <CalendarModal
            isShow={isVisible}
            date={selectedDate}
            handleUpdateDate={handleUpdateDate}
            top={5}
            left={5}
          />
        </CalendarContainer>
      </DemoContainer>
    )
  },
}
