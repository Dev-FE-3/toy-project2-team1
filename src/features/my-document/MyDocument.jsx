import { useState } from 'react'
import ContentWrap from '@/shared/components/content-wrap/ContentWrap'
import SelectBox from '@/shared/components/selectBox/SelectBox'
import { Table } from './components/Table'

export default function MyDocument() {
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
        options='3'
      />
      <Table filterValue={selectValue} />
    </ContentWrap>
  )
}