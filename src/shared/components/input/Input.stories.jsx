import { INPUT_ICONS, INPUT_TYPES, INPUT_PLACEHOLDERS } from '@/shared/constants/input/inputCons'
import Input from './Input'

export default {
  title: 'Components/Input', // 컴포넌트 이름
  component: Input, // 컴포넌트 이름
  parameters: {
    layout: 'centered', // storybook에서 중앙 정렬 보이기
  },
  tags: ['autodocs'], // 자동 문서화
  // 컴포넌트 속성
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: [INPUT_ICONS.LOGIN, INPUT_ICONS.PASSWORD],
    },
    placeholder: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: [INPUT_TYPES.TEXT, INPUT_TYPES.PASSWORD, INPUT_TYPES.EMAIL],
    },
  },
}

export const Login = {
  args: {
    type: INPUT_TYPES.EMAIL,
    icon: INPUT_ICONS.LOGIN,
    placeholder: INPUT_PLACEHOLDERS.EMAIL,
  },
}

export const Password = {
  args: {
    type: INPUT_TYPES.PASSWORD,
    icon: INPUT_ICONS.PASSWORD,
    placeholder: INPUT_PLACEHOLDERS.PASSWORD,
  },
}
