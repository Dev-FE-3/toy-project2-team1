import SelectBox from '@/shared/components/selectBox/SelectBox'
import { useState } from 'react'

function SelectBoxGuide() {
  const [selectValue1, setSelectValue1] = useState(0)
  const [selectValue2, setSelectValue2] = useState(0)
  const [selectValue3, setSelectValue3] = useState(0)

  const handleSelectBox1 = (value) => {
    setSelectValue1(value)
  }

  const handleSelectBox2 = (value) => {
    setSelectValue2(value)
  }

  const handleSelectBox3 = (value) => {
    setSelectValue3(value)
  }

  return (
    <>
      <SelectBox value={selectValue1} onValueChange={handleSelectBox1} size="s" options="1" />{' '}
      {selectValue1}
      <SelectBox value={selectValue2} onValueChange={handleSelectBox2} size="b" options="2" />{' '}
      {selectValue2}
      <SelectBox value={selectValue3} onValueChange={handleSelectBox3} size="b" options="3" />{' '}
      {selectValue3}
    </>
  )
}

export default SelectBoxGuide
