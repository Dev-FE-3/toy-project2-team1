import styled from 'styled-components'
import EmployeeInfo from './components/EmployeeInfo'
import LeaveInfo from './components/LeaveInfo'
import AverageWorkTime from './components/AverageWorkTime'
import CheckList from './components/CheckList'
import DocumentList from './components/DocumentList'

export default function Home() {
  const userData = {
    department: '인사팀',
    emailAddress: 'admin@naver.com',
    hireDate: '2016-01-20',
    jobTitle: '매니저',
    name: '김실장',
    phoneNumber: '010-3394-2354',
    role: true,
    serviceDuration: '9년 1개월',
    totalLeave: 15,
    usedLeave: 12,
  }

  return (
    <Container>
      <EmployeeInfo employee={userData} />
      <LeaveInfo totalLeave={userData.totalLeave} usedLeave={userData.usedLeave} />
      <AverageWorkTime />
      <CheckList />
      <DocumentList />
    </Container>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 7fr 5fr;
  grid-auto-rows: min-content;
  gap: 3.2rem;
  width: calc(100% + 8rem);
  height: calc(100% + 8rem);
  max-height: calc(100vh - 80px);
  padding: 4rem;
  margin: -4rem;
  overflow: auto;
`
