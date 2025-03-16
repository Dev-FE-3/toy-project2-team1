import { ExpandedTr, ExpandedTd } from '../TableCommonStyles'

export const ExpandedRow = ({ content }) => (
  <ExpandedTr>
    <ExpandedTd>
      <span>{content}</span>
    </ExpandedTd>
  </ExpandedTr>
);