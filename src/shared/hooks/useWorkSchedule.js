import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCalendarEvents } from '@/shared/redux/reducer/workScheduleSlice'
import { getWorkScheduleByUid } from '@/shared/api/firebase/services/workScheduleService'

export const useWorkSchedule = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 일정 목록 가져오기
  const fetchWorkSchedules = async () => {
    setLoading(true)
    setError(null)

    getWorkScheduleByUid()
      .then((data) => {
        if (data) dispatch(setCalendarEvents(data))
      })
      .catch((err) => {
        setError(err.message || '일정 데이터를 불러오는 중 오류가 발생했습니다.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    loading,
    error,
    fetchWorkSchedules,
  }
}
