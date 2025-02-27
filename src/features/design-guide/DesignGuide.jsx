import styled from 'styled-components'
import ButtonGuide from './ButtonGuide'
import ModalGuide from './ModalGuide'

const ContentWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--box-container);
  border-radius: 1.2rem;
  padding: 4rem;
`
const Example = styled.div`
  padding: 2rem;
  border-radius: 1.2rem;
  border: 1px solid #e6e6e6;
  margin-bottom: 2rem;
`
const H2 = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
`

export default function DesignGuide() {
  return (
    <ContentWrap>
      <Example>
        <H2>버튼 예시</H2>
        <ButtonGuide />
      </Example>
      <Example>
        <H2>모달 예시</H2>
        <ModalGuide />
      </Example>
    </ContentWrap>
  )
}
