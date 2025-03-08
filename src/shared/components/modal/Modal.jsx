import styled from 'styled-components'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({
  isOpen,
  onClose,
  title = '',
  isDecorated = true,
  children,
  width = 'auto',
}) {
  useEffect(() => {
    // ESC 키로 모달 닫기
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    // isOpen이 true일때만
    // ESC 키 이벤트 리스너 등록
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.querySelector('main').style.position = 'relative'
    }

    // 클린업 (isOpen이 false가 되거나, 컴포넌트가 언마운트될 때)
    // ESC 키 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.querySelector('main').style.removeProperty('position')
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalContainer
        $width={width}
        onClick={(event) => event.stopPropagation()} // 모달 내부 클릭해도 닫히지 않게
      >
        <Header>
          {title !== '' && <Title $isDecorated={isDecorated}>{title}</Title>}
          <CloseIcon onClick={onClose} />
        </Header>
        <Content $title={title}>{children}</Content>
      </ModalContainer>
    </Overlay>,
    document.querySelector('main'),
  )
}

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--box-container);
  border-radius: 1.2rem;
  box-shadow: 0px 0px 0.5rem 0.3rem rgba(0, 0, 0, 0.1);
  width: ${({ $width }) => $width};
  max-width: 90%;
  max-height: 90%;
  padding: 2.8rem;
`

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h2`
  height: 24px;
  line-height: 24px;
  font-size: 2.4rem;
  font-weight: bold;
  padding-left: ${({ $isDecorated }) => ($isDecorated ? '1.5rem' : '0')};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 24px;
    background-color: var(--main);
    display: ${({ $isDecorated }) => ($isDecorated ? 'block' : 'none')};
  }
`

const CloseIcon = styled.img.attrs({
  src: '/public/images/icon-x.svg',
  alt: '닫기',
})`
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  heigh: 24px;
  cursor: pointer;
`

const Content = styled.div.withConfig({
  displayName: 'Modal-Content',
})`
  min-height: 100px;
  max-height: calc(90% - 11.2rem);
  overflow: auto;
  margin-top: ${({ $title }) => ($title ? '2.4rem' : 0)};
`
