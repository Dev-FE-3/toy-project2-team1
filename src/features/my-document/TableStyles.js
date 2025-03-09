import styled from "styled-components"

export const Td = styled.td`
  flex: ${props => props.width ? `0 0 ${props.width}` : '1'};
  text-align: center;

  &:nth-child(3) {
    padding: 0 7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:last-child {
    cursor: pointer;
  }
`
export const Label = styled.span`
  border-radius: .4rem;
  display: inline-block;
  width: 9rem;
  padding: .6rem 0;
  font-weight: 500;
  ${props => {
  switch(props.color) {
    case 'red':
      return `
        background-color:rgba(238, 83, 79, 0.10);
        color:var(--point-red);
      `;
    case 'purple':
      return `
        background-color:var(--background-sub);
        color:var(--main);
      `;
    default:
      return `
        background-color: var(--background-main);
        color: var(--font-sub);
      `;
  }
}}
`