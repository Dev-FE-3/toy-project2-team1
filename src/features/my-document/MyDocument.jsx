import ContentWrap from '@/shared/components/Contemt-wrap/ContentWrap'
import SelectBox from '@/shared/components/SelectBox/SelectBox'
import { Table } from './components/Table'
import { useState } from 'react'

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