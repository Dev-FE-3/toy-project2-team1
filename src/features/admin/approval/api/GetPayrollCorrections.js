import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';
import { db } from '@/shared/api/firebase/firebase'

// Firebase에서 payrollCorrections 데이터를 가져오는 함수
export const getAllPayrollCorrections = async () => {
  try {
    let q = query(
      collection(db, 'payrollCorrections'),
      orderBy('requestDate', 'desc'), // 신청일 내림차순
    );

    const querySnapshot = await getDocs(q);

    // 데이터를 가공하여 반환
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      requestDate: doc.data().requestDate.toDate().toISOString(), // date 객체로 변환
    }));
  } catch (error) {
    throw new Error('payrollCorrections 데이터를 불러오는데 실패했습니다. ' + error.message);
  }
};

export const getPayrollCorrectionsByUserId = async (uid) => {
  try {
    if (!uid) {
      throw new Error('유저의 uid를 찾을 수 없습니다.');
    }

    const q = query(
      collection(db, 'payrollCorrections'),
      where('uid', '==', uid),
      orderBy('requestDate', 'desc'), // 신청일 내림차순
    );

    const querySnapshot = await getDocs(q);

    // 데이터를 가공하여 반환
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      requestDate: doc.data().requestDate.toDate().toISOString(), // date 객체로 변환
    }));
  } catch (error) {
    throw new Error('payrollCorrections 데이터를 불러오는데 실패했습니다. ' + error.message);
  }
};