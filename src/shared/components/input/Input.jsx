import styled from 'styled-components'
import iconMail from '@/assets/icon-input-mail.png'
import iconPassword from '@/assets/icon-input-password.png'

const InputBox = styled.input`
  position: relative;
  width: 38rem;
  height: 5.6rem;
  padding: 1.5rem 1.5rem 1.5rem 3.6rem;
  border-radius: 0.9rem;
  border: 1px solid #d9d9d9;
  background-color: var(--box-container);
  background-repeat: no-repeat;
  background-position: 0.8rem center;
  background-size: 1.7rem;
  font-weight: 700;

  ${(props) =>
    props.$icon === 'login'
      ? `background-image: url(${iconMail});`
      : `background-image: url(${iconPassword});
   `}

  &::placeholder {
    color: #c3c3c3;
  }
`

function Input({ type, placeholder, icon, value, onValueChange }) {
  const handleChange = (event) => {
    onValueChange(event.target.value)
  }

  return (
    <>
      <InputBox
        type={type}
        placeholder={placeholder}
        $icon={icon}
        value={value}
        onChange={handleChange}
      ></InputBox>
    </>
  )
}

export default Input
