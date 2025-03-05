import styled from 'styled-components'

export default function Card({ children, title, icon, contentAlign, onClick }) {
  return (
    <CardWrapper>
      <CardTop>
        <CardTitle>{title}</CardTitle>
        {icon && <CardIcon $icon={icon} onClick={onClick}></CardIcon>}
      </CardTop>
      <CardBottom $contentAlign={contentAlign}>{children}</CardBottom>
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 24px;
  border-radius: 1.2rem;
  box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 0.05);
  background-color: var(--box-container);
`
const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.4rem;
`

const CardTitle = styled.p`
  color: var(--font-main);
  font-size: 2rem;
  font-weight: 700;
`
const CardIcon = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  background-image: url(${(props) =>
    props.$icon === 'more'
      ? '/public/images/icon-card-detail.png'
      : '/public/images/icon-card-plus.png'});
  background-repeat: no-repeat;

  &:hover {
    cursor: pointer;
  }
`

const CardBottom = styled.div`
  display: flex;
  justify-content: ${({ $contentAlign }) => ($contentAlign ? $contentAlign : 'flex-start')};
  height: 100%;
`
