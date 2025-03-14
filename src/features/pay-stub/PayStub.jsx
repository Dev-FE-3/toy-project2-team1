import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getDate } from '@/shared/utils/date'
import ContentWrap from '@/shared/components/content-wrap/ContentWrap'
import LoadingSpinner from '@/shared/components/loading-spinner/LoadingSpinner'
import useFetchPayStub from './hooks/useFetchPayStub'
import Header from './components/Header'
import Summary from './components/Summary'
import PayDetail from './components/PayDetail'
import { useDispatch, useSelector } from 'react-redux'
import { setDate, setFilteredData, setIsNoData } from '@/shared/redux/reducer/userPayStubSlice'

export default function PayStub() {
  const dispatch = useDispatch()
  const { data, isLoading, error } = useFetchPayStub()
  const { date, filteredData, isNoData, isShow } = useSelector((state) => state.userPayStub)

  const handleCalendar = () => {
    dispatch(toggleIsShow())
  }

  const handleUpdateDate = (value) => {
    if (value.year !== date.year || value.month !== date.month) {
      dispatch(setDate(value))
      dispatch(toggleIsShow())
    }
  }

  useEffect(() => {
    if (!date) {
      // date가 null일 때만 초기화
      const initialDate = {
        year: getDate('year'),
        month: getDate('day') < 10 ? getDate('month') - 1 : getDate('month'),
      }
      dispatch(setDate(initialDate))
    }
    if (data) {
      const filteredData = data.filter((item) => {
        return item.payDate === `${date.year}${String(date.month).padStart(2, '0')}`
      })[0]
      dispatch(setFilteredData(filteredData))
      dispatch(setIsNoData(!filteredData)) // 필터된 데이터가 없으면 true로 설정
    }
  }, [date, data, dispatch])

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>{error}</div>

  return (
    <ContentWrap>
      <PayStubContainer>
        <Header />
        {filteredData ? (
          <>
            <Summary />
            <PayDetail />
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
