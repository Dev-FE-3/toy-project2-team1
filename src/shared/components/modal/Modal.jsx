import * as S from './ModalStyled'
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
    <S.Overlay onClick={onClose}>
      <S.ModalContainer
        $width={width}
        onClick={(event) => event.stopPropagation()} // 모달 내부 클릭해도 닫히지 않게
      >
        <S.Header>
          {title !== '' && <S.Title $isDecorated={isDecorated}>{title}</S.Title>}
          <S.CloseIcon onClick={onClose} />
        </S.Header>
        <S.Content>{children}</S.Content>
      </S.ModalContainer>
    </S.Overlay>,
    document.querySelector('main'),
  )
}
