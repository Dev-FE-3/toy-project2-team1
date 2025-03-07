import styled from 'styled-components'
import EmployeeInfo from './components/EmployeeInfo'
import LeaveInfo from './components/LeaveInfo'
import AverageWorkTime from './components/AverageWorkTime'
import CheckList from './components/CheckList'
import DocumentList from './components/DocumentList'
import { useSelector } from 'react-redux'

export default function Home() {
  const userData = useSelector((state) => state.user)

  return (
    <Container>
      <EmployeeInfo employee={userData} />
      <LeaveInfo totalLeave={userData.totalLeaves} usedLeave={userData.usedLeaves} />
      <AverageWorkTime employeeName={userData.name}/>
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
