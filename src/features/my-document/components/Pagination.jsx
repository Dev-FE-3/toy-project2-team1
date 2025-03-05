import { useState } from 'react'
import styled from 'styled-components'

export const Pagination = ({
  totalItems,
  itemsPerPage = 10,
  pageUnit = 5,
  onPageChange
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  // 페이지 번호 계산 로직 - 현재 페이지 중심으로 5개의 페이지 번호 계산
  const renderPageNumbers = () => {
    const startPage = Math.floor((currentPage - 1) / pageUnit) * pageUnit + 1;
    // 시작 페이지부터 5개의 페이지 계산 but 전체 페이지 수 초과하지 않도록
    const endPage = Math.min(startPage + pageUnit - 1, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_,index) => {
      const page = startPage + index;
      return (
        <PageButton
          key={page}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </PageButton>
      );
    });
  };

  return (
    <PaginationContainer>
      <ArrowButton
        direction='prev'
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disable={currentPage === 1}
      />
      {renderPageNumbers()}
      <ArrowButton
        direction='next'
        onClick={() => handlePageChange(Math.max(1, currentPage + 1))}
        disable={currentPage === totalPages}
      />
    </PaginationContainer>
  )
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: .2rem;
`;

const PageButton = styled.button`
  background: none;
  border: none;
  border-radius: 50%;
  margin: 0 1rem;
  cursor: pointer;
  padding: .5rem 1rem;
  
  &:hover, &.active {
    background-color:var(--background-sub);
  }
`;

const ArrowButton = styled(PageButton)`
  background-image: ${props => `url('/public/images/icon-${props.direction}.png')`};
  background-repeat: no-repeat;
  background-position: center;
  width: 3rem;
  height: 3rem;
`;