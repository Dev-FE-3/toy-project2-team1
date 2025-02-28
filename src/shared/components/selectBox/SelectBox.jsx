import styled from 'styled-components'

export default function SelectBox({ value, onChange, size = 'small', options = 1 }) {
  const getSelectedValue = (event) => {
    onChange(event.target.value)
  }

  return (
    <Select $size={size} value={value} onChange={getSelectedValue}>
      {OPTIONS_MAP[options].map(({ id, name }) => (
        <Option key={id} value={id}>
          {name}
        </Option>
      ))}
    </Select>
  )
}

// Firebase 나오기 전까지 사용할 더미 데이터
const COMMON_OPTIONS = [
  { id: 1, name: '승인' },
  { id: 2, name: '반려' },
]

const DUMMY_OPTIONS1 = [{ id: 0, name: '-' }, ...COMMON_OPTIONS]
const DUMMY_OPTIONS2 = [{ id: 0, name: '결제 전' }, ...COMMON_OPTIONS]
const DUMMY_OPTIONS3 = [{ id: 0, name: '결제대기' }, ...COMMON_OPTIONS]

const OPTIONS_MAP = {
  1: DUMMY_OPTIONS1,
  2: DUMMY_OPTIONS2,
  3: DUMMY_OPTIONS3,
}

const Select = styled.select`
  color: var(--font-main);
  text-align: center;
  font-size: ${({ $size }) => ($size !== 'big' ? '1.2rem' : 'inherit')};
  font-weight: 400;
  width: ${({ $size }) => ($size === 'big' ? '12rem' : '7.2rem')};
  height: ${({ $size }) => ($size === 'big' ? '4.6rem' : '3.6rem')};
  padding: ${({ $size }) => ($size === 'big' ? '1.2rem 1.2rem 1.2rem 1.6rem' : '1rem')};
  border: 1px solid #cbd2e0;
  border-radius: 0.6rem;
  background: var(--box-container) url('/public/images/icon-selectBox.png') no-repeat 89% 50% /
    ${({ $size }) => ($size === 'b' ? '2.4rem' : '1.6rem')};
  -webkit-appearance: none; /* for chrome */
  -moz-appearance: none; /* for firefox */
  appearance: none;
  letter-spacing: -0.12px;
  text-align-last: start;
`

const Option = styled.option``
