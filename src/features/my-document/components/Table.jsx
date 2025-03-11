import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPayrollCorrectionsByUserId } from '@/shared/api/firebase/services/payrollCorrectionsService';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { ExpandedRow } from '@/features/admin/approval/components/ExpandedRow';
import { Pagination } from '@/shared/components/pagination/Pagination';
import LoadingSpinner from '@/shared/components/loading-spinner/LoadingSpinner';
import * as Common from '@/features/admin/approval/TableCommonStyles';

export function Table({ filterValue }) {
  const { uid } = useSelector(state => state.user); // 리덕스 스토어에서 uid 가져오기
  const [data, setData] = useState([]); // 전체 데이터 저장
  const [filteredData, setFilteredData] = useState([]) // 필터링 된 데이터 저장
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
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
        const fetchedData = await getPayrollCorrectionsByUserId(uid);

        // 로딩스피너 노출을 위한 딜레이 추가
        setTimeout(() => {
          setData(fetchedData);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    if (uid) {
      fetchData();
    }
  }, [uid]); // uid가 변경될 때마다 실행

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
      setCurrentPage(1); // 필터링 후 첫 페이지로 이동
    };

    filterData();
  }, [data, filterValue]); // data 또는 filterValue가 변경될 때 실행

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