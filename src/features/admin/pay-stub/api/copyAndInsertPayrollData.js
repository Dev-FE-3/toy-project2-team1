import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { db } from '@/shared/api/firebase/firebase'

export async function copyAndInsertPayrollData(fromPayDate, toPayDate) {
  try {
    const payrollRef = collection(db, 'payrollManagement')

    // Step 1: toPayDate 데이터가 있는지 확인
    const checkQuery = query(payrollRef, where('payDate', '==', toPayDate))
    const checkSnapshot = await getDocs(checkQuery)

    if (!checkSnapshot.empty) {
      return null // 이미 데이터가 있으면 함수 종료
    }

    // Step 2: fromPayDate 데이터 조회
    const fromQuery = query(payrollRef, where('payDate', '==', fromPayDate))
    const fromSnapshot = await getDocs(fromQuery)

    if (fromSnapshot.empty) {
      return null
    }

    // Step 3: 데이터 복사 및 payDate 변경하여 삽입
    const batchPromises = fromSnapshot.docs.map(async (doc) => {
      const newData = { ...doc.data(), payDate: toPayDate, merge: false } // payDate 변경
      await addDoc(payrollRef, newData) // Firestore에 새 문서 추가
    })

    return await Promise.all(batchPromises)
  } catch (error) {
    return null
  }
}
