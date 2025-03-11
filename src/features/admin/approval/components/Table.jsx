import React, { useEffect, useState } from 'react';
import { getAllPayrollCorrections } from '@/shared/api/firebase/services/payrollCorrectionsService';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { ExpandedRow } from './ExpandedRow';
import { Pagination } from '@/shared/components/pagination/Pagination';
import LoadingSpinner from '@/shared/components/loading-spinner/LoadingSpinner';
import * as Common from '../TableCommonStyles';

export function Table({ filterValue }) {
  const [data, setData] = useState([]); // 전체 데이터 저장
  const [filteredData, setFilteredData] = useState([]) // 필터링 된 데이터 저장
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [filterValueChanged, setFilterValueChanged] = useState(false);
  const [expandedId, setExpandedId] = useState(null); // 확장된 행의 ID
  const itemsPerPage = 10; // 페이지 당 표시할 항목 수
  
  // 행을 열고 닫는 함수
  const toggleRow = (id) => {
    setExpandedId(prevId => prevId === id ? null : id);
  };

  // 서비스를 통해 firebase의 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await getAllPayrollCorrections(); // 서비스 호출

        // 로딩스피너 노출을 위한 딜레이 추가
        setTimeout(() => {
          setData(fetchedData); // 전체 데이터 설정
          setIsLoading(false);
        }, 1000)
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      };
    };

    fetchData();
  }, []); // 컴포넌트 처음 렌더링 시 실행

  // filterValue에 따라 데이터 필터링
  useEffect(() => {
    const filterData = () => {
      const filtered = data.filter(item => {
        if (filterValue === 0) return true; // 전체보기
        if (filterValue === 1) return item.approvalStatus === '결재대기';
        if (filterValue === 2) return item.approvalStatus === '승인';
        if (filterValue === 3) return item.approvalStatus === '반려';
        return true; // 기본적으로 모든 데이터 표시
      });
      setFilteredData(filtered); // 필터링 된 데이터 설정
      setExpandedId(null); // 필터링 시 열린 행 닫기

      // 현재 페이지 초기화는 필터 값이 변경될 때만 실행
      if (filterValueChanged) {
        setCurrentPage(1);
      }
    };

    filterData();
  }, [data, filterValue]); // data 또는 filterValue가 변경될 때 실행

  // filterValue 변경 시 flag 설정
  useEffect(() => {
    setFilterValueChanged(true);
  }, [filterValue]);

  
  // 페이지 변경 시 열린 행 닫기
  useEffect(() => {
    setExpandedId(null);
  }, [currentPage]);
  
  // 현재 페이지의 데이터만 슬라이싱
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex)
  }
  
  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }
  
  // 결재 상태 업데이트 시 flag 초기화
  const updateItemStatus = (id, newStatus) => {
    setFilterValueChanged(false); // 필터 값이 변경되지 않았음을 명시

    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, approvalStatus: newStatus } : item
      )
    );
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return console.error('error: ',error)

  return (
    <>
      {/* 테이블 */}
      <Common.TableWrap>
        <Common.TableContent>
          {/* 테이블 헤더 */}
          <TableHeader />
          <Common.Tbody>
            {/* 현재 페이지의 데이터를 렌더링 */}
            {getCurrentPageData().map((item) => (
              <React.Fragment key={item.id}>
                {/* 테이블 행 */}
                <TableRow
                  item={item}
                  $isExpanded={expandedId === item.id} // 현재 행이 열려있는지 여부 전달
                  onToggle={() => toggleRow(item.id)} // 행 클릭 시 토글 함수 호출
                  updateStatus={updateItemStatus} // 새로운 prop 전달
                />
                {/* 확장된 행 */}
                {expandedId === item.id && <ExpandedRow content={item.requestContent} />}
              </React.Fragment>
            ))}
          </Common.Tbody>
        </Common.TableContent>
      </Common.TableWrap>
      {/* 페이지네이션 */}
      <Pagination
        totalItems={filteredData.length} // 전체 항목 수 전달
        itemsPerPage={itemsPerPage} // 페이지 당 항목 수 전달
        pageUnit={5} // 한 번에 표시할 페이지 버튼 수 전달
        onPageChange={handlePageChange} // 페이지 변경 핸들러
      />
    </>
  )
}