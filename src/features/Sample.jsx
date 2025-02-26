import styled from 'styled-components'
import MainLayout from '@/app/layout/MainLayout'
import Button from '@/shared/components/button/Button'

const ContentWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--box-container);
  border-radius: 1.2rem;
  padding: 4rem;
`

export default function Sample() {
  return (
    <>
      <MainLayout />
      <ContentWrap>
        샘플페이지
        <div style={{ margin: '1rem 0' }}>
          <Button type="button" variant="secondary">
            버튼 테스트
          </Button>
          <Button type="button" variant="primary">
            버튼 테스트
          </Button>
          <Button type="button" variant="danger">
            버튼 테스트
          </Button>
          <Button type="button" variant="secondary" disabled>
            비활성 테스트
          </Button>
          <Button type="button" variant="secondary" onClick={() => alert('hi')}>
            이벤트 테스트
          </Button>
        </div>
        <div style={{ margin: '1rem 0' }}>
          <Button type="button" fullWidth>
            어느정도너비까지늘어나는거예요
          </Button>
        </div>
      </ContentWrap>
    </>
  )
}
