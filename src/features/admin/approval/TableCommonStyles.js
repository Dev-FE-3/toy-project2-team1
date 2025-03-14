import styled from "styled-components"

export const TableWrap = styled.div`
  height: 58rem;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-gutter: stable;
  margin-top: 2rem;
`
export const TableContent = styled.table`
  table-layout: fixed;
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
export const Tbody = styled.tbody``
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
export const ExpandedTr = styled.tr`
  display: flex;
  align-items: center;
  height: 8.2rem;
  border-top: 1px solid var(--point-gray);
  background-color:var(--background-main);
`
export const ExpandedTd = styled.td`
  width: 100%;
  text-align: center;
  white-space: pre-wrap;
  word-break: break-word;
  padding: 1rem 7rem;
  line-height: 2.4rem;
`
export const ToggleImage = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  transition: transform .2s ease;
  transform: ${props => props.$isExpanded ? 'rotate(180deg)' : 'rotate(0)'};
`