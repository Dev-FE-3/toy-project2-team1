import styled from 'styled-components'
import CardDetail from '@/assets/icon-card-detail.png'
import CardPlus from '@/assets/icon-card-plus.png'

const CardWrapper = styled.div`
  width: ${(props) =>
    `calc(${Number(
      props.size,
    )} * 8.33333333% - var(--gutter))`}; /* calc를 문자열로 감싸야 합니다 */
  height: 20rem;
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
  background-image: url(${(props) => (props.icon === 'more' ? CardDetail : CardPlus)});
  background-repeat: no-repeat;

  &:hover {
    cursor: pointer;
  }
`
const CardBottom = styled.div`
  display: flex;
`

function Card({ children, ...props }) {
  return (
    <>
      <CardWrapper size={props.size}>
        <CardTop>
          <CardTitle>{props.title}</CardTitle>
          {props.icon && <CardIcon icon={props.icon}></CardIcon>}
        </CardTop>
        <CardBottom>{children}</CardBottom>
      </CardWrapper>
    </>
  )
}

export default Card
