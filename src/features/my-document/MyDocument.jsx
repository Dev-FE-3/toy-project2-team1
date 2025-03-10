import { useState } from 'react'
import ContentWrap from '@/shared/components/Content-wrap/ContentWrap'
import SelectBox from '@/shared/components/SelectBox/SelectBox'
import { Table } from './components/Table'
import { Gap } from '../admin/approval/TableCommonStyles'

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
      <Gap></Gap>
      <Table filterValue={selectValue} />
    </ContentWrap>
  )
}