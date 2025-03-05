import styled from 'styled-components'
import Card from '@/shared/components/card/Card'
import { useEffect, useRef, useState } from 'react'

export default function CheckList() {
  const [items, setItems] = useState([
    { id: 1, content: '2시에 마케팅부 신규사업 회의', checked: false },
    { id: 2, content: '구매팀 박길동과장 휴가확인하기', checked: true },
    { id: 3, content: '팀 회의 준비하기', checked: false },
    { id: 4, content: '프로젝트 보고서 작성하기', checked: false },
    { id: 5, content: '고객 피드백 검토하기', checked: true },
    { id: 6, content: '신규 직원 교육 계획 세우기', checked: true },
    { id: 7, content: '주간 업무 정리하기', checked: false },
  ])
  const [isShowAddInput, setIsShowAddInput] = useState(false)
  const [editItemId, setEditItemId] = useState(0)
  const editInput = useRef(null)

  const editContent = (id) => {
    const newContent = editInput.current.value
    if (newContent === '') {
      setItems(items.filter((item) => item.id !== id))
    } else {
      setItems(items.map((item) => (item.id === id ? { ...item, content: newContent } : item)))
    }
    setEditItemId(0)
  }
  const handleCheck = (id) => {
    if (editItemId) editInput.current.blur() // checkbox 클릭해도 focus가 유지된 상태로 남아있음
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }
  const handleBlurEditContent = (id) => {
    const target = items.find((item) => item.id === id)
    if (editInput.current.value === target.content) {
      setEditItemId(0)
    } else {
      editContent(id)
    }
  }
  const handleClickEditContent = (item) => {
    setEditItemId(item.id)
  }
  const handleClickAddButton = () => {
    setIsShowAddInput(true)
  }

  useEffect(() => {
    if (editItemId) {
      editInput.current.focus()
    }
  }, [editItemId])

  return (
    <CardContainer>
      <Card title={'체크리스트'} icon={'plus'} onClick={handleClickAddButton}>
        <CheckListContainer>
          {items.map((item) => (
            <li key={item.id}>
              <input type="checkbox" checked={item.checked} onChange={() => handleCheck(item.id)} />
              {editItemId === item.id ? (
                <ContentInput
                  type={'text'}
                  ref={editInput}
                  defaultValue={item.content}
                  onBlur={() => handleBlurEditContent(item.id)}
                />
              ) : (
                <Content $isChekcked={item.checked} onClick={() => handleClickEditContent(item)}>
                  {item.content}
                </Content>
              )}
            </li>
          ))}
          {isShowAddInput ? <ContentInput $isAdd placeholder="내용을 입력하세요" /> : ''}
        </CheckListContainer>
      </Card>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  grid-column: 2 / span 1;
  grid-row: 2 / span 2;
`

const CheckListContainer = styled.ul`
  width: 100%;
  li {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
  }
`

const Content = styled.p`
  font-size: 1.6rem;
  line-height: 2.2rem;
  height: 2.2rem;
  ${({ $isChekcked }) => ($isChekcked ? 'text-decoration: line-through;' : '')}
`

const EditInputStyles = `
  border: none; /* 기본 테두리 제거 */
  padding: 0; /* 기본 패딩 제거 */
  margin: 0; /* 기본 마진 제거 */
  outline: none; /* 포커스 시 기본 아웃라인 제거 */
  background-color: transparent; /* 배경색 투명하게 설정 */
  line-height: 2.2rem;
  height: 2.2rem;
`
const AddInputStyles = `
  margin-top: 1rem;
  padding: 1rem;
  border-radius: .8rem;
`
const ContentInput = styled.input`
  ${({ $isAdd }) => ($isAdd ? AddInputStyles : EditInputStyles)}
  width: 100%;
  font-size: 1.6rem;
`
