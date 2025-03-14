import { useEffect, useState } from 'react'
import { collection, query, getDocs, where, Timestamp } from 'firebase/firestore'
import { db } from '@/shared/api/firebase/firebase'
import { useSelector } from 'react-redux'

const useFetchPayStub = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const userUid = useSelector((state) => state.user.uid)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const q = query(
          collection(db, 'payrollManagement'),
          where('uid', '==', userUid),
          where('merge', '==', true),
        )
        const querySnapshot = await getDocs(q)

        const fetchedData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          insertDate: doc.data().insertDate.toDate().toUTCString(),
        }))
        setData(fetchedData)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [userUid])

  return { data, isLoading, error }
}

export default useFetchPayStub
