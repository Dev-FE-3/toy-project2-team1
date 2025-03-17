import Button from './Button'

export default {
  title: 'Components/Button', // 스토리 제목
  component: Button, // 스토리 컴포넌트
  parameters: {
    layout: 'centered', // 스토리 레이아웃
  },
  tags: ['autodocs'], // 자동 문서화 태그
  argTypes: {
    variant: {
      control: { type: 'select' }, // 컨트롤 타입
      options: ['primary', 'secondary', 'danger'], // 컨트롤 옵션
    },
    isFullWidth: { control: 'boolean' }, // 컨트롤 타입
    disabled: { control: 'boolean' }, // 컨트롤 타입
    onClick: { action: 'clicked' }, // 액션 타입
  },
}

export const Primary = {
  // 스토리 옵션 값
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
