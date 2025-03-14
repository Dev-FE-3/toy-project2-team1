
import { useEffect, useState } from 'react'
import { addDocument, getCollection, getDocument, getDocumentsWithCondition } from './firestore';

function FirestoreTest() {

  const [testResults, setTestResults] = useState({});

  useEffect(() => {
    runTests();
  }, []);

  const runTests = async () => {
    try {
      // 문서 추가 테스트
      const newDocId = await addDocument('testCollection', { name: '박아무개', age: 18 });
      setTestResults(prev => ({ ...prev, addDocument:` 추가된 문서 아이디: ${newDocId}` }));

      // 단일 문서 읽기 테스트
      const doc = await getDocument('testCollection', newDocId);
      setTestResults(prev => ({ ...prev, getDocument: `검색된 문서: ${JSON.stringify(doc)}` }));

      // 조건에 맞는 문서 읽기 테스트
      const docsWithCondition = await getDocumentsWithCondition('testCollection', 'age', '<=', 20);
      setTestResults(prev => ({ ...prev, getDocumentsWithCondition: `${docsWithCondition.length} 개의 검색된 문서` }));

      // 컬렉션 전체 읽기 테스트
      const allDocs = await getCollection('testCollection');
      setTestResults(prev => ({ ...prev, getCollection: `${allDocs.length} 개의 검색된 컬렉션의 문서` }));

    } catch (error) {
      console.error('에러 테스트:', error);
      setTestResults(prev => ({ ...prev, error: error.message }));
    }
  };


  return (
    <div>
      <h1>Firestore 기능 테스트</h1>
      {
        Object.keys(testResults).map(function(test) {
          return (
            <div key={test}>
              <h3>{test}</h3>
              <p>{testResults[test]}</p>
            </div>
          );
        })
      }
    </div>
  );
}

export default FirestoreTest