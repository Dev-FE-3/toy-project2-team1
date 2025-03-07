import * as Common from '@/features/admin/approval/TableCommonStyles'

export const TableHeader = () => (
  <Common.Thead>
    <Common.Tr>
      <Common.Th width='10%'><span>분류</span></Common.Th>
      <Common.Th width='14%'><span>신청일</span></Common.Th>
      <Common.Th width='62%'><span>내용</span></Common.Th>
      <Common.Th width='10rem'><span>결재상태</span></Common.Th>
    </Common.Tr>
  </Common.Thead>
);
