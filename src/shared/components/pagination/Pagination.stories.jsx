import { useState } from 'react'
import { Pagination } from './Pagination'
import styled from 'styled-components'

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    totalItems: { control: 'number' },
    itemsPerPage: { control: 'number' },
    pageUnit: { control: 'number' },
    onPageChange: { action: 'pageChanged' },
  },
}

// 페이지네이션 표시를 위한 컨테이너
const DemoContainer = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const PageInfoDisplay = styled.div`
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 1.6rem;
  text-align: center;
`

const SampleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    font-size: 1.4rem;
  }

  th {
    background-color: #f9f9f9;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
`

// 페이지네이션 데모를 위한 컴포넌트
const PaginationDemo = ({ totalItems = 100, itemsPerPage = 10, pageUnit = 5, initialPage = 1 }) => {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // 현재 페이지의 아이템 인덱스 계산
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

  // 샘플 데이터 아이템 생성
  const renderTableRows = () => {
    return Array.from({ length: Math.min(itemsPerPage, endIndex - startIndex) }, (_, index) => {
      const itemIndex = startIndex + index + 1
      return (
        <tr key={itemIndex}>
          <td>{itemIndex}</td>
          <td>아이템 {itemIndex}</td>
          <td>설명 {itemIndex}</td>
        </tr>
      )
    })
  }

  return (
    <DemoContainer>
      <PageInfoDisplay>
        전체 {totalItems}개 아이템 중 {startIndex + 1}-{endIndex}번 표시 중 (페이지 {currentPage}/
        {Math.ceil(totalItems / itemsPerPage)})
      </PageInfoDisplay>

      <SampleTable>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </SampleTable>

      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        pageUnit={pageUnit}
        onPageChange={handlePageChange}
      />
    </DemoContainer>
  )
}

export const 기본페이지네이션 = {
  render: () => <PaginationDemo totalItems={100} itemsPerPage={10} pageUnit={5} />,
}

export const 적은항목 = {
  render: () => <PaginationDemo totalItems={23} itemsPerPage={10} pageUnit={5} />,
}

export const 많은항목 = {
  render: () => <PaginationDemo totalItems={500} itemsPerPage={10} pageUnit={5} />,
}

export const 페이지유닛변경 = {
  render: () => <PaginationDemo totalItems={100} itemsPerPage={10} pageUnit={3} />,
}

export const 항목표시개수변경 = {
  render: () => <PaginationDemo totalItems={100} itemsPerPage={5} pageUnit={5} />,
}

export const 초기페이지설정 = {
  render: () => <PaginationDemo totalItems={100} itemsPerPage={10} pageUnit={5} initialPage={5} />,
}
