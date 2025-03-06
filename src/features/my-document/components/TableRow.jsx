import { Tr, Td, Label, ToggleImage } from '../TableStyles'
import formatDate from '@/shared/utils/dateUtils'
import getColorByStatus from '@/shared/utils/statusUtils'

export const TableRow = ({ item, $isExpanded, onToggle }) => (
  <Tr>
    <Td width='10%'><span>{item.requestType}</span></Td>
    <Td width='14%'><span>{formatDate(item.requestDate)}</span></Td>
    <Td width='62%'><span>{item.requestContent}</span></Td>
    <Td width='10rem'>
      <Label color={getColorByStatus(item.approvalStatus)}>{item.approvalStatus}</Label>
    </Td>
    <Td onClick={onToggle}>
      <ToggleImage
        $isExpanded={$isExpanded}
        src="/public/images/icon-selectBox.png" 
        alt={$isExpanded ? "접기" : "펼치기"} 
      />
    </Td>
  </Tr>
);