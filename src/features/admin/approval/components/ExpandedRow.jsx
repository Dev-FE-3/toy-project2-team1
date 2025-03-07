import { ExpandedTr, ExpandedTd } from '../TableStyles'

export const ExpandedRow = ({ content }) => (
  <ExpandedTr>
    <ExpandedTd>
      <span>{content}</span>
    </ExpandedTd>
  </ExpandedTr>
);