import ContentWrap from '@/shared/components/contemt-wrap/ContentWrap'
import styled from 'styled-components'
import PayStubTable from './components/PayStubTable'

export default function PayStub() {
  return (
    <ContentWrap>
      <Title></Title>
      <PayStubTable></PayStubTable>
    </ContentWrap>
  )
}

const Title = styled.div``
