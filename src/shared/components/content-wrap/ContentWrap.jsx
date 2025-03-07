import styled, { css } from 'styled-components'

export default function ContentWrap({ children, customStyle }) {
  return <StyledContentWrap customStyle={customStyle}>{children}</StyledContentWrap>
}

const StyledContentWrap = styled.div`
  width: 100%;
  max-height: calc(100vh - 80px - 8rem);
  background-color: var(--box-container);
  border-radius: 1.2rem;
  padding: 4rem;
  overflow: auto;

  ${({ customStyle }) =>
    customStyle &&
    css`
      ${customStyle}
    `}
`
