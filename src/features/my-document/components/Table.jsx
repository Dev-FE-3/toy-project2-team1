import React, { useEffect, useState } from 'react';
import { db } from '@/shared/api/firebase/firebase'
import { collection, query, getDocs, where, orderBy } from 'firebase/firestore';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow.jsx';
import { ExpandedRow } from '@/features/admin/approval/components/ExpandedRow';
import { Pagination } from '@/shared/components/pagination/Pagination';
import * as Common from '@/features/admin/approval/TableCommonStyles';

export function Table({ filterValue }) {
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

  // firebase firestore에서 데이터를 가져옴
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const employeeId = 'EMP011'; // 추후 로그인 정보에서 employeeId 값 가져올 예정

        // 특정 직원의 데이터를 가져옴
        let q = query(
          collection(db, "payrollCorrections"),
          where('employeeId', '==', employeeId),
          orderBy('requestDate', 'desc'), // 신청일 내림차순
        );

        const querySnapshot = await getDocs(q);
        
        // 데이터를 가공하여 상태에 저장
        const fetchedData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setData(fetchedData); // 전체 데이터 설정
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
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

  if (isLoading) return console.log('로딩중입니다.')
  if (error) return console.error('error: ',error)

  return (
    <>
      <Common.Container>
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
      </Common.Container>
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