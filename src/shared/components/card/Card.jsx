import styled from 'styled-components'

export default function Card({ children, title, size = 3, icon }) {
  return (
    <CardWrapper $size={size}>
      <CardTop>
        <CardTitle>{title}</CardTitle>
        {icon && <CardIcon $icon={icon}></CardIcon>}
      </CardTop>
      <CardBottom>{children}</CardBottom>
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  width: ${(props) => `calc(${Number(props.$size)} * 8.33333333% - var(--gutter))`};
  height: 20rem;
  flex-grow: 1;
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
  font-size: 2.4rem;
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
`
