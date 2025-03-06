import { Thead, Tr, Th } from "../TableStyles"

export const TableHeader = () => (
  <Thead>
    <Tr>
      <Th width='10%'><span>분류</span></Th>
      <Th width='14%'><span>신청일</span></Th>
      <Th width='62%'><span>내용</span></Th>
      <Th width='10rem'><span>결재상태</span></Th>
    </Tr>
  </Thead>
);
