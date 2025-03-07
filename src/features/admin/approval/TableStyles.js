import styled from "styled-components"

export const Container = styled.div`
  margin-top: 1.2rem;
`
export const TableWrap = styled.div`
  height: 58rem;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-gutter: stable;
`
export const TableContent = styled.table`
  width: 100%;
  font-size: 1.4rem;
  border-bottom: 1px solid var(--point-gray);
`
export const Thead = styled.thead`
  position: sticky;
  top: 0;
  background-color: var(--background-main);
  font-weight: 600;
  z-index: 1;
`
export const Tbody = styled.tbody`
`
export const Tr = styled.tr`
  display: flex;
  align-items: center;
  height: 5.2rem;
  border-top: 1px solid var(--point-gray);
`
export const Th = styled.th`
  flex: ${props => props.width ? `0 0 ${props.width}` : '1'};
  text-align: center;
`
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
export const ExpandedTr = styled.tr`
  display: flex;
  align-items: center;
  height: 8.2rem;
  border-top: 1px solid var(--point-gray);
  background-color:var(--background-main);
`
export const ExpandedTd = styled.td`
  flex: ${props => props.width ? `0 0 ${props.width}` : '1'};
  text-align: center;
  white-space: pre-wrap;
  word-break: break-word;

  &:last-child {
    text-align: start;
    padding: 1rem 4rem;
  }
`
export const ToggleImage = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  transition: transform .2s ease;
  transform: ${props => props.$isExpanded ? 'rotate(180deg)' : 'rotate(0)'};
`