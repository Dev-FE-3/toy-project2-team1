import styled from "styled-components"

export const Td = styled.td`
  flex: ${props => props.width ? `0 0 ${props.width}` : '1'};
  text-align: center;

  &:nth-child(4) {
    padding: 0 7rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &:nth-child(5) {
    display: flex;
    align-items: center;
    gap: .8rem;
  }
  &:last-child {
    cursor: pointer;
  }
`