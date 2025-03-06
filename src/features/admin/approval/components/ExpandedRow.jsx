import { ExpandedTr, ExpandedTd } from '../TableStyles'

export const ExpandedRow = ({ content }) => (
  <ExpandedTr>
    <ExpandedTd width='10%'>
      <span>내용</span>
    </ExpandedTd>
    <ExpandedTd width='90%'>
      <span>{content}</span>
    </ExpandedTd>
  </ExpandedTr>
);