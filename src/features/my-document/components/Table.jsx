import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPayrollCorrectionsByUserId } from '@/features/admin/approval/api/GetPayrollCorrections';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { ExpandedRow } from '@/features/admin/approval/components/ExpandedRow';
import { Pagination } from '@/shared/components/pagination/Pagination';
import LoadingSpinner from '@/shared/components/loading-spinner/LoadingSpinner';
import * as Common from '@/features/admin/approval/TableCommonStyles';
import { 
  setData,
  setLoading,
  setError,
  setFilterValue,
  setCurrentPage,
  toggleRow,
  filterData,
} from '@/shared/redux/reducer/myDocumentSlice';

export function Table({ filterValue }) {
  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.user); // 리덕스 스토어에서 uid 가져오기
  const {
    filteredData,
    isLoading,
    error,
    currentPage,
    expandedId,
  } = useSelector(state => state.myDocument);
  const itemsPerPage = 10; // 페이지 당 표시할 항목 수
  
  // 서비스를 통해 firebase의 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const fetchedData = await getPayrollCorrectionsByUserId(uid);
        
        // 로딩스피너 노출을 위한 딜레이 추가
        setTimeout(() => {
          dispatch(setData(fetchedData));
          dispatch(setLoading(false));
        }, 1000);
      } catch (err) {
        dispatch(setError(err.message));
        dispatch(setLoading(false));
      }
    };
    
    if (uid) {
      fetchData();
    }
  }, [uid, dispatch]); // uid가 변경될 때마다 실행
  
  useEffect(() => {
    dispatch(setFilterValue(filterValue));
    dispatch(filterData());
  }, [filterValue, dispatch]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleToggleRow = (id) => {
    dispatch(toggleRow(id));
  };

  // 현재 페이지의 데이터만 슬라이싱
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex)
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
                  onToggle={() => handleToggleRow(item.id)} // 행 클릭 시 토글 함수 호출
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