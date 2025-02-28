import styled from 'styled-components'
import CardDetail from '@/assets/icon-card-detail.png'
import CardPlus from '@/assets/icon-card-plus.png'

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
  background-image: url(${(props) => (props.$icon === 'more' ? CardDetail : CardPlus)});
  background-repeat: no-repeat;

  &:hover {
    cursor: pointer;
  }
`
const CardBottom = styled.div`
  display: flex;
`

function Card({ children, title, size = 3, icon }) {
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

export default Card
