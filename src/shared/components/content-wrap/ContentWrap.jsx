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
  box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 12px;

  ${({ customStyle }) =>
    customStyle &&
    css`
      ${customStyle}
    `}
`
