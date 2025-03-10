import styled from 'styled-components'
import { useCallback, useState } from 'react'
import Button from '@/shared/components/button/Button'
import Modal from '@/shared/components/modal/Modal'

const ModalTitleCustom = styled.h2`
  font-size: 2.4rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2.4rem;
`

export default function ModalGuide() {
  const [isModalOpen1, setIsModalOpen1] = useState(false)
  const handleOpenModal1 = useCallback(() => {
    setIsModalOpen1(true)
  }, [])
  const handleCloseModal1 = useCallback(() => {
    setIsModalOpen1(false)
  }, [])

  const [isModalOpen2, setIsModalOpen2] = useState(false)
  const handleOpenModal2 = useCallback(() => {
    setIsModalOpen2(true)
  }, [])
  const handleCloseModal2 = useCallback(() => {
    setIsModalOpen2(false)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <Button onClick={handleOpenModal1}>모달 열기 (기본 제목 스타일)</Button>
        <Modal isOpen={isModalOpen1} onClose={handleCloseModal1} width="600px" title="모달 제목">
          <p>title props를 전달하면 모달 제목이 출력됩니다.</p>
          <p>모달 제목 앞에 데코레이션을 빼고 싶으면 isDecorated props 값을 false로 전달하세요.</p>
        </Modal>
      </div>
      <div>
        <Button onClick={handleOpenModal2}>모달 열기 (커스텀 제목 스타일)</Button>
        <Modal isOpen={isModalOpen2} onClose={handleCloseModal2} width="600px">
          <ModalTitleCustom>커스텀 제목</ModalTitleCustom>
          <p>여기에 원하는 양식을 넣을 수 있습니다.</p>
          <div style={{ marginTop: '20px' }}>
            <Button onClick={handleCloseModal2}>닫기</Button>
          </div>
        </Modal>
      </div>
    </div>
  )
}
