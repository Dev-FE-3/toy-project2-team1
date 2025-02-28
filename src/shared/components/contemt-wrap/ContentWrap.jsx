import styled from 'styled-components'

export default function ComtentWrap({ children }) {
  return <ContentWrap>{children}</ContentWrap>
}

const ContentWrap = styled.div`
  width: 100%;
  max-height: calc(100vh - 80px - 8rem);
  background-color: var(--box-container);
  border-radius: 1.2rem;
  padding: 4rem;
  overflow: auto;
`
