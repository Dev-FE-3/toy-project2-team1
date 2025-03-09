import styled from 'styled-components'
import Card from '@/shared/components/card/Card'
import LoadingSpinner from '@/shared/components/loading-spinner/LoadingSpinner'
import formatDate from '@/shared/utils/dateUtils'
import getColorByStatus from '@/shared/utils/statusUtils'
import { Label } from '@/features/my-document/TableStyles'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '@/shared/api/firebase/firebase'
import { collection, query, getDocs, where, orderBy, limit } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export default function DocumentList() {
  const uid = useSelector((state) => state.user.uid)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        if (!uid) {
          throw new Error('유저의 uid를 찾을 수 없습니다.')
        }

        let q = query(
          collection(db, 'payrollCorrections'),
          where('uid', '==', uid),
          orderBy('requestDate', 'desc'), // 신청일 내림차순
          limit(5),
        )

        const querySnapshot = await getDocs(q)
        const fetchedData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))

        setData(fetchedData)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false) // 로딩 상태를 false로 설정
      }
    }

    if (uid) {
      fetchData()
    }
  }, [uid])

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>{error}</div>

  return (
    <DocumentListContainer>
      <Card
        title={'신청서 리스트'}
        icon
        onClick={() => {
          navigate('/my-document')
        }}
      >
        <Table>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>분류</th>
              <th>신청일</th>
              <th>내용</th>
              <th>결재상태</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.requestType}</td>
                <td>{formatDate(item.requestDate)}</td>
                <td>{item.requestContent}</td>
                <td>
                  <Label color={getColorByStatus(item.approvalStatus)}>{item.approvalStatus}</Label>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </DocumentListContainer>
  )
}

const DocumentListContainer = styled.div``
const Table = styled.table`
  border-bottom: 1px solid var(--point-gray);
  width: 100%;
  table-layout: fixed;

  col:nth-child(1) {
    width: 15%;
    min-width: 90px;
  }
  col:nth-child(2) {
    width: 15%;
    min-width: 100px;
  }
  col:nth-child(4) {
    width: 15%;
    min-width: 11rem;
  }

  th,
  td {
    padding: 0.8rem 1rem;
  }

  th {
    background: var(--background-main);
  }
  td {
    text-align: center;
    overflow: hidden; /* 넘치는 내용 숨기기 */
    text-overflow: ellipsis; /* ... 표시 */
    white-space: nowrap; /* 줄 바꿈 방지 */
  }

  thead {
    border-top: 1px solid var(--point-gray);
    border-bottom: 1px solid var(--point-gray);
  }
  tbody tr {
    border-bottom: 1px solid var(--point-gray);
  }
`
