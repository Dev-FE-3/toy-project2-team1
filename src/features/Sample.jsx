import styled from 'styled-components'
import Button from '@/shared/components/button/Button'
import { useCallback, useState } from 'react'
import Modal from '@/shared/components/modal/Modal'

const ContentWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--box-container);
  border-radius: 1.2rem;
  padding: 4rem;
`
const H2 = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 1rem 0;
`

export default function Sample() {
  // 모달 예시
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <>
      <ContentWrap>
        샘플페이지
        <div style={{ margin: '3rem 0' }}>
          <H2>모달 예시</H2>
          <Button onClick={handleOpenModal}>모달 열기</Button>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="모달 제목" width="600px">
            <h3>모달 내용</h3>
            <p>여기에 원하는 내용을 넣을 수 있습니다.</p>
            <div style={{ marginTop: '20px' }}>
              <Button onClick={handleCloseModal}>닫기</Button>
            </div>
          </Modal>
        </div>
        <div style={{ margin: '3rem 0' }}>
          <H2>버튼 예시</H2>
          <Button type="button" variant="secondary">
            secondary
          </Button>
          <Button type="button" variant="primary">
            primary
          </Button>
          <Button type="button" variant="danger">
            danger
          </Button>
          <Button type="button" variant="secondary" disabled>
            disabled
          </Button>
          <Button type="button" variant="secondary" onClick={() => alert('hi')}>
            onClick
          </Button>
          <div style={{ margin: '1rem 0' }}>
            <Button type="button" fullWidth>
              어느정도너비까지늘어나는거예요
            </Button>
          </div>
        </div>
      </ContentWrap>
    </>
  )
}
