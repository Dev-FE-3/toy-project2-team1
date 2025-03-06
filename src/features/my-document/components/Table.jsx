import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, where, orderBy } from 'firebase/firestore';
import { db } from '@/shared/api/firebase/firebase'
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow.jsx';
import { ExpandedRow } from './ExpandedRow';
import { Pagination } from './Pagination';
import { Container, TableWrap, TableContent, Tbody } from '../TableStyles';

export function Table({ filterValue }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const itemsPerPage = 10; // 페이지 당 아이템 수
  
  const toggleRow = (id) => {
    setExpandedId(prevId => prevId === id ? null : id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const employeeId = 'EMP011'; // 추후 로그인 정보에서 employeeId 값 가져올 예정

        let q = query(
          collection(db, "payrollCorrections"),
          where('employeeId', '==', employeeId),
          orderBy('requestDate', 'desc'), // 날짜 기준 내림차순
        );

        const querySnapshot = await getDocs(q);
        
        const fetchedData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setData(fetchedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // filterValue에 따라 데이터 필터링
    const filterData = () => {
      const filtered = data.filter(item => {
        if (filterValue === 0) return true; // 전체보기
        if (filterValue === 1) return item.approvalStatus === '결재대기';
        if (filterValue === 2) return item.approvalStatus === '승인';
        if (filterValue === 3) return item.approvalStatus === '반려';
        return true; // 기본적으로 모든 데이터 표시
      });
      setFilteredData(filtered);
    };

    filterData();
  }, [data, filterValue]);

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
      <Container>
        <TableWrap>
          <TableContent>
            <TableHeader />
            <Tbody>
              {getCurrentPageData().map((item) => (
                <React.Fragment key={item.id}>
                  <TableRow
                    item={item}
                    $isExpanded={expandedId === item.id}
                    onToggle={() => toggleRow(item.id)}
                  />
                  {expandedId === item.id && <ExpandedRow content={item.requestContent} />}
                </React.Fragment>
              ))}
            </Tbody>
          </TableContent>
        </TableWrap>
      </Container>
      <Pagination
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        pageUnit={5}
        onPageChange={handlePageChange}
      />
    </>
  )
}