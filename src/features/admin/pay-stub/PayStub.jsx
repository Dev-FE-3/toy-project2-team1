import styled from 'styled-components'
import PayStubTable from './components/PayStubTable'
import ContentWrap from '@/shared/components/content-wrap/ContentWrap'
import Button from '@/shared/components/button/Button'
import { useEffect, useRef, useState } from 'react'
import getDate from '../../../shared/utils/date'
import useThrottle from '../../../shared/hooks/useThrottle'
import { useDispatch } from 'react-redux'
import { SET_DATE } from '../../../shared/redux/constants/payStub'

export default function PayStub() {
  const [year, setYear] = useState(getDate('year'))
  const [month, setMonth] = useState(getDate('month'))
  const currentDate = useRef([getDate('year'), getDate('month')].join(''))
  const changeYear = useThrottle((options) => handleMonth(options), 1000)
  const [checkedUsers, setCheckedUsers] = useState([])
  const dispatch = useDispatch()

  function handleMonth(options) {
    if (options === 'next' && currentDate.current === [year, month].join('')) return

    let newMonth = month
    let newYear = year

    switch (options) {
      case 'prev':
        if (month === 1) {
          newMonth = 12
          newYear = year - 1
        } else {
          newMonth = month - 1
        }
        break

      case 'next':
        if (month === 12) {
          newMonth = 1
          newYear = year + 1
        } else {
          newMonth = month + 1
        }
        break

      default:
        break
    }

    setMonth(newMonth)
    setYear(newYear)
  }

  const sendUsersPayStub = () => {
    console.log(checkedUsers)

    alert('api 전송')
  }

  useEffect(() => {
    const date = year + String(month).padStart(2, '0')

    dispatch({ type: SET_DATE, data: { date } })
  }, [dispatch, year, month])

  return (
    <ContentWrap>
      <Title>
        <div className="paystub-date">
          <div
            className="paystub--backword"
            onClick={() => {
              changeYear('prev')
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M10.4142 12L15.7071 6.70711C16.0976 6.31658 16.0976 5.68342 15.7071 5.29289C15.3166 4.90237 14.6834 4.90237 14.2929 5.29289L8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L14.2929 18.7071C14.6834 19.0976 15.3166 19.0976 15.7071 18.7071C16.0976 18.3166 16.0976 17.6834 15.7071 17.2929L10.4142 12Z"
                fill="#2D3648"
              />
            </svg>
          </div>
          <div className="paystub--current">
            {year}년 {month}월
          </div>
          <div
            className="paystub--forward"
            onClick={() => {
              changeYear('next')
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9.70711 5.29289C9.31658 4.90237 8.68342 4.90237 8.29289 5.29289C7.90237 5.68342 7.90237 6.31658 8.29289 6.70711L13.5858 12L8.29289 17.2929C7.90237 17.6834 7.90237 18.3166 8.29289 18.7071C8.68342 19.0976 9.31658 19.0976 9.70711 18.7071L15.7071 12.7071C16.0976 12.3166 16.0976 11.6834 15.7071 11.2929L9.70711 5.29289Z"
                fill={currentDate.current === [year, month].join('') ? '#BDBDBD' : '#2D3648'}
              />
            </svg>
          </div>
        </div>
        <Button type="button" variant="primary" onClick={sendUsersPayStub}>
          급여마감
        </Button>
      </Title>
      <Contents>
        <PayStubTable checkedUsers={checkedUsers} setCheckedUsers={setCheckedUsers}></PayStubTable>
      </Contents>
    </ContentWrap>
  )
}

const Title = styled.div`
  display: flex;
  justify-content: space-between;

  .paystub-date {
    display: flex;
    align-items: center;
  }

  .paystub--backword,
  .paystub--forward {
    cursor: pointer;
  }

  .paystub--current {
    width: 14rem;
    text-align: center;
    margin-left: 1rem;
    margin-right: 1rem;
    font-size: 2.4rem;
    font-weight: 600;
  }
`
const Contents = styled.div`
  overflow: auto;
  margin-top: 2rem;
`
