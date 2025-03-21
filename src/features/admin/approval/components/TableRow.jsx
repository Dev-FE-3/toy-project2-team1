import { useEffect, useState } from 'react';
import { db } from '@/shared/api/firebase/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import SelectBox from '@/shared/components/selectBox/SelectBox';
import Button from '@/shared/components/button/Button';
import { formatDate } from '@/shared/utils/date'
import { Tr, ToggleImage } from '../TableCommonStyles'
import { Td } from '../TableStyles';

// 상태 값 상수 정의
const STATUS = {
  PENDING: 0, // 결재대기
  APPROVED: 2, // 승인
  REJECTED: 3, // 반려
};

// 숫자 값을 텍스트로 변환하는 함수
const getStatusText = (value) => {
  switch (value) {
    case STATUS.APPROVED:
      return '승인';
    case STATUS.REJECTED:
      return '반려';
    default:
      return '결재대기';
  }
};

// 텍스트를 숫자 값으로 변환하는 함수
const getStatusValue = (text) => {
  switch (text) {
    case '승인':
      return STATUS.APPROVED;
    case '반려':
      return STATUS.REJECTED;
    default:
      return STATUS.PENDING;
  }
};

export const TableRow = ({ item, $isExpanded, onToggle, updateStatus }) => {
  const [approvalStatus, setApprovalStatus] = useState('결재대기'); // 초기값 '결재대기'
  const [isDisabled, setIsDisabled] = useState(true); // 기본적으로 활성화
  const [isSelected, setIsSelected] = useState(false);
  const [isRender, setIsRender] = useState(false); // 전체 렌더링

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const docRef = doc(db, 'payrollCorrections', item.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const latestStatus = docSnap.data().approvalStatus;
          setApprovalStatus(latestStatus);
          setIsDisabled(latestStatus === '승인' || latestStatus === '반려');
        }
      } catch (error) {
        console.error('데이터 가져오기 오류: ',error);
      } finally {
        setIsRender(true);
      }
    };

    fetchLatestData();
  }, [item.id]);

  const handleStatusChange = (value) => {
    const statusText = getStatusText(value);
    setApprovalStatus(statusText);
    setIsSelected(true);
  }

  // firestore 값 업데이트 함수
  const handleApproval = async () => {
    if (!isSelected || approvalStatus === '결재대기') return; // 선택하지 않았다면 실행 중지

    try {
      const docRef = doc(db, 'payrollCorrections', item.id); // firestore 문서 참조
      await updateDoc(docRef, { approvalStatus }); // firestore 값 업데이트
      setIsDisabled(true); // 업데이트 후 셀렉트 버튼 비활성화
      updateStatus(item.id, approvalStatus); // 상위 컴포넌트의 상태 업데이트
    } catch (error) {
      console.error('업데이트 오류: ',error);
    }
  };

  if(!isRender) return;

  return (
    <Tr>
      <Td width='10%'>{item.requestType}</Td>
      <Td width='12%'>{formatDate(item.requestDate)}</Td>
      <Td width='10%'>{item.employeeName}</Td>
      <Td width='50%'>{item.requestContent}</Td>
      {/* 결재 상태 (셀렉트 박스 & 버튼) */}
      <Td width='14rem'>
        {/* 셀렉트 박스 */}
        <SelectBox
          value={getStatusValue(approvalStatus)} // 현재 결재 상태
          onChange={handleStatusChange} // 상태 업데이트
          size='small'
          options={1}
          disabled={isDisabled}
        />
        {/* 결재 버튼 */}
        <div style={{ width: '7rem' }}>
          <Button
            type='button'
            variant='primary'
            onClick={handleApproval} // firestore 값 업데이트 함수 호출
            disabled={isDisabled} // 승인/반려 상태에서 비활성화
            isFullWidth='100%'
          >
            결재
          </Button>
        </div>        
      </Td>
      <Td onClick={onToggle}>
        <ToggleImage
          $isExpanded={$isExpanded}
          src="/public/images/icon-selectBox.png" 
          alt={$isExpanded ? "접기" : "펼치기"} 
        />
      </Td>
    </Tr>
  )
}