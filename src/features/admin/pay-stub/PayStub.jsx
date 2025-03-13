import styled from 'styled-components'
import PayStubTable from './components/PayStubTable'
import ContentWrap from '@/shared/components/content-wrap/ContentWrap'
import Button from '@/shared/components/button/Button'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getDate } from '../../../shared/utils/date'
import useThrottle from '../../../shared/hooks/useThrottle'
import { useDispatch } from 'react-redux'
import { upsertDocumentsForUsers } from './api/getCollectionWithFilter'
import { setDate } from '../../../shared/redux/reducer/payStubSlice'
import { copyAndInsertPayrollData } from './api/copyAndInsertPayrollData'
import Modal from '../../../shared/components/modal/Modal'
import Notification from '../../../shared/components/modal/Notification'

export default function PayStub() {
  const currentDate = useRef([getDate('year'), getDate('month')].join(''))
  const [year, setYear] = useState(getDate('year'))
  const [month, setMonth] = useState(getDate('month'))
  const [checkedUsersCurrent, setCheckedUsersCurrent] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const changeYear = useThrottle((options) => handleMonth(options), 1000)
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

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const createPayStub = async () => {
    const date = year + String(month).padStart(2, '0')

    try {
      const result = await copyAndInsertPayrollData('202502', date)
      console.log('result', result)

      if (result) setIsSuccess(true)
      else setIsSuccess(false)
    } catch (e) {
      setIsSuccess(false)
    } finally {
      setIsModalOpen(true)
      setIsChange((prev) => !prev)
    }
  }

  const sendUsersPayStub = async () => {
    try {
      const result = await upsertDocumentsForUsers(checkedUsersCurrent)
      if (result) setIsSuccess(true)
      else setIsSuccess(false)
    } catch (e) {
      setIsSuccess(false)
    } finally {
      setIsModalOpen(true)
      setIsChange((prev) => !prev)
    }
  }

  useEffect(() => {
    const date = year + String(month).padStart(2, '0')

    dispatch(setDate({ data: { date } }))
  }, [dispatch, year, month])

  return (
    <ContentWrap>
      <Title>
        <div className="paystub-date">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="paystub--backword"
            onClick={() => {
              changeYear('prev')
            }}
          >
            <path
              d="M10.4142 12L15.7071 6.70711C16.0976 6.31658 16.0976 5.68342 15.7071 5.29289C15.3166 4.90237 14.6834 4.90237 14.2929 5.29289L8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L14.2929 18.7071C14.6834 19.0976 15.3166 19.0976 15.7071 18.7071C16.0976 18.3166 16.0976 17.6834 15.7071 17.2929L10.4142 12Z"
              fill="#2D3648"
            />
          </svg>
          <div className="paystub--current">
            {year}년 {month}월
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="paystub--forward"
            onClick={() => {
              changeYear('next')
            }}
          >
            <path
              d="M9.70711 5.29289C9.31658 4.90237 8.68342 4.90237 8.29289 5.29289C7.90237 5.68342 7.90237 6.31658 8.29289 6.70711L13.5858 12L8.29289 17.2929C7.90237 17.6834 7.90237 18.3166 8.29289 18.7071C8.68342 19.0976 9.31658 19.0976 9.70711 18.7071L15.7071 12.7071C16.0976 12.3166 16.0976 11.6834 15.7071 11.2929L9.70711 5.29289Z"
              fill={currentDate.current === [year, month].join('') ? '#BDBDBD' : '#2D3648'}
            />
          </svg>
        </div>
        <div className="payStub-btns">
          <Button type="button" variant="secondary" onClick={createPayStub}>
            대상자 불러오기
          </Button>
          <Button type="button" variant="primary" onClick={sendUsersPayStub}>
            급여마감
          </Button>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} width="400px">
            <Notification
              isSuccess={isSuccess}
              message={isSuccess ? '정상적으로 처리되었습니다' : '오류발생, 관리자에게 문의하세요'}
            />
          </Modal>
        </div>
      </Title>
      <PayStubTable
        isChange={isChange}
        setCheckedUsersCurrent={setCheckedUsersCurrent}
      ></PayStubTable>
    </ContentWrap>
  )
}

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  .paystub-date {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 3.8rem;
  }

  .paystub--backword,
  .paystub--forward {
    cursor: pointer;
  }

  .paystub--current {
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
  }

  .payStub-btns {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
`
