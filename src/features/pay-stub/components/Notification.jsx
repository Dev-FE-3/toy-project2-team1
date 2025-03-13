import styled, { keyframes } from 'styled-components'

export default function Notification({ isSuccess, isFail, handleCloseModal, messageList }) {
  return (
    <>
      {isSuccess && (
        <NotificationContainer>
          <CloseIcon onClick={handleCloseModal} />
          <IconBackground $color={'success'}>
            <CheckIcon viewBox="0 0 24 24">
              <path d="M2 12 L10 20 L22 8" />
            </CheckIcon>
          </IconBackground>
          {messageList.map((message, index) => (
            <p key={index}>
              {message}
              {index !== messageList.length - 1 && <br />}
            </p>
          ))}
        </NotificationContainer>
      )}
      {isFail && (
        <NotificationContainer>
          <CloseIcon onClick={handleCloseModal} />
          <IconBackground $color={'fail'}>
            <FailIcon viewBox="0 0 24 24">
              <path d="M2 2 L22 22" />
              <path d="M22 2 L2 22" />
            </FailIcon>
          </IconBackground>
          {messageList.map((message, index) => (
            <p key={index}>
              {message}
              {index !== messageList.length - 1 && <br />}
            </p>
          ))}
        </NotificationContainer>
      )}
    </>
  )
}

// 제출 시 결과 디자인
const draw = keyframes`
  0% {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dasharray: 100;
    stroke-dashoffset: 0;
  }
`
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`
const NotificationContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  border-radius: 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  p {
    text-align: center;
    line-height: 1.5;
  }
`
const IconBackground = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${({ $color }) => ($color === 'fail' ? 'var(--point-red)' : '#4CAF66')};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
`
const CheckIcon = styled.svg`
  width: 35px;
  height: 35px;
  stroke: white;
  stroke-width: 3;
  stroke-linecap: round;
  fill: none;
  animation: ${draw} 1s ease forwards;
`
const FailIcon = styled(CheckIcon)`
  width: 25px;
  height: 25px;
  background-color: transparent; /* 배경색을 투명하게 설정 */
  animation: ${shake} 0.5s ease forwards;
`
const CloseIcon = styled.img.attrs({
  src: '/public/images/icon-x.svg',
  alt: '닫기',
})`
  position: absolute;
  top: 2.4rem;
  right: 2.4rem;
  width: 24px;
  heigh: 24px;
  cursor: pointer;
`
