import { Thead, Tr, Th } from "../TableStyles"

export const TableHeader = () => (
  <Thead>
    <Tr>
      <Th width='10%'><span>분류</span></Th>
      <Th width='12%'><span>신청일</span></Th>
      <Th width='10%'><span>신청인</span></Th>
      <Th width='50%'><span>내용</span></Th>
      <Th width='14rem'><span>결재여부</span></Th>
    </Tr>
  </Thead>
);
