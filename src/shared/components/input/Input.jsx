import styled from 'styled-components'
import { INPUT_ICONS, INPUT_ICON_PATHS } from '@/shared/constants/input/inputCons'

export default function Input({ icon, ...props }) {
  return <InputStyle $icon={icon} {...props} />
}

const InputStyle = styled.input`
  width: 38rem;
  height: 5.6rem;
  padding: 1.5rem 1.5rem 1.5rem 5.2rem;
  border-radius: 0.9rem;
  border: 1px solid #d9d9d9;
  background-color: var(--box-container);
  background-repeat: no-repeat;
  background-position: 2rem center;
  background-size: 1.7rem;
  font-weight: 500;

  ${(props) =>
    props.$icon === INPUT_ICONS.LOGIN
      ? `background-image: url(${INPUT_ICON_PATHS[INPUT_ICONS.LOGIN]});`
      : `background-image: url(${INPUT_ICON_PATHS[INPUT_ICONS.PASSWORD]});`}

  &::placeholder {
    color: #c3c3c3;
  }

  &:focus {
    outline: 1px solid var(--main);
  }
`
