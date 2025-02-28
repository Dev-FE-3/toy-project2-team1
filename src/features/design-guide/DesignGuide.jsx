import styled from 'styled-components'
import ButtonGuide from './ButtonGuide'
import ModalGuide from './ModalGuide'
import CalendarModalGuide from './CalendarModalGuide'
import CardGuide from './CardGuide'
import SelectBoxGuide from './SelectBoxGuide'
import InputGuide from './InputGuide'
import ScrollGuide from './ScrollGuide'
import ContentWrap from '@/shared/components/contemt-wrap/ContentWrap'

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
      <Example>
        <H2>캘린더 모달 예시</H2>
        <CalendarModalGuide />
      </Example>
      <Example>
        <H2>카드 예시</H2>
        <CardGuide />
      </Example>
      <Example>
        <H2>셀렉트박스 예시</H2>
        <SelectBoxGuide />
      </Example>
      <Example>
        <H2>인풋 예시</H2>
        <InputGuide />
      </Example>
      <Example>
        <H2>스크롤 예시</H2>
        <ScrollGuide />
      </Example>
    </ContentWrap>
  )
}
