import { useState } from 'react'
import Modal from './Modal'
import styled from 'styled-components'

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
    title: { control: 'text' },
    isDecorated: { control: 'boolean' },
    width: { control: 'text' },
  },
}

const ModalDemo = ({ isOpenInitial = false, title, isDecorated, width, children }) => {
  const [isOpen, setIsOpen] = useState(isOpenInitial)

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        isDecorated={isDecorated}
        width={width}
      >
        {children}
      </Modal>
    </div>
  )
}

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

const ContentExample = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const 기본모달 = {
  render: () => (
    <ModalDemo isOpenInitial={true} title="기본 모달" isDecorated={true}>
      <ContentExample>
        <p>모달의 기본 형태입니다.</p>
        <p>제목과 장식이 있는 형태로 표시됩니다.</p>
      </ContentExample>
    </ModalDemo>
  ),
}

export const 제목없는모달 = {
  render: () => (
    <ModalDemo isOpenInitial={true}>
      <ContentExample>
        <p>제목이 없는 모달입니다.</p>
        <p>제목 영역 없이 콘텐츠만 표시됩니다.</p>
      </ContentExample>
    </ModalDemo>
  ),
}

export const 장식없는제목 = {
  render: () => (
    <ModalDemo isOpenInitial={true} title="장식 없는 제목" isDecorated={false}>
      <ContentExample>
        <p>제목은 있지만 왼쪽 장식선이 없는 모달입니다.</p>
      </ContentExample>
    </ModalDemo>
  ),
}

export const 고정너비모달 = {
  render: () => (
    <ModalDemo isOpenInitial={true} title="고정 너비 모달" width="400px">
      <ContentExample>
        <p>너비가 400px로 고정된 모달입니다.</p>
        <p>width 속성으로 모달의 너비를 지정할 수 있습니다.</p>
      </ContentExample>
    </ModalDemo>
  ),
}

export const 긴내용모달 = {
  render: () => (
    <ModalDemo isOpenInitial={true} title="긴 내용 모달" width="400px">
      <ContentExample>
        <p>내용이 길어도 스크롤이 생성됩니다.</p>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <p key={i}>추가 콘텐츠 라인 {i + 1}</p>
          ))}
      </ContentExample>
    </ModalDemo>
  ),
}
