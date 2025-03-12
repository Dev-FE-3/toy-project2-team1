import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
    isFullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
}

export const Primary = {
  args: {
    variant: 'primary',
    children: '기본 버튼',
  },
}

export const Secondary = {
  args: {
    variant: 'secondary',
    children: '보조 버튼',
  },
}

export const Danger = {
  args: {
    variant: 'danger',
    children: '위험 버튼',
  },
}

export const Disabled = {
  args: {
    disabled: true,
    children: '비활성화 버튼',
  },
}

export const FullWidth = {
  args: {
    isFullWidth: true,
    children: '전체 너비 버튼',
  },
}
