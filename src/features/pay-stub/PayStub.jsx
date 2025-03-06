import styled from 'styled-components'
import ContentWrap from '@/shared/components/contemt-wrap/ContentWrap'
import Header from './components/Header'
import Summary from './components/Summary'
import useFetchPayStub from './hooks/useFetchPayStub'
import { useEffect, useState } from 'react'
import getDate from '@/shared/utils/utils'
import PayDetail from './components/PayDetail'

export default function PayStub() {
  const [filterData, setFilterData] = useState(null)
  const [isShow, setIsShow] = useState(false)
  const [date, setDate] = useState({
    year: getDate('year'),
    month: getDate('day') < 10 ? getDate('month') - 1 : getDate('month'),
  })

  const { data, isLoading, error } = useFetchPayStub()

  const handleCalendar = () => {
    setIsShow((current) => !current)
  }

  const handleUpdateDate = (value) => {
    if (value.year !== date.year || value.month !== date.month) {
      setDate(value)
      setIsShow((current) => !current)
    }
  }

  useEffect(() => {
    if (data) {
      setFilterData(
        data.filter((item) => {
          return item.payDate === `${date.year}${String(date.month).padStart(2, '0')}`
        })[0],
      )
    }
  }, [date, data])

  if (isLoading) return <div>로딩중...</div>
  if (error) return <div>오류발생...{error}</div>

  return (
    <ContentWrap>
      <PayStubContainer>
        <Header
          isShow={isShow}
          date={date}
          handleCalendar={handleCalendar}
          handleUpdateDate={handleUpdateDate}
        ></Header>
        {filterData ? (
          <>
            <Summary data={filterData} />
            <PayDetail data={filterData} />
          </>
        ) : (
          <NoDataMessage>
            <NoDataImage></NoDataImage>
            <p>조회된 내역이 없습니다</p>
          </NoDataMessage>
        )}
      </PayStubContainer>
    </ContentWrap>
  )
}

const PayStubContainer = styled.div`
  min-width: 470px;
  height: 100%;
`
const NoDataMessage = styled.div`
  width: 100%;
  height: calc(100% - 4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    color: var(--font-sub);
  }
`
const NoDataImage = styled.div`
  width: 237px;
  height: 200px;
  background: url(/public/images/no-data.svg) center center no-repeat;
  background-size: contain;
  margin-bottom: 4rem;
`
