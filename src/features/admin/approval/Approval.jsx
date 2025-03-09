import ContentWrap from '@/shared/components/Content-wrap/ContentWrap'
import SelectBox from '@/shared/components/SelectBox/SelectBox'
import { Table } from './components/Table';
import { useState } from "react";

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
      <Table filterValue={selectValue} />
    </ContentWrap>
  )
}