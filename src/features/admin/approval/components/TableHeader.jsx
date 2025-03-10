import * as Common from '../TableCommonStyles.js';

export const TableHeader = () => (
  <Common.Thead>
    <Common.Tr>
      <Common.Th width='10%'>분류</Common.Th>
      <Common.Th width='12%'>신청일</Common.Th>
      <Common.Th width='10%'>신청인</Common.Th>
      <Common.Th width='50%'>내용</Common.Th>
      <Common.Th width='14rem'>결재여부</Common.Th>
    </Common.Tr>
  </Common.Thead>
);
