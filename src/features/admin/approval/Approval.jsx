import { useState } from "react";
import ContentWrap from '@/shared/components/Content-wrap/ContentWrap'
import SelectBox from '@/shared/components/SelectBox/SelectBox'
import { Table } from './components/Table';
import { Gap } from './TableCommonStyles';

export default function Approval() {
  const [selectValue, setSelectValue] = useState(0);

  const handleSelectBox = (value) => {
    setSelectValue(value)
  }

  return (
    <ContentWrap>
      <SelectBox
        value={selectValue}
        onChange={handleSelectBox}
        size='big'
        options='2'
      />
      <Gap></Gap>
      <Table filterValue={selectValue} />
    </ContentWrap>
  )
}