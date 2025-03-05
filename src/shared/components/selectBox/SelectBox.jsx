import styled from 'styled-components'
import { useState } from 'react'

export default function SelectBox({ value, onChange, size = 'small', options = 1 }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen((prev) => !prev)
  const selectOption = (id) => {
    onChange(id)
    setIsOpen(false)
  }

  const closeOption = () => {
    setIsOpen(false)
  }

  return (
    <DropdownContainer $size={size}>
      <DropdownButton $size={size} onClick={toggleDropdown}>
        {OPTIONS_MAP[options].find((option) => option.id === value)?.name || '-'}
      </DropdownButton>
      {isOpen && (
        <DropdownList onMouseLeave={closeOption}>
          {OPTIONS_MAP[options].map(({ id, name }) => (
            <DropdownItem key={id} onClick={() => selectOption(id)} $size={size}>
              {name}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  )
}

// 더미 데이터 (Firebase 나오기 전까지)
const COMMON_OPTIONS = [
  { id: 2, name: '승인' },
  { id: 3, name: '반려' },
]

const DUMMY_OPTIONS1 = [{ id: 0, name: '-' }, ...COMMON_OPTIONS]
const DUMMY_OPTIONS2 = [{ id: 0, name: '결재 전' }, ...COMMON_OPTIONS]
const DUMMY_OPTIONS3 = [{ id: 0, name: '전체보기' }, { id: 1, name: '결재대기' }, ...COMMON_OPTIONS]

const OPTIONS_MAP = {
  1: DUMMY_OPTIONS1,
  2: DUMMY_OPTIONS2,
  3: DUMMY_OPTIONS3,
}

const DropdownContainer = styled.div`
  position: relative;
  width: ${({ $size }) => ($size === 'big' ? '12rem' : '7.2rem')};
  height: ${({ $size }) => ($size === 'big' ? '4.6rem' : '3.6rem')};
`

const DropdownButton = styled.button`
  width: 100%;
  height: 100%;
  padding: ${({ $size }) => ($size === 'big' ? '1.2rem 1.2rem' : '1rem')};
  font-size: ${({ $size }) => ($size !== 'big' ? '1.2rem' : 'inherit')};
  background: var(--box-container) url('/public/images/icon-selectBox.png') no-repeat 89% 50% /
    1.6rem;
  border: 1px solid #cbd2e0;
  border-radius: 0.6rem;
  color: var(--font-main);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #cbd2e0;
  border-radius: 0.6rem;
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
`

const DropdownItem = styled.li`
  padding: ${({ $size }) => ($size === 'big' ? '1.2rem 1.2rem' : '1rem')};
  color: var(--font-main);
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  &:active {
    background-color: #e0e0e0;
  }
`
