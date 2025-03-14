import { useState } from 'react'
import Notification from './Notification'
import styled from 'styled-components'

export default {
  title: 'Features/PayStub/Notification',
  component: Notification,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isSuccess: { control: 'boolean' },
    isFail: { control: 'boolean' },
    handleCloseModal: { action: 'closed' },
    messageList: { control: 'array' },
  },
}

// 스토리북에서 Notification을 보여주기 위한 Wrapper 컴포넌트
const NotificationDemo = ({ isSuccess = false, isFail = false, messageList = [] }) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => setIsVisible(true), 1000) // 1초 후 다시 표시
  }

  if (!isVisible) {
    return <Button onClick={() => setIsVisible(true)}>알림 다시 보기</Button>
  }

  return (
    <Container>
      <Notification
        isSuccess={isSuccess}
        isFail={isFail}
        handleCloseModal={handleClose}
        messageList={messageList}
      />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 500px;
  height: 300px;
  border: 1px solid #ddd;
  border-radius: 1.2rem;
  background-color: var(--box-container, white);
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

export const 성공알림 = {
  render: () => (
    <NotificationDemo
      isSuccess={true}
      messageList={['성공적으로 처리되었습니다.', '작업이 완료되었습니다.']}
    />
  ),
}

export const 실패알림 = {
  render: () => (
    <NotificationDemo
      isFail={true}
      messageList={['처리 중 오류가 발생했습니다.', '다시 시도해 주세요.']}
    />
  ),
}

export const 긴메시지성공알림 = {
  render: () => (
    <NotificationDemo
      isSuccess={true}
      messageList={[
        '성공적으로 처리되었습니다.',
        '모든 작업이 정상적으로 완료되었습니다.',
        '처리된 항목: 급여명세서 생성, 이메일 발송',
        '추가 작업이 필요하지 않습니다.',
      ]}
    />
  ),
}

export const 긴메시지실패알림 = {
  render: () => (
    <NotificationDemo
      isFail={true}
      messageList={[
        '처리 중 오류가 발생했습니다.',
        '연결 시간이 초과되었습니다.',
        '네트워크 연결을 확인하고 다시 시도해 주세요.',
        '문제가 지속되면 관리자에게 문의하세요.',
      ]}
    />
  ),
}
