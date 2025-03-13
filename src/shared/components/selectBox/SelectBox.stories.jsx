import SelectBox from './SelectBox'

export default {
  title: 'Components/SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'number' },
    onChange: { action: 'changed' },
    size: {
      control: { type: 'select' },
      options: ['small', 'big'],
    },
    options: {
      control: { type: 'select' },
      options: [1, 2, 3],
    },
  },
}

// 기본 셀렉트박스
export const Default = {
  args: {
    value: 0,
    size: 'small',
    options: 1,
  },
}

// 큰 사이즈 셀렉트박스
export const Big = {
  args: {
    value: 0,
    size: 'big',
    options: 1,
  },
}

export const Small = {
  args: {
    value: 0,
    size: 'small',
    options: 1,
  },
}

// 다른 옵션 세트
export const ApprovalOptions = {
  args: {
    value: 0,
    options: 3,
  },
}
