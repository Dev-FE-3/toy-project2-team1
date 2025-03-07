import * as Common from '../TableCommonStyles.js';

export const TableHeader = () => (
  <Common.Thead>
    <Common.Tr>
      <Common.Th width='10%'><span>분류</span></Common.Th>
      <Common.Th width='12%'><span>신청일</span></Common.Th>
      <Common.Th width='10%'><span>신청인</span></Common.Th>
      <Common.Th width='50%'><span>내용</span></Common.Th>
      <Common.Th width='14rem'><span>결재여부</span></Common.Th>
    </Common.Tr>
  </Common.Thead>
);
