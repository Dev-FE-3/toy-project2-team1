import styled from 'styled-components'

export default function LoadingSpinner() {
  return (
    <LoadingSpinnerContainer>
      <div className="spinner"></div>
    </LoadingSpinnerContainer>
  )
}

const LoadingSpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.8);
    box-sizing: border-box;
    border-top-color: var(--main);
    border-radius: 100%;

    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
