import styled from 'styled-components'
import { useNavigate, useRouteError } from 'react-router-dom'
import errorImage from '@/assets/error.svg'
import Button from '@/shared/components/button/Button'

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin-top: -2.8rem;
  background: var(--background-main);
`
const ErrorImage = styled.div`
  width: 20vw;
  height: 20vw;
  min-width: 200px;
  min-height: 200px;
  background: url('${errorImage}') no-repeat center/cover;
`
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 4.8rem;
    color: var(--main);
    text-align: center;
    font-weight: 600;
    margin-bottom: 2.8rem;
  }
  p {
    font-size: 2.4rem;
    color: var(--font-main);
    text-align: center;
    margin-bottom: 3.8rem;
  }

  p.error-type {
    font-size: 1.8rem;
    color: var(--font-sub);
    text-align: center;
  }
`

export default function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()

  return (
    <ErrorContainer>
      <FlexContainer>
        <ErrorImage />
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="error-type">
          <i>{error.statusText || error.message}</i>
        </p>
        <Button onClick={() => navigate('/')} isFullWidth>
          홈으로
        </Button>
      </FlexContainer>
    </ErrorContainer>
  )
}
